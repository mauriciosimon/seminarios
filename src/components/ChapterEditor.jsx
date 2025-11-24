import { useState } from 'react'
import './ChapterEditor.css'

function ChapterEditor({ chapter, onUpdateChapter, onAddSection, onUpdateSection, onDeleteSection }) {
  const [editingSection, setEditingSection] = useState(null)

  const applyFormat = (sectionId, format) => {
    const textarea = document.getElementById(`section-${sectionId}`)
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const section = chapter.sections.find(s => s.id === sectionId)

    if (!selectedText) return

    let formattedText = ''

    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'h1':
        formattedText = `# ${selectedText}`
        break
      case 'h2':
        formattedText = `## ${selectedText}`
        break
      case 'h3':
        formattedText = `### ${selectedText}`
        break
      case 'bullet':
        formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n')
        break
      case 'number':
        formattedText = selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n')
        break
      default:
        return
    }

    const newContent = section.content.substring(0, start) + formattedText + section.content.substring(end)
    onUpdateSection(chapter.id, sectionId, { content: newContent })

    // Mantener el foco
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start, start + formattedText.length)
    }, 0)
  }

  const renderContent = (content) => {
    // Renderizado simple de markdown
    let html = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>')

    // Envolver listas
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

    return html
  }

  return (
    <div className="chapter-editor">
      <div className="chapter-header">
        <input
          type="text"
          className="chapter-title-input"
          value={chapter.title}
          onChange={(e) => onUpdateChapter(chapter.id, { title: e.target.value })}
          placeholder="Título del capítulo"
        />
        <textarea
          className="chapter-description-input"
          value={chapter.description}
          onChange={(e) => onUpdateChapter(chapter.id, { description: e.target.value })}
          placeholder="Descripción breve del capítulo..."
          rows={2}
        />
      </div>

      <div className="sections-header">
        <h3>Secciones</h3>
        <button onClick={() => onAddSection(chapter.id)} className="btn-add-section">
          + Agregar Sección
        </button>
      </div>

      <div className="sections">
        {chapter.sections.length === 0 ? (
          <div className="empty-state">
            No hay secciones. Agrega una sección para comenzar.
          </div>
        ) : (
          chapter.sections.map((section) => (
            <div key={section.id} className="section">
              <div className="section-header">
                <input
                  type="text"
                  className="section-title-input"
                  value={section.title}
                  onChange={(e) => onUpdateSection(chapter.id, section.id, { title: e.target.value })}
                  placeholder="Título de la sección"
                />
                <button
                  className="btn-delete-section"
                  onClick={() => onDeleteSection(chapter.id, section.id)}
                  title="Eliminar sección"
                >
                  🗑️
                </button>
              </div>

              <div className="editor-toolbar">
                <button onClick={() => applyFormat(section.id, 'h1')} title="Título 1">H1</button>
                <button onClick={() => applyFormat(section.id, 'h2')} title="Título 2">H2</button>
                <button onClick={() => applyFormat(section.id, 'h3')} title="Título 3">H3</button>
                <span className="toolbar-divider">|</span>
                <button onClick={() => applyFormat(section.id, 'bold')} title="Negrita"><strong>B</strong></button>
                <button onClick={() => applyFormat(section.id, 'italic')} title="Cursiva"><em>I</em></button>
                <span className="toolbar-divider">|</span>
                <button onClick={() => applyFormat(section.id, 'bullet')} title="Lista con viñetas">• Lista</button>
                <button onClick={() => applyFormat(section.id, 'number')} title="Lista numerada">1. Lista</button>
                <span className="toolbar-divider">|</span>
                <button
                  className={editingSection === section.id ? 'active' : ''}
                  onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                  title="Alternar vista"
                >
                  {editingSection === section.id ? '👁️ Vista' : '✏️ Editar'}
                </button>
              </div>

              {editingSection === section.id ? (
                <textarea
                  id={`section-${section.id}`}
                  className="section-content-input"
                  value={section.content}
                  onChange={(e) => onUpdateSection(chapter.id, section.id, { content: e.target.value })}
                  placeholder="Contenido de la sección... Usa markdown para formato."
                  rows={10}
                />
              ) : (
                <div
                  className="section-content-preview"
                  dangerouslySetInnerHTML={{ __html: renderContent(section.content) }}
                  onClick={() => setEditingSection(section.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChapterEditor
