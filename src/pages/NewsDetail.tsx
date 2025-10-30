import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { News } from '@/types/news';
import { newsStorage } from '@/lib/newsStorage';
import { ArrowLeft, Calendar, User, Edit, Trash2, Share2 } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const newsItem = newsStorage.getById(id);
      setNews(newsItem);
    }
    setIsLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (news && window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      const success = newsStorage.delete(news.id);
      if (success) {
        navigate('/');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && news) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">Noticia no encontrada</h2>
            <p className="text-muted-foreground mb-6">
              La noticia que buscas no existe o ha sido eliminada.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a noticias
          </Button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {news.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{news.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado el {formatDate(news.createdAt)}</span>
                </div>
                {news.updatedAt !== news.createdAt && (
                  <Badge variant="secondary" className="text-xs">
                    Actualizado el {formatDate(news.updatedAt)}
                  </Badge>
                )}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {news.summary}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <Link to={`/edit/${news.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {news.image && (
          <div className="mb-8">
            <Card className="overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-64 sm:h-96 object-cover"
              />
            </Card>
          </div>
        )}

        {/* Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {news.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <footer className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>¿Te gustó esta noticia? Compártela con otros.</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
              >
                <Link to={`/edit/${news.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar noticia
                </Link>
              </Button>
              <Button asChild>
                <Link to="/">
                  Ver más noticias
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}