import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';

/**
 * Extrae texto de diferentes tipos de documentos
 * @param {string} filePath - Ruta al archivo
 * @returns {Promise<string>} - Texto extraído
 */
export async function extractTextFromDocument(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    switch (ext) {
      case '.txt':
      case '.md':
        return await extractFromText(filePath);

      case '.docx':
        return await extractFromDocx(filePath);

      case '.pdf':
        return await extractFromPdf(filePath);

      default:
        throw new Error(`Tipo de archivo no soportado: ${ext}`);
    }
  } catch (error) {
    console.error(`Error extrayendo texto de ${filePath}:`, error);
    throw error;
  }
}

/**
 * Extrae texto de archivos .txt o .md
 */
async function extractFromText(filePath) {
  const buffer = await fs.readFile(filePath);
  return buffer.toString('utf-8');
}

/**
 * Extrae texto de archivos .docx usando mammoth
 */
async function extractFromDocx(filePath) {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/**
 * Extrae texto de archivos .pdf usando pdf-parse
 */
async function extractFromPdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const data = await pdf(buffer);
  return data.text;
}

/**
 * Procesa el texto para estructurarlo en capítulos y secciones
 * @param {string} text - Texto del documento
 * @returns {Object} - Estructura de capítulos y secciones
 */
export function structureContent(text) {
  const lines = text.split('\n').filter(line => line.trim());

  const chapters = [];
  let currentChapter = null;
  let currentSection = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Detectar títulos de capítulo (líneas en mayúsculas o con "Capítulo")
    if (trimmed.match(/^(CAPÍTULO|CAPITULO|CHAPTER|\d+\.)/) ||
        (trimmed === trimmed.toUpperCase() && trimmed.length > 10)) {

      if (currentChapter) {
        chapters.push(currentChapter);
      }

      currentChapter = {
        title: trimmed,
        description: '',
        sections: []
      };
      currentSection = null;
    }
    // Detectar secciones (líneas que empiezan con números o guiones)
    else if (trimmed.match(/^(\d+\.|[-•*])\s+/) && currentChapter) {
      const sectionTitle = trimmed.replace(/^(\d+\.|[-•*])\s+/, '');

      currentSection = {
        title: sectionTitle,
        content: ''
      };

      currentChapter.sections.push(currentSection);
    }
    // Agregar contenido a la sección actual o descripción del capítulo
    else if (trimmed) {
      if (currentSection) {
        currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
      } else if (currentChapter && !currentChapter.description) {
        currentChapter.description = trimmed;
      }
    }
  }

  // Agregar el último capítulo
  if (currentChapter) {
    chapters.push(currentChapter);
  }

  return { chapters };
}
