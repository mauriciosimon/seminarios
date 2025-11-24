import { useState } from 'react'
import './ImportModal.css'

function ImportModal({ onImport, onClose }) {
  const [text, setText] = useState('')

  const handleImport = () => {
    if (!text.trim()) {
      alert('Por favor, pega algo de texto antes de importar.')
      return
    }
    onImport(text)
  }

  const exampleText = `Capítulo 1. Introducción al Meta-Chamanismo
Fundamentos y conceptos básicos

- ¿Qué es el Meta-Chamanismo?
El meta-chamanismo integra técnicas tradicionales con conocimiento moderno.

- Historia y Orígenes
Explicación de los orígenes históricos...

Capítulo 2. Técnicas Prácticas
Métodos para la práctica diaria

- Respiración Consciente
La respiración es fundamental para acceder a estados ampliados.

- Meditación Chamánica
Técnicas específicas de meditación.`

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Importar desde Texto</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="import-instructions">
          <h3>Instrucciones</h3>
          <p>Pega tu texto siguiendo este formato:</p>
          <ul>
            <li><strong>Capítulos:</strong> Líneas que empiecen con "Capítulo" o número seguido de punto (ej: "1. Título")</li>
            <li><strong>Secciones:</strong> Líneas que empiecen con guión (-), punto (•) o asterisco (*)</li>
            <li><strong>Contenido:</strong> Las líneas siguientes se agregarán al contenido de la sección</li>
          </ul>

          <button
            className="btn-example"
            onClick={() => setText(exampleText)}
          >
            📄 Cargar Ejemplo
          </button>
        </div>

        <textarea
          className="import-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí tu texto de Word o escribe tu estructura..."
          rows={15}
        />

        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={handleImport} className="btn-primary">
            Importar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportModal
