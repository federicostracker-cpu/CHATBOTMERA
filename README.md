# MERA Chatbot RR.HH.

## Deploy en 4 pasos

### 1. Conseguir API Key de Groq (gratis)
- Entrá a https://console.groq.com
- Creá una cuenta con tu mail
- Ir a "API Keys" → "Create API Key"
- Copiá la key (empieza con `gsk_...`)

### 2. Subir a GitHub
- Creá un repo nuevo en github.com (puede ser privado)
- Subí todos estos archivos

### 3. Deploy en Vercel
- Entrá a vercel.com → "Add New Project"
- Importá el repo de GitHub
- En "Environment Variables" agregá:
  - Nombre: `GROQ_API_KEY`
  - Valor: tu key de Groq (gsk_...)
- Click "Deploy"

### 4. Compartir el link
- Vercel te da un link tipo `mera-chatbot.vercel.app`
- Ese link lo abrís en cualquier PC, sin instalar nada
- Podés poner un dominio propio si querés (ej: chatbot.mera.com)

## Estructura del proyecto
```
mera-chatbot-groq/
├── server.js          ← Servidor Node.js (maneja la API)
├── package.json       ← Dependencias
├── vercel.json        ← Configuración de deploy
└── public/
    └── index.html     ← El chatbot (frontend)
```
