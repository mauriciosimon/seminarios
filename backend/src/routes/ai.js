import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { extractTextFromDocument, structureContent } from '../utils/documentParser.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configurar cliente de Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

const DOCS_DIR = path.join(__dirname, '../../../docs');

// POST /api/ai/generate - Generar contenido con IA
router.post('/generate', async (req, res) => {
  try {
    const { prompt, documents = [], context = '' } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un prompt'
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'API Key de Anthropic no configurada',
        message: 'Configura la variable de entorno ANTHROPIC_API_KEY'
      });
    }

    // Cargar contenido de los documentos seleccionados
    let documentsContent = '';
    if (documents.length > 0) {
      for (const docName of documents) {
        try {
          const docPath = path.join(DOCS_DIR, docName);
          const content = await extractTextFromDocument(docPath);
          documentsContent += `\n\n--- Documento: ${docName} ---\n${content}`;
        } catch (error) {
          console.error(`Error al cargar ${docName}:`, error);
        }
      }
    }

    // Construir el prompt para Claude
    const systemPrompt = `Eres un asistente especializado en meta-chamanismo que ayuda a crear contenido para seminarios educativos.
Tu tarea es generar contenido estructurado, claro y educativo basándote en los documentos proporcionados.

Cuando generes contenido:
- Mantén un tono académico pero accesible
- Estructura el contenido con títulos y secciones claras
- Basa tus respuestas en los documentos proporcionados
- Si generas capítulos, incluye título, descripción y secciones con contenido detallado`;

    const userPrompt = `${context ? `Contexto adicional: ${context}\n\n` : ''}${documentsContent ? `Documentos de referencia:${documentsContent}\n\n` : ''}Tarea: ${prompt}`;

    // Llamar a la API de Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    const generatedContent = message.content[0].text;

    res.json({
      success: true,
      content: generatedContent,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens
      }
    });
  } catch (error) {
    console.error('Error en generación de IA:', error);
    res.status(500).json({
      success: false,
      error: 'Error al generar contenido',
      message: error.message
    });
  }
});

// POST /api/ai/create-chapters - Crear capítulos automáticamente desde documentos
router.post('/create-chapters', async (req, res) => {
  try {
    const { documents, numberOfChapters = 3, theme = '' } = req.body;

    if (!documents || documents.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere al menos un documento'
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'API Key de Anthropic no configurada'
      });
    }

    // Cargar contenido de los documentos
    let documentsContent = '';
    for (const docName of documents) {
      try {
        const docPath = path.join(DOCS_DIR, docName);
        const content = await extractTextFromDocument(docPath);
        documentsContent += `\n\n--- Documento: ${docName} ---\n${content}`;
      } catch (error) {
        console.error(`Error al cargar ${docName}:`, error);
      }
    }

    // Prompt para generar capítulos estructurados
    const systemPrompt = `Eres un experto en meta-chamanismo que estructura contenido educativo para seminarios.
Debes generar capítulos bien estructurados en formato JSON basándote en los documentos proporcionados.`;

    const userPrompt = `Documentos de referencia:${documentsContent}

Crea ${numberOfChapters} capítulos para un seminario${theme ? ` sobre ${theme}` : ''}.

Devuelve ÚNICAMENTE un JSON válido con este formato exacto (sin markdown, sin explicaciones):
{
  "chapters": [
    {
      "title": "Título del Capítulo 1",
      "description": "Descripción breve del capítulo",
      "sections": [
        {
          "title": "Título de la Sección 1",
          "content": "Contenido detallado de la sección"
        }
      ]
    }
  ]
}

Cada capítulo debe tener 4-6 secciones con contenido sustancial basado en los documentos.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    let generatedContent = message.content[0].text;

    // Limpiar el contenido para extraer solo el JSON
    generatedContent = generatedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
      const parsedContent = JSON.parse(generatedContent);

      res.json({
        success: true,
        chapters: parsedContent.chapters,
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens
        }
      });
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
      res.json({
        success: true,
        content: generatedContent,
        error: 'No se pudo parsear como JSON, se devuelve texto plano',
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens
        }
      });
    }
  } catch (error) {
    console.error('Error al crear capítulos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear capítulos',
      message: error.message
    });
  }
});

// POST /api/ai/expand - Expandir un concepto o sección
router.post('/expand', async (req, res) => {
  try {
    const { text, documents = [], instruction = 'Expande este concepto con más detalles' } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere texto para expandir'
      });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'API Key de Anthropic no configurada'
      });
    }

    // Cargar documentos de contexto si se proporcionan
    let documentsContent = '';
    if (documents.length > 0) {
      for (const docName of documents) {
        try {
          const docPath = path.join(DOCS_DIR, docName);
          const content = await extractTextFromDocument(docPath);
          documentsContent += `\n\n--- Documento: ${docName} ---\n${content}`;
        } catch (error) {
          console.error(`Error al cargar ${docName}:`, error);
        }
      }
    }

    const systemPrompt = `Eres un experto en meta-chamanismo que ayuda a desarrollar y expandir conceptos educativos.
Mantén coherencia con el material de referencia y proporciona explicaciones claras y profundas.`;

    const userPrompt = `${documentsContent ? `Documentos de referencia:${documentsContent}\n\n` : ''}Texto original:
${text}

Instrucción: ${instruction}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    const expandedContent = message.content[0].text;

    res.json({
      success: true,
      original: text,
      expanded: expandedContent,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens
      }
    });
  } catch (error) {
    console.error('Error al expandir contenido:', error);
    res.status(500).json({
      success: false,
      error: 'Error al expandir contenido',
      message: error.message
    });
  }
});

export default router;
