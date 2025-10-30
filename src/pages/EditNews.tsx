import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NewsFormData, News } from '@/types/news';
import { newsStorage } from '@/lib/newsStorage';
import NewsForm from '@/components/NewsForm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EditNews() {
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

  const handleSubmit = async (data: NewsFormData): Promise<void> => {
    if (id) {
      await newsStorage.update(id, data);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">Noticia no encontrada</h2>
            <p className="text-muted-foreground mb-6">
              La noticia que intentas editar no existe o ha sido eliminada.
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
      <NewsForm 
        initialData={news} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </div>
  );
}