import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { News } from '@/types/news';
import { newsStorage, initializeDefaultNews } from '@/lib/newsStorage';
import NewsCard from '@/components/NewsCard';
import { Plus, Search, Newspaper, RefreshCw } from 'lucide-react';

export default function Index() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = newsStorage.search(searchQuery);
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news]);

  const loadNews = () => {
    setIsLoading(true);
    try {
      initializeDefaultNews();
      const allNews = newsStorage.getAll();
      setNews(allNews);
      setFilteredNews(allNews);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const success = newsStorage.delete(id);
    if (success) {
      loadNews();
    }
  };

  const handleRefresh = () => {
    loadNews();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-muted-foreground">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de Noticias</h1>
                <p className="text-sm text-muted-foreground">Gestiona y publica tus noticias</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button asChild>
                <Link to="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Noticia
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar noticias por título, contenido o autor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{news.length}</div>
              <div className="text-sm text-muted-foreground">Total de noticias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{filteredNews.length}</div>
              <div className="text-sm text-muted-foreground">Resultados mostrados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(news.map(n => n.author)).size}
              </div>
              <div className="text-sm text-muted-foreground">Autores únicos</div>
            </CardContent>
          </Card>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Últimas Noticias'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredNews.length} {filteredNews.length === 1 ? 'noticia' : 'noticias'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((newsItem) => (
                <NewsCard
                  key={newsItem.id}
                  news={newsItem}
                  onDelete={handleDelete}
                  showActions={true}
                />
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? 'No se encontraron noticias' : 'No hay noticias publicadas'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Comienza creando tu primera noticia'
                }
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link to="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primera Noticia
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Sistema de Noticias - Desarrollado con React, TypeScript y Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}