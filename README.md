# FM Brava 94.9 - Sitio Web Oficial

Sitio web oficial de FM Brava 94.9, la radio urbana líder en Mendoza. Plataforma moderna construida con `Astro` que ofrece streaming en vivo, contenido dinámico y una experiencia optimizada para la audiencia de la nueva generación.

---

## 🚀 Quick Start

Clona el repositorio y arranca en local:

```bash
git clone <repository-url>
cd fmbrava
cp .env.example .env
# Edita .env con tus configuraciones específicas
npm install
npm run dev
```

- Sitio Web (dev): http://localhost:4321

---

## 🏗️ Arquitectura del Sistema

Stack tecnológico principal:

- Framework: `Astro` — rendimiento y SEO
- UI interactiva: `React` (integrado en Astro)
- Estilos: `Tailwind CSS`
- Tipado: `TypeScript`
- Iconos: `Lucide`

Características clave:
- Reproductor de radio en vivo con controles avanzados
- Diseño responsive y mobile-first
- Renderizado estático / SSR híbrido para máxima performance y SEO
- PWA ready y accesibilidad (WCAG 2.1)
- Integración con CMS para contenidos dinámicos (news, agenda, programación)

---

## 🎵 Funcionalidades Principales

Player de Radio
- Streaming en tiempo real de FM Brava 94.9
- Controles (play/pause, volumen, fallback stream)
- Visualización del programa en aire y metadatos
- Soporte mobile y desktop

Sistema de Agenda
- Endpoints y utilidades para listar eventos
- Componentes SSR y client-side para interacción (`AgendaHero.astro`, `Hero.tsx`)
- Integración con CMS para contenidos dinámicos

Componentes y Contenido
- `Hero.astro`: sección principal con branding, CTA y enlaces sociales
- `Player.tsx`: componente React para el reproductor
- Sistema modular de noticias y playlists

---

## 📁 Estructura del Proyecto

Estructura principal (resumen):

```
src/
├── components/          # Componentes reutilizables
│   ├── home/            # Componentes específicos del home (Hero.astro, Player.tsx)
│   ├── agenda/          # Componentes de agenda (AgendaHero.astro, Hero.tsx)
│   ├── brava-news/      # Componentes de noticias
│   ├── containers/      # Componentes contenedores
│   └── Button.astro     # Componente de botón
├── layouts/             # Layouts de página
├── pages/               # Páginas del sitio
├── assets/              # Assets estáticos
├── config/              # Configuraciones
├── constants/           # Constantes del proyecto
├── hooks/               # Custom hooks de React
├── interfaces/          # Interfaces TypeScript
├── lib/                 # Librerías y utilidades
├── utils/               # Funciones utilitarias (e.g. fetchAgenda.ts)
└── env.d.ts             # Tipos de entorno
```

Assets públicos:

```
public/
├── backgrounds/
├── favicon/
├── fonts/
├── images/
├── sections-icons/
├── svg/
└── video/
```

---

## ⚙️ Configuración Técnica

Astro
- Archivo de configuración: `astro.config.mjs`
- Integración de React y Tailwind, optimizaciones de build y SSR/SSG híbrida.

TypeScript
- `tsconfig.json` y `env.d.ts` para definiciones de entorno y tipos.

Tailwind CSS
- Configurado para el sistema de diseño del brand (utilities, components, responsive).

Player / Streaming
- Variables en `.env` para `STREAM_URL` y `FALLBACK_STREAM`.
- Manejo de reconexión y fallback en el componente `Player.tsx`.

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev            # Servidor de desarrollo con hot reload
npm run start          # Alias para dev (según configuración)

# Producción
npm run build          # Build para producción
npm run preview        # Preview local del build

# Mantenimiento
npm run astro          # CLI de Astro
npm run check          # Verificación de tipos TypeScript
npm run lint           # Linting
npm run format         # Formateo de código
```

---

## 🌐 Despliegue

### 🐳 Docker

**Ejemplo para Windows (PowerShell):**
```powershell
# Construir la imagen
docker build -t brava949:latest .

# Ejecutar el contenedor en Windows
docker run -d --name brava949 --restart unless-stopped `
  --env-file .env -p 4321:4321 brava949:latest

# Ejecutar el contenedor en Linux
docker run -d --name brava949 --restart unless-stopped \
  --env-file .env -p 4321:4321 brava949:latest

---

## 🔧 Variables de Entorno (ejemplo)

Agrega estas variables en tu `.env` (o en los secrets del proveedor de despliegue):

```
# API
CMS_API_BASE=https://webscms.grupoamericainterior.com.ar/api/
VITE_CMS_PUBLIC_URL=https://webscms.grupoamericainterior.com.ar
CMS_API_KEY= xxx-xxxx-xxx-xxx
META_TOKEN=xxxx

---

## 📱 Integración con CMS

Endpoints consumidos (ejemplos):
- `GET /api/agenda` — Eventos y programación
- `GET /api/news` — Noticias y artículos
- `GET /api/programs` — Información de programas
- `GET /api/playlist` — Lista de reproducción actual

Usa `fetchAgenda` y otras utilidades en `src/utils/` para integrar contenido dinámico en las páginas SSR/SSG.

---
**Orgullosamente desarrollado y diseñado por Aftercode**

---
