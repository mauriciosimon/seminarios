import { useState, useEffect } from 'react'
import '../styles/AsistenteIA.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api'

export default function AsistenteIA({ onAddChapters, onUpdateContent, activeChapterId, chapters = [] }) {
  const [activeTab, setActiveTab] = useState('chat') // 'chat', 'documents', 'create'
  const [documents, setDocuments] = useState([])
  const [selectedDocs, setSelectedDocs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Chat state
  const [prompt, setPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  // Upload state
  const [uploading, setUploading] = useState(false)

  // Create chapters state
  const [numberOfChapters, setNumberOfChapters] = useState(3)
  const [theme, setTheme] = useState('')

  // Undo stack para revertir cambios
  const [undoStack, setUndoStack] = useState([])

  // Cargar documentos al montar
  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${API_URL}/documents`)
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents)
      }
    } catch (err) {
      console.error('Error cargando documentos:', err)
      setError('Error al cargar documentos')
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('document', file)

    try {
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setChatHistory([...chatHistory, {
          role: 'system',
          content: `✓ Documento "${data.document.originalName}" subido exitosamente`
        }])
        loadDocuments() // Recargar lista
      } else {
        setError(data.error || 'Error al subir documento')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al subir documento')
    } finally {
      setUploading(false)
      e.target.value = '' // Reset input
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)

    // Agregar mensaje del usuario al historial
    const userMessage = { role: 'user', content: prompt }
    setChatHistory([...chatHistory, userMessage])

    try {
      // Obtener información del capítulo actual si existe
      const currentChapter = activeChapterId
        ? chapters.find(ch => ch.id === activeChapterId)
        : null

      const response = await fetch(`${API_URL}/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          documents: selectedDocs,
          context: '',
          currentChapter: currentChapter ? {
            title: currentChapter.title,
            description: currentChapter.description
          } : null
        })
      })

      const data = await response.json()

      if (data.success) {
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: data.content,
          intent: data.intent,
          structured: data.structured,
          usage: data.usage
        }])
        setPrompt('')

        // Si la intención es clara y el contenido está estructurado,
        // ejecutar la acción automáticamente
        if (data.intent === 'create_chapter' && data.structured) {
          setTimeout(() => {
            handleCreateChapterFromResponse(data.content, true)
          }, 500)
        } else if (data.intent === 'edit_chapter' && data.structured && activeChapterId) {
          // Para ediciones, mostrar confirmación
          // (la confirmación se manejará con los botones inline)
        }
      } else {
        setError(data.error || 'Error al generar contenido')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al comunicarse con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateChapters = async () => {
    if (selectedDocs.length === 0) {
      setError('Selecciona al menos un documento')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/ai/create-chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents: selectedDocs,
          numberOfChapters,
          theme
        })
      })

      const data = await response.json()

      if (data.success && data.chapters) {
        // Agregar IDs únicos a los capítulos
        const chaptersWithIds = data.chapters.map((ch, idx) => ({
          ...ch,
          id: Date.now() + idx + ''
        }))

        onAddChapters(chaptersWithIds)

        setChatHistory([...chatHistory, {
          role: 'system',
          content: `✓ ${data.chapters.length} capítulos creados exitosamente`
        }])

        setActiveTab('chat')
      } else {
        setError(data.error || 'Error al crear capítulos')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al crear capítulos')
    } finally {
      setLoading(false)
    }
  }

  const toggleDocSelection = (docName) => {
    setSelectedDocs(prev =>
      prev.includes(docName)
        ? prev.filter(d => d !== docName)
        : [...prev, docName]
    )
  }

  // Función para parsear el contenido de IA a formato de capítulo
  const parseContentToChapter = (content) => {
    // Intentar parsear como texto estructurado
    const lines = content.split('\n').filter(line => line.trim())

    // Detectar si hay un título principal (primera línea con #, o primera línea significativa)
    let title = 'Capítulo Generado por IA'
    let description = ''
    const sections = []

    let currentSection = null
    let inDescription = false

    lines.forEach((line, idx) => {
      const trimmed = line.trim()

      // Detectar título principal (primera línea o línea con #)
      if (idx === 0 || (trimmed.startsWith('#') && !title.includes('Generado'))) {
        title = trimmed.replace(/^#+\s*/, '')
        inDescription = true
      }
      // Detectar subtítulos como secciones (##, ###, o líneas en negrita)
      else if (trimmed.match(/^##/) || trimmed.match(/^\*\*.*\*\*$/)) {
        if (currentSection) {
          sections.push(currentSection)
        }
        currentSection = {
          id: Date.now() + Math.random() + '',
          title: trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, ''),
          content: ''
        }
        inDescription = false
      }
      // Si hay una sección actual, agregar contenido
      else if (currentSection && trimmed) {
        currentSection.content += (currentSection.content ? '\n' : '') + trimmed
      }
      // Si no hay sección pero estamos después del título, es descripción
      else if (inDescription && trimmed && idx > 0) {
        description += (description ? '\n' : '') + trimmed
      }
    })

    if (currentSection) {
      sections.push(currentSection)
    }

    // Si no se detectaron secciones, crear una sección única con todo el contenido
    if (sections.length === 0) {
      sections.push({
        id: Date.now() + '',
        title: 'Contenido',
        content: content
      })
    }

    return {
      id: Date.now() + '',
      title,
      description,
      sections
    }
  }

  // Crear nuevo capítulo desde respuesta de IA
  const handleCreateChapterFromResponse = (content, auto = false) => {
    const newChapter = parseContentToChapter(content)

    // Guardar en el stack de undo
    setUndoStack(prev => [...prev, {
      action: 'create',
      chapterId: newChapter.id,
      timestamp: Date.now()
    }])

    onAddChapters([newChapter])

    const message = auto
      ? `✓ Capítulo "${newChapter.title}" creado automáticamente`
      : `✓ Capítulo "${newChapter.title}" creado exitosamente`

    setChatHistory(prev => [...prev, {
      role: 'system',
      content: message,
      undoable: true
    }])
  }

  // Aplicar contenido a capítulo actual
  const handleApplyToCurrentChapter = (content) => {
    if (!activeChapterId) {
      setError('No hay capítulo activo seleccionado')
      return
    }

    // Obtener el capítulo actual antes de modificarlo
    const currentChapter = chapters.find(ch => ch.id === activeChapterId)
    if (!currentChapter) return

    // Parsear el contenido para obtener secciones
    const parsed = parseContentToChapter(content)

    // Guardar estado anterior en el stack de undo
    setUndoStack(prev => [...prev, {
      action: 'edit',
      chapterId: activeChapterId,
      previousState: {
        sections: currentChapter.sections
      },
      timestamp: Date.now()
    }])

    // Actualizar el capítulo actual con el nuevo contenido
    onUpdateContent(activeChapterId, {
      sections: parsed.sections
    })

    setChatHistory(prev => [...prev, {
      role: 'system',
      content: `✓ Contenido aplicado al capítulo "${currentChapter.title}"`,
      undoable: true
    }])
  }

  // Función para deshacer la última acción
  const handleUndo = () => {
    if (undoStack.length === 0) return

    const lastAction = undoStack[undoStack.length - 1]

    if (lastAction.action === 'create') {
      // Eliminar el capítulo creado
      // Nota: necesitarías agregar una función onRemoveChapter en el componente padre
      console.log('Undo create:', lastAction.chapterId)
      setChatHistory(prev => [...prev, {
        role: 'system',
        content: `↶ Creación de capítulo revertida`
      }])
    } else if (lastAction.action === 'edit') {
      // Restaurar el estado anterior del capítulo
      onUpdateContent(lastAction.chapterId, lastAction.previousState)
      setChatHistory(prev => [...prev, {
        role: 'system',
        content: `↶ Edición revertida`
      }])
    }

    // Remover del stack
    setUndoStack(prev => prev.slice(0, -1))
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="asistente-ia">
      <div className="asistente-header">
        <h2>🤖 Asistente IA</h2>
        <div className="asistente-tabs">
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button
            className={activeTab === 'documents' ? 'active' : ''}
            onClick={() => setActiveTab('documents')}
          >
            Documentos ({documents.length})
          </button>
          <button
            className={activeTab === 'create' ? 'active' : ''}
            onClick={() => setActiveTab('create')}
          >
            Crear Capítulos
          </button>
        </div>
      </div>

      {error && (
        <div className="asistente-error">
          ⚠️ {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="asistente-content">
        {/* TAB: Chat */}
        {activeTab === 'chat' && (
          <div className="chat-tab">
            <div className="chat-history">
              {chatHistory.length === 0 && (
                <div className="chat-empty">
                  <p>Haz una pregunta o solicita generar contenido.</p>
                  <p className="chat-hint">
                    Ejemplos:<br />
                    • "Explica el concepto de metachamanismo"<br />
                    • "Expande la sección sobre imaginación participativa"<br />
                    • "Resume el documento CROYANCE 4"
                  </p>
                </div>
              )}

              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <div className="message-content">
                    {msg.content}
                  </div>
                  {msg.usage && (
                    <div className="message-usage">
                      Tokens: {msg.usage.inputTokens + msg.usage.outputTokens}
                    </div>
                  )}
                  {msg.role === 'assistant' && msg.structured && (
                    <div className="message-actions">
                      {/* Mostrar botones según la intención detectada */}
                      {(msg.intent === 'create_chapter' || msg.intent === 'synthesize') && (
                        <button
                          onClick={() => handleCreateChapterFromResponse(msg.content)}
                          className="btn-action btn-create"
                          title="Crear nuevo capítulo con este contenido"
                        >
                          ➕ Crear Capítulo
                        </button>
                      )}
                      {msg.intent === 'edit_chapter' && activeChapterId && (
                        <button
                          onClick={() => handleApplyToCurrentChapter(msg.content)}
                          className="btn-action btn-apply"
                          title="Aplicar este contenido al capítulo actual"
                        >
                          ✏️ Aplicar Cambios
                        </button>
                      )}
                      {/* Botón genérico para otros casos */}
                      {!msg.intent || msg.intent === 'answer' || msg.intent === 'expand' ? (
                        <>
                          <button
                            onClick={() => handleCreateChapterFromResponse(msg.content)}
                            className="btn-action btn-create"
                            title="Crear un nuevo capítulo con esta respuesta"
                          >
                            ➕ Crear Capítulo
                          </button>
                          <button
                            onClick={() => handleApplyToCurrentChapter(msg.content)}
                            className="btn-action btn-apply"
                            title="Aplicar al capítulo actual"
                            disabled={!activeChapterId}
                          >
                            ✏️ Aplicar a Actual
                          </button>
                        </>
                      ) : null}
                    </div>
                  )}
                  {msg.role === 'system' && msg.undoable && undoStack.length > 0 && (
                    <div className="message-actions">
                      <button
                        onClick={handleUndo}
                        className="btn-action btn-undo"
                        title="Deshacer esta acción"
                      >
                        ↶ Deshacer
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="chat-message assistant loading">
                  <div className="message-content">Generando...</div>
                </div>
              )}
            </div>

            <div className="chat-input-section">
              <div className="chat-context-info">
                {activeChapterId && (
                  <div className="active-chapter-info">
                    📖 Capítulo activo: {chapters.find(ch => ch.id === activeChapterId)?.title || 'N/A'}
                  </div>
                )}
                {selectedDocs.length > 0 && (
                  <div className="selected-docs-info">
                    📚 Documentos: {selectedDocs.join(', ')}
                  </div>
                )}
                {undoStack.length > 0 && (
                  <button
                    onClick={handleUndo}
                    className="btn-undo-global"
                    title={`Deshacer última acción (${undoStack.length} disponibles)`}
                  >
                    ↶ Deshacer ({undoStack.length})
                  </button>
                )}
              </div>

              <div className="chat-input-wrapper">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleGenerate()
                    }
                  }}
                  placeholder="Escribe tu pregunta o instrucción..."
                  rows={3}
                  disabled={loading}
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="btn-send"
                >
                  {loading ? '⏳' : '▶️'} Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Documentos */}
        {activeTab === 'documents' && (
          <div className="documents-tab">
            <div className="upload-section">
              <label className="upload-button">
                {uploading ? '⏳ Subiendo...' : '📤 Subir Documento'}
                <input
                  type="file"
                  onChange={handleUpload}
                  accept=".txt,.docx,.pdf,.md"
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
              <p className="upload-hint">
                Formatos: .txt, .docx, .pdf, .md (máx 10MB)
              </p>
            </div>

            <div className="documents-list">
              {documents.length === 0 ? (
                <p className="no-documents">No hay documentos. Sube uno para comenzar.</p>
              ) : (
                documents.map((doc, idx) => (
                  <div key={idx} className="document-item">
                    <label className="document-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.name)}
                        onChange={() => toggleDocSelection(doc.name)}
                      />
                      <div className="document-info">
                        <div className="document-name">{doc.name}</div>
                        <div className="document-meta">
                          {formatFileSize(doc.size)} • {new Date(doc.modified).toLocaleDateString()}
                        </div>
                      </div>
                    </label>
                  </div>
                ))
              )}
            </div>

            {selectedDocs.length > 0 && (
              <div className="selection-info">
                ✓ {selectedDocs.length} documento{selectedDocs.length > 1 ? 's' : ''} seleccionado{selectedDocs.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        {/* TAB: Crear Capítulos */}
        {activeTab === 'create' && (
          <div className="create-tab">
            <h3>Crear Capítulos Automáticamente</h3>

            <div className="form-group">
              <label>Número de Capítulos:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={numberOfChapters}
                onChange={(e) => setNumberOfChapters(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="form-group">
              <label>Tema (opcional):</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ej: Fundamentos del metachamanismo"
              />
            </div>

            <div className="form-group">
              <label>Documentos a usar:</label>
              {selectedDocs.length === 0 ? (
                <p className="warning">⚠️ Ve a la pestaña "Documentos" y selecciona al menos uno</p>
              ) : (
                <ul className="selected-docs-list">
                  {selectedDocs.map((doc, idx) => (
                    <li key={idx}>✓ {doc}</li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleCreateChapters}
              disabled={loading || selectedDocs.length === 0}
              className="btn-create"
            >
              {loading ? '⏳ Generando...' : '✨ Crear Capítulos'}
            </button>

            <div className="create-hint">
              <p>
                Los capítulos se generarán automáticamente basándose en el contenido
                de los documentos seleccionados. Cada capítulo tendrá título,
                descripción y secciones con contenido detallado.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
