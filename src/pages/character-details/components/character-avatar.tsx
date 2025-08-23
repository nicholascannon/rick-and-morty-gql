import { Skeleton } from '@/components/ui/skeleton';
import type { Character } from '../types';

export function CharacterAvatar({ character }: { character: Character }) {
  if (!character) {
    return <Skeleton className="w-[200px] h-[200px] rounded-full" />;
  }

  return (
    <img
      className="w-[200px] h-[200px] rounded-full"
      src={character.image ?? '/headshot.jpg'}
      alt={character ? `Image of ${character.name}` : 'Character avatar'}
    />
  );
}
