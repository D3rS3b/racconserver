import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { News } from '@/types/news';
import { Calendar, User, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  news: News;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export default function NewsCard({ news, onDelete, showActions = true }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete && window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      onDelete(news.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {news.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-xl leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
            <Link to={`/news/${news.id}`}>
              {news.title}
            </Link>
          </h3>
          {showActions && (
            <div className="flex gap-1 flex-shrink-0">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Link to={`/edit/${news.id}`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {news.summary}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{news.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/news/${news.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Leer más
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}