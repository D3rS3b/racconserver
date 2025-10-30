Sistema de Noticias - Plan de Desarrollo MVP
Archivos a crear/modificar:
1. Tipos y interfaces (src/types/news.ts)
Definir interfaces para News, NewsFormData
Tipos para manejo de imágenes
2. Utilidades de almacenamiento (src/lib/newsStorage.ts)
Funciones para localStorage: guardar, obtener, actualizar, eliminar noticias
Manejo de IDs únicos
3. Componentes principales:
src/components/NewsCard.tsx: Tarjeta para mostrar noticia en lista
src/components/NewsForm.tsx: Formulario para crear/editar noticias
src/components/ImageUpload.tsx: Componente para subir imágenes
4. Páginas:
src/pages/Index.tsx: Página principal con lista de noticias (reescribir)
src/pages/NewsDetail.tsx: Página de detalle de noticia
src/pages/CreateNews.tsx: Página para crear noticia
src/pages/EditNews.tsx: Página para editar noticia
5. Configuración:
src/App.tsx: Actualizar rutas
index.html: Actualizar título y meta tags
netlify.toml: Configuración para despliegue en Netlify
README.md: Documentación completa con instrucciones
Funcionalidades MVP:
✅ Listar noticias en página principal
✅ Ver detalle de noticia individual
✅ Crear nueva noticia con imagen
✅ Editar noticia existente
✅ Eliminar noticia
✅ Almacenamiento en localStorage
✅ Diseño responsive con Tailwind CSS
Limitaciones MVP:
Imágenes se almacenan como base64 en localStorage
No hay autenticación de usuarios
No hay categorías de noticias
No hay sistema de comentarios