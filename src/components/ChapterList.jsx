import { useState } from 'react'
import './ChapterList.css'

function ChapterList({ chapters, activeChapterId, onSelectChapter, onAddChapter, onDeleteChapter, onReorderChapters }) {
  const [draggedIndex, setDraggedIndex] = useState(null)

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    onReorderChapters(draggedIndex, index)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="chapter-list">
      <div className="chapter-list-header">
        <h2>Capítulos</h2>
        <button onClick={onAddChapter} className="btn-add" title="Agregar capítulo">
          + Agregar
        </button>
      </div>

      <div className="chapters">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`chapter-item ${activeChapterId === chapter.id ? 'active' : ''} ${draggedIndex === index ? 'dragging' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => onSelectChapter(chapter.id)}
          >
            <div className="chapter-drag-handle">⋮⋮</div>
            <div className="chapter-info">
              <div className="chapter-number">Cap. {index + 1}</div>
              <div className="chapter-title">{chapter.title}</div>
              <div className="chapter-meta">
                {chapter.sections.length} {chapter.sections.length === 1 ? 'sección' : 'secciones'}
              </div>
            </div>
            <button
              className="btn-delete-chapter"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteChapter(chapter.id)
              }}
              title="Eliminar capítulo"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterList
