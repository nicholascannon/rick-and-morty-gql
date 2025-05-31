import { Frown } from 'lucide-react';

export function NoResults() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-32">
      <Frown className="text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No results</p>
    </div>
  );
}
