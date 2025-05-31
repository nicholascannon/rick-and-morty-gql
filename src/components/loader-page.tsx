import { LoaderCircle as Loader } from 'lucide-react';

export function LoaderPage() {
  return (
    <section className="flex justify-center mt-8">
      <Loader className="animate-spin text-muted-foreground" />
    </section>
  );
}
