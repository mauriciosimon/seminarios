# Editor de Seminario: Meta-Chamanismo

Una aplicación web completa para crear, editar y gestionar seminarios de meta-chamanismo con asistencia de inteligencia artificial.

## 🌟 Características

### Frontend (React + Vite)
- ✏️ Editor de capítulos y secciones con formato markdown
- 📋 Lista de capítulos con drag & drop para reordenar
- 👁️ Vista previa del seminario completo
- 💾 Exportación a JSON
- 📥 Importación desde texto
- 🔄 Auto-guardado en localStorage
- 🤖 Asistente IA integrado
- 📱 Diseño responsive

### Backend (Node.js + Express)
- 📁 Gestión de documentos (.txt, .docx, .pdf, .md)
- 📤 Subida de documentos
- 🧠 Integración con Claude (Anthropic) para:
  - Generación de contenido
  - Creación automática de capítulos
  - Expansión de conceptos
  - Chat inteligente con contexto

## 🚀 Instalación

### Requisitos
- Node.js 20.11.0 o superior
- npm o yarn
- API Key de Anthropic (https://console.anthropic.com/)

### Paso 1: Instalar Frontend

```bash
npm install
```

### Paso 2: Instalar Backend

```bash
cd backend
npm install
```

### Paso 3: Configurar API Key

1. Copia el archivo de ejemplo:
```bash
cd backend
cp .env.example .env
```

2. Edita `.env` y agrega tu API key de Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-api03-tu-key-aqui
PORT=3002
```

Para obtener una API key: https://console.anthropic.com/

## 🎯 Uso

### Iniciar el Sistema

**Terminal 1 - Frontend:**
```bash
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
El backend estará disponible en: `http://localhost:3002`

## Guía de uso

### Gestión de capítulos

- **Agregar capítulo**: Clic en "+ Agregar" en el panel izquierdo
- **Seleccionar capítulo**: Clic en cualquier capítulo de la lista
- **Reordenar**: Arrastra los capítulos usando el ícono ⋮⋮
- **Eliminar**: Clic en × (aparece al pasar el mouse)

### Edición de contenido

1. Edita el título y descripción del capítulo
2. Agrega secciones con "+ Agregar Sección"
3. Usa la barra de herramientas para formatear texto:
   - **H1, H2, H3**: Títulos
   - **B**: Negrita
   - **I**: Cursiva
   - **• Lista**: Lista con viñetas
   - **1. Lista**: Lista numerada
4. Alterna entre modo edición (✏️) y vista previa (👁️)

### Formato Markdown soportado

- \`# Título 1\`, \`## Título 2\`, \`### Título 3\`
- \`**negrita**\` para texto en negrita
- \`*cursiva*\` para texto en cursiva
- \`• item\` o \`- item\` para listas con viñetas
- \`1. item\` para listas numeradas

### Importar desde texto

1. Clic en "📥 Importar Texto"
2. Pega tu contenido siguiendo este formato:

\`\`\`
Capítulo 1. Título del capítulo
Descripción breve del capítulo

- Título de sección
Contenido de la sección...

- Otra sección
Más contenido...

Capítulo 2. Siguiente capítulo
Descripción...

- Sección del capítulo 2
Contenido...
\`\`\`

3. Clic en "Importar"

### Exportar y Vista Previa

- **💾 Exportar JSON**: Descarga un archivo JSON con toda la estructura
- **👁️ Vista Previa**: Visualiza el seminario completo con formato profesional

## 🤖 Usar el Asistente IA

### Activar el Asistente

Haz clic en el botón "🤖 Mostrar Asistente IA" en el header.

### Funciones del Asistente

#### 1. Chat con IA
- Pestaña "Chat"
- Haz preguntas sobre metachamanismo
- Solicita explicaciones de conceptos
- Pide que genere contenido nuevo

**Ejemplos de prompts:**
```
- "Explica el concepto de metachamanismo"
- "Resume el documento CROYANCE 4"
- "Expande la sección sobre imaginación participativa"
```

#### 2. Gestión de Documentos
- Pestaña "Documentos"
- **Subir documentos**: Arrastra archivos o usa el botón "📤 Subir Documento"
- **Seleccionar documentos**: Marca los documentos para usar como contexto
- Formatos soportados: .txt, .docx, .pdf, .md (máx 10MB)

#### 3. Crear Capítulos Automáticamente
- Pestaña "Crear Capítulos"
- Selecciona documentos en la pestaña "Documentos"
- Especifica número de capítulos (1-10)
- Opcionalmente agrega un tema
- Haz clic en "✨ Crear Capítulos"

La IA generará capítulos completos con:
- Títulos relevantes
- Descripciones
- Secciones con contenido detallado
- Todo basado en los documentos seleccionados

## Estructura de datos

\`\`\`json
[
  {
    "id": "1",
    "title": "Introducción al Meta-Chamanismo",
    "description": "Fundamentos y conceptos básicos",
    "sections": [
      {
        "id": "s1",
        "title": "¿Qué es el Meta-Chamanismo?",
        "content": "El meta-chamanismo es..."
      }
    ]
  }
]
\`\`\`

## 📂 Estructura del Proyecto

```
seminario-metachamanismo/
├── src/                      # Frontend React
│   ├── components/
│   │   ├── ChapterList.jsx   # Lista de capítulos
│   │   ├── ChapterEditor.jsx # Editor de contenido
│   │   ├── PreviewModal.jsx  # Vista previa
│   │   ├── ImportModal.jsx   # Importador
│   │   └── AsistenteIA.jsx   # Asistente IA
│   ├── styles/               # Estilos CSS
│   ├── App.jsx               # Componente principal
│   └── main.jsx              # Punto de entrada
├── backend/                  # Backend Node.js
│   ├── src/
│   │   ├── routes/
│   │   │   ├── documents.js  # API de documentos
│   │   │   └── ai.js         # API de IA
│   │   ├── utils/
│   │   │   └── documentParser.js # Extractor de texto
│   │   └── server.js         # Servidor Express
│   ├── .env                  # Configuración (no versionado)
│   └── .env.example          # Ejemplo de configuración
├── docs/                     # Documentos de referencia
│   ├── CROYANCE 4.docx
│   └── CROYANCE 5.docx
└── README.md                 # Esta documentación
```

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite 5
- CSS puro (sin frameworks)
- localStorage para persistencia

### Backend
- Node.js 20+
- Express 4
- Anthropic Claude API
- Multer (subida de archivos)
- Mammoth (lectura de .docx)
- pdf-parse (lectura de .pdf)

## ⚠️ Notas Importantes

- **API Key de Anthropic**: Es necesaria para usar las funciones de IA
- **Límites de API**: Ten en cuenta los límites de tu plan de Anthropic
- **Tamaño de Archivos**: Máximo 10MB por documento
- **Navegadores**: Funciona mejor en Chrome, Firefox, Safari modernos
- **Puerto Backend**: Por defecto 3002 (configurable en .env)
- **Puerto Frontend**: Por defecto 5173 (asignado por Vite)

## 🐛 Solución de Problemas

### El frontend no puede conectarse al backend
- Verifica que el backend esté corriendo en puerto 3002
- Revisa la consola del navegador para errores CORS
- Asegúrate de que ambos servidores estén activos

### Error "API Key no configurada"
- Verifica que `.env` existe en la carpeta `backend`
- Confirma que `ANTHROPIC_API_KEY` está correctamente configurada
- Reinicia el servidor backend después de editar `.env`

### Documentos no se muestran
- Verifica que los documentos estén en la carpeta `docs`
- Confirma que el backend tiene permisos de lectura
- Revisa los logs del servidor backend

### Errores de generación de IA
- Verifica tu saldo/créditos de Anthropic
- Revisa que los documentos seleccionados sean válidos
- Reduce el número de capítulos si hay timeout

## 💡 Consejos de Uso

1. **Gestión de Documentos**:
   - Sube todos tus documentos de referencia primero
   - Organízalos por tema usando nombres claros
   - Selecciona solo los relevantes para cada tarea de IA

2. **Generación de Capítulos**:
   - Empieza con 2-3 capítulos para ver la estructura
   - Ajusta el tema para guiar la generación
   - Revisa y edita el contenido generado

3. **Chat con IA**:
   - Sé específico en tus preguntas
   - Usa los documentos seleccionados como contexto
   - Puedes copiar las respuestas al editor

4. **Optimización**:
   - El auto-guardado funciona automáticamente
   - Usa "🔄 Restaurar Inicial" con cuidado (borra todo)
   - Exporta JSON regularmente como respaldo

## 📞 Soporte

Para problemas o preguntas:
- Revisa la documentación del backend: `backend/README.md`
- Verifica la consola del navegador y los logs del servidor
- Consulta la documentación de Anthropic: https://docs.anthropic.com/

---

**Desarrollado para estructurar seminarios de Meta-Chamanismo con asistencia de IA**

**Tecnologías**: React, Vite, Node.js, Express, Claude (Anthropic)
