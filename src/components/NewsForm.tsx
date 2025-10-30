import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsFormData, News } from '@/types/news';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft } from 'lucide-react';

interface NewsFormProps {
  initialData?: News;
  onSubmit: (data: NewsFormData) => Promise<void>;
  isEditing?: boolean;
}

export default function NewsForm({ initialData, onSubmit, isEditing = false }: NewsFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    summary: initialData?.summary || '',
    author: initialData?.author || '',
    image: initialData?.image || undefined,
  });

  const [errors, setErrors] = useState<Partial<NewsFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<NewsFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'El resumen es obligatorio';
    } else if (formData.summary.length < 10) {
      newErrors.summary = 'El resumen debe tener al menos 10 caracteres';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es obligatorio';
    } else if (formData.content.length < 20) {
      newErrors.content = 'El contenido debe tener al menos 20 caracteres';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'El autor es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const submitData: NewsFormData = {
        ...formData,
        image: selectedImage || formData.image,
      };
      
      await onSubmit(submitData);
      navigate('/');
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error al guardar la noticia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof NewsFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>
        
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Noticia' : 'Crear Nueva Noticia'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isEditing ? 'Modifica los campos que desees actualizar' : 'Completa todos los campos para publicar tu noticia'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la noticia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Escribe el título de la noticia"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Nombre del autor"
                  className={errors.author ? 'border-red-500' : ''}
                />
                {errors.author && (
                  <p className="text-sm text-red-500">{errors.author}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Resumen *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Escribe un breve resumen de la noticia"
                rows={3}
                className={errors.summary ? 'border-red-500' : ''}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Escribe el contenido completo de la noticia"
                rows={8}
                className={errors.content ? 'border-red-500' : ''}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            <ImageUpload
              onImageSelect={setSelectedImage}
              currentImage={initialData?.image}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 md:flex-none"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Publicar')}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}