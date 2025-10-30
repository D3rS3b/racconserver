import { News, NewsFormData } from '@/types/news';

const NEWS_STORAGE_KEY = 'news-app-data';

export const newsStorage = {
  // Obtener todas las noticias
  getAll: (): News[] => {
    try {
      const data = localStorage.getItem(NEWS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading news:', error);
      return [];
    }
  },

  // Obtener noticia por ID
  getById: (id: string): News | null => {
    const news = newsStorage.getAll();
    return news.find(item => item.id === id) || null;
  },

  // Guardar nueva noticia
  save: async (newsData: NewsFormData): Promise<News> => {
    const news = newsStorage.getAll();
    const newNews: News = {
      id: generateId(),
      title: newsData.title,
      content: newsData.content,
      summary: newsData.summary,
      author: newsData.author,
      image: await processImage(newsData.image),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    news.unshift(newNews); // Agregar al inicio
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    return newNews;
  },

  // Actualizar noticia existente
  update: async (id: string, newsData: NewsFormData): Promise<News | null> => {
    const news = newsStorage.getAll();
    const index = news.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    const updatedNews: News = {
      ...news[index],
      title: newsData.title,
      content: newsData.content,
      summary: newsData.summary,
      author: newsData.author,
      image: await processImage(newsData.image) || news[index].image,
      updatedAt: new Date().toISOString(),
    };

    news[index] = updatedNews;
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    return updatedNews;
  },

  // Eliminar noticia
  delete: (id: string): boolean => {
    const news = newsStorage.getAll();
    const filteredNews = news.filter(item => item.id !== id);
    
    if (filteredNews.length === news.length) return false;
    
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(filteredNews));
    return true;
  },

  // Buscar noticias
  search: (query: string): News[] => {
    const news = newsStorage.getAll();
    const lowerQuery = query.toLowerCase();
    
    return news.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.author.toLowerCase().includes(lowerQuery)
    );
  }
};

// Generar ID único
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Procesar imagen (convertir a base64 si es File)
async function processImage(image?: File | string): Promise<string | undefined> {
  if (!image) return undefined;
  
  if (typeof image === 'string') return image;
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => resolve(undefined);
    reader.readAsDataURL(image);
  });
}

// Inicializar con datos de ejemplo si no hay noticias
export const initializeDefaultNews = () => {
  const existing = newsStorage.getAll();
  if (existing.length === 0) {
    const defaultNews: News[] = [
      {
        id: '1',
        title: 'Bienvenido al Sistema de Noticias',
        summary: 'Esta es tu primera noticia de ejemplo en el sistema.',
        content: 'Este es el contenido completo de tu primera noticia. Aquí puedes escribir todo el detalle de la información que quieres compartir. El sistema permite agregar imágenes, editar contenido y gestionar todas tus noticias de manera sencilla.',
        author: 'Administrador',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Funcionalidades del Sistema',
        summary: 'Conoce todas las características disponibles en esta plataforma.',
        content: 'El sistema de noticias incluye las siguientes funcionalidades: crear nuevas noticias, editar noticias existentes, eliminar noticias, subir imágenes, buscar contenido, y un diseño completamente responsive. Todo está construido con las últimas tecnologías web.',
        author: 'Desarrollador',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      }
    ];
    
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(defaultNews));
  }
};