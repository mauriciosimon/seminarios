# Backend - Editor de Seminario Meta-Chamanismo

Backend API para gestión de documentos y generación de contenido con IA.

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar `.env` y agregar tu API key de Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
```

Para obtener una API key: https://console.anthropic.com/

## Ejecutar

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor correrá en `http://localhost:3001`

## Endpoints

### Documentos

#### `GET /api/documents`
Lista todos los documentos en la carpeta `/docs`

Respuesta:
```json
{
  "success": true,
  "count": 2,
  "documents": [
    {
      "name": "CROYANCE 4.docx",
      "size": 12345,
      "created": "2024-01-01T00:00:00.000Z",
      "modified": "2024-01-01T00:00:00.000Z",
      "extension": ".docx"
    }
  ]
}
```

#### `POST /api/documents/upload`
Sube un nuevo documento

Body (multipart/form-data):
- `document`: Archivo (.txt, .docx, .pdf, .md)

Respuesta:
```json
{
  "success": true,
  "message": "Documento subido exitosamente",
  "document": {
    "name": "documento-1234567890.docx",
    "originalName": "documento.docx",
    "size": 12345
  }
}
```

#### `GET /api/documents/:filename/content`
Obtiene el contenido extraído de un documento

Respuesta:
```json
{
  "success": true,
  "filename": "CROYANCE 4.docx",
  "content": "Texto extraído del documento..."
}
```

#### `DELETE /api/documents/:filename`
Elimina un documento

### Inteligencia Artificial

#### `POST /api/ai/generate`
Genera contenido basado en un prompt y documentos de referencia

Body:
```json
{
  "prompt": "Explica el concepto de metachamanismo",
  "documents": ["CROYANCE 4.docx"],
  "context": "Contexto adicional opcional"
}
```

Respuesta:
```json
{
  "success": true,
  "content": "El metachamanismo es...",
  "usage": {
    "inputTokens": 1234,
    "outputTokens": 567
  }
}
```

#### `POST /api/ai/create-chapters`
Crea capítulos estructurados automáticamente desde documentos

Body:
```json
{
  "documents": ["CROYANCE 4.docx", "CROYANCE 5.docx"],
  "numberOfChapters": 3,
  "theme": "Fundamentos del metachamanismo"
}
```

Respuesta:
```json
{
  "success": true,
  "chapters": [
    {
      "title": "Título del Capítulo",
      "description": "Descripción",
      "sections": [
        {
          "title": "Sección 1",
          "content": "Contenido..."
        }
      ]
    }
  ],
  "usage": {
    "inputTokens": 5000,
    "outputTokens": 3000
  }
}
```

#### `POST /api/ai/expand`
Expande un concepto o texto con más detalles

Body:
```json
{
  "text": "Texto a expandir",
  "documents": ["CROYANCE 4.docx"],
  "instruction": "Expande este concepto con ejemplos"
}
```

Respuesta:
```json
{
  "success": true,
  "original": "Texto original",
  "expanded": "Texto expandido con más detalles...",
  "usage": {
    "inputTokens": 234,
    "outputTokens": 567
  }
}
```

## Tipos de archivo soportados

- `.txt` - Archivos de texto plano
- `.md` - Archivos Markdown
- `.docx` - Documentos de Microsoft Word
- `.pdf` - Documentos PDF

## Estructura del proyecto

```
backend/
├── src/
│   ├── routes/
│   │   ├── documents.js  # Rutas para gestión de documentos
│   │   └── ai.js         # Rutas para IA (Claude)
│   ├── utils/
│   │   └── documentParser.js  # Utilidades para extraer texto
│   └── server.js         # Servidor principal Express
├── package.json
└── .env.example
```
