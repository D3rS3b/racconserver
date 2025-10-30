Sistema de Noticias
Un sistema completo de gestión de noticias desarrollado con React, TypeScript, Shadcn-ui y Tailwind CSS. Permite crear, editar, eliminar y gestionar noticias con soporte para imágenes y búsqueda.

🚀 Características
✅ Gestión completa de noticias: Crear, leer, actualizar y eliminar
✅ Subida de imágenes: Soporte para imágenes en las noticias
✅ Búsqueda avanzada: Buscar por título, contenido o autor
✅ Diseño responsive: Optimizado para móviles y escritorio
✅ Almacenamiento local: Datos persistentes en localStorage
✅ Interfaz moderna: Diseño elegante con Shadcn-ui y Tailwind CSS
✅ Validación de formularios: Validación en tiempo real
✅ Compartir noticias: Funcionalidad de compartir integrada
🛠️ Tecnologías Utilizadas
Frontend: React 18 + TypeScript
Styling: Tailwind CSS + Shadcn-ui
Routing: React Router DOM
Build Tool: Vite
Package Manager: pnpm
Deployment: Netlify
📦 Instalación y Desarrollo Local
Prerrequisitos
Node.js 18 o superior
pnpm (recomendado) o npm
Pasos de instalación
Clonar el repositorio

git clone <url-del-repositorio>
cd sistema-noticias
Instalar dependencias

pnpm install
Iniciar servidor de desarrollo

pnpm run dev
Abrir en el navegador

http://localhost:5173
Comandos disponibles
# Desarrollo
pnpm run dev          # Iniciar servidor de desarrollo
pnpm run build        # Construir para producción
pnpm run preview      # Previsualizar build de producción
pnpm run lint         # Ejecutar linter

# Dependencias
pnpm install          # Instalar dependencias
pnpm add <package>    # Agregar nueva dependencia
🚀 Despliegue en Netlify
Opción 1: Despliegue automático desde Git
Subir código a Bitbucket

# Inicializar repositorio Git (si no existe)
git init

# Agregar archivos
git add .
git commit -m "Initial commit: Sistema de noticias completo"

# Conectar con Bitbucket
git remote add origin https://bitbucket.org/tu-usuario/tu-repositorio.git
git push -u origin main
Conectar Netlify con Bitbucket

Ir a Netlify y crear cuenta
Hacer clic en “New site from Git”
Seleccionar “Bitbucket” como proveedor
Autorizar Netlify para acceder a tu cuenta de Bitbucket
Seleccionar tu repositorio
Configurar build settings

Build command: pnpm install && pnpm run build
Publish directory: dist
Deploy

Hacer clic en “Deploy site”
Netlify detectará automáticamente el archivo netlify.toml
Opción 2: Despliegue manual
Construir el proyecto

pnpm run build
Subir carpeta dist

Ir a Netlify Dashboard
Arrastrar la carpeta dist a la zona de deploy
Variables de entorno (si necesarias)
Si en el futuro necesitas variables de entorno:

# En Netlify Dashboard > Site settings > Environment variables
VITE_API_URL=https://tu-api.com
VITE_APP_NAME=Sistema de Noticias
📁 Estructura del Proyecto
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de Shadcn-ui
│   ├── ImageUpload.tsx # Componente de subida de imágenes
│   ├── NewsCard.tsx    # Tarjeta de noticia
│   └── NewsForm.tsx    # Formulario de noticia
├── lib/                # Utilidades y helpers
│   └── newsStorage.ts  # Gestión de localStorage
├── pages/              # Páginas de la aplicación
│   ├── Index.tsx       # Página principal
│   ├── NewsDetail.tsx  # Detalle de noticia
│   ├── CreateNews.tsx  # Crear noticia
│   ├── EditNews.tsx    # Editar noticia
│   └── NotFound.tsx    # Página 404
├── types/              # Definiciones de tipos TypeScript
│   └── news.ts         # Tipos relacionados con noticias
├── App.tsx             # Componente raíz
└── main.tsx           # Punto de entrada
🔧 Configuración
Netlify
El archivo netlify.toml incluye:

Configuración de build automático
Redirects para SPA (Single Page Application)
Headers de seguridad y cache
Optimización para archivos estáticos
TypeScript
Configuración estricta para mejor calidad de código:

Strict mode habilitado
Path aliases configurados (@/ apunta a src/)
Tipos explícitos para mejor IntelliSense
🎨 Personalización
Colores y tema
Modifica tailwind.config.ts para personalizar colores:

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
Componentes
Los componentes de Shadcn-ui se pueden personalizar en src/components/ui/

📱 Funcionalidades
Gestión de Noticias
Crear: Formulario completo con validación
Leer: Vista de lista y detalle individual
Actualizar: Edición in-place con datos precargados
Eliminar: Confirmación antes de eliminar
Características adicionales
Búsqueda: Busca en título, contenido y autor
Imágenes: Subida y preview de imágenes (base64)
Responsive: Diseño adaptativo para todos los dispositivos
Validación: Validación en tiempo real de formularios
Persistencia: Datos guardados en localStorage del navegador
🐛 Solución de Problemas
Build errors
# Limpiar cache y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verificar linting
pnpm run lint
Netlify deployment issues
Verificar que netlify.toml esté en la raíz
Confirmar que el build command sea correcto
Revisar los logs de build en Netlify Dashboard
Problemas de rutas en producción
El archivo netlify.toml incluye redirects para SPA. Si tienes problemas:

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.

🤝 Contribución
Fork el proyecto
Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request
📞 Soporte
Si tienes problemas o preguntas:

Revisa la documentación
Busca en issues existentes
Crea un nuevo issue con detalles del problema
Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS