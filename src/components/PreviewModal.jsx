import './PreviewModal.css'

function PreviewModal({ chapters, onClose }) {
  const renderContent = (content) => {
    let html = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>')

    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    return html
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Vista Previa del Seminario</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="preview-content">
          <header className="preview-header">
            <h1 className="preview-main-title">Seminario de Meta-Chamanismo</h1>
            <p className="preview-subtitle">Guía completa de contenidos</p>
          </header>

          <div className="preview-toc">
            <h2>Índice</h2>
            <ol>
              {chapters.map((chapter, index) => (
                <li key={chapter.id}>
                  <a href={`#chapter-${chapter.id}`}>{chapter.title}</a>
                  {chapter.sections.length > 0 && (
                    <ul>
                      {chapter.sections.map(section => (
                        <li key={section.id}>
                          <a href={`#section-${section.id}`}>{section.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {chapters.map((chapter, index) => (
            <article key={chapter.id} className="preview-chapter" id={`chapter-${chapter.id}`}>
              <div className="chapter-number-badge">Capítulo {index + 1}</div>
              <h2 className="preview-chapter-title">{chapter.title}</h2>
              {chapter.description && (
                <p className="preview-chapter-description">{chapter.description}</p>
              )}

              {chapter.sections.map((section) => (
                <section key={section.id} className="preview-section" id={`section-${section.id}`}>
                  <h3 className="preview-section-title">{section.title}</h3>
                  <div
                    className="preview-section-content"
                    dangerouslySetInnerHTML={{ __html: renderContent(section.content) }}
                  />
                </section>
              ))}
            </article>
          ))}

          <footer className="preview-footer">
            <p>✨ Generado con el Editor de Seminario Meta-Chamanismo</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
