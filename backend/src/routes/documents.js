import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { extractTextFromDocument } from '../utils/documentParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configurar carpeta de documentos
const DOCS_DIR = path.join(__dirname, '../../../docs');

// Configurar Multer para subir archivos
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(DOCS_DIR, { recursive: true });
      cb(null, DOCS_DIR);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    // Mantener el nombre original con timestamp para evitar duplicados
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.txt', '.docx', '.pdf', '.md'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de archivo no permitido. Usa: ${allowedTypes.join(', ')}`));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

// GET /api/documents - Listar todos los documentos
router.get('/', async (req, res) => {
  try {
    // Verificar que existe el directorio
    await fs.mkdir(DOCS_DIR, { recursive: true });

    const files = await fs.readdir(DOCS_DIR);
    const documents = [];

    for (const file of files) {
      const filePath = path.join(DOCS_DIR, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        documents.push({
          name: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          extension: path.extname(file)
        });
      }
    }

    // Ordenar por fecha de modificación (más reciente primero)
    documents.sort((a, b) => b.modified - a.modified);

    res.json({
      success: true,
      count: documents.length,
      documents
    });
  } catch (error) {
    console.error('Error al listar documentos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al listar documentos',
      message: error.message
    });
  }
});

// POST /api/documents/upload - Subir un nuevo documento
router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No se proporcionó ningún archivo'
      });
    }

    res.json({
      success: true,
      message: 'Documento subido exitosamente',
      document: {
        name: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al subir documento',
      message: error.message
    });
  }
});

// GET /api/documents/:filename/content - Obtener contenido de un documento
router.get('/:filename/content', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(DOCS_DIR, filename);

    // Verificar que el archivo existe
    await fs.access(filePath);

    // Extraer texto del documento
    const text = await extractTextFromDocument(filePath);

    res.json({
      success: true,
      filename,
      content: text
    });
  } catch (error) {
    console.error('Error al leer documento:', error);
    res.status(404).json({
      success: false,
      error: 'Documento no encontrado o error al leer',
      message: error.message
    });
  }
});

// DELETE /api/documents/:filename - Eliminar un documento
router.delete('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(DOCS_DIR, filename);

    await fs.unlink(filePath);

    res.json({
      success: true,
      message: 'Documento eliminado exitosamente',
      filename
    });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar documento',
      message: error.message
    });
  }
});

export default router;
