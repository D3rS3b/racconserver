import { NewsFormData } from '@/types/news';
import { newsStorage } from '@/lib/newsStorage';
import NewsForm from '@/components/NewsForm';

export default function CreateNews() {
  const handleSubmit = async (data: NewsFormData): Promise<void> => {
    await newsStorage.save(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NewsForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
}