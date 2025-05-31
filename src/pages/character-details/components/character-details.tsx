import { Skeleton } from '@/components/ui/skeleton';
import type { Character } from '../services/types';

export function CharacterDetails({ character }: { character: Character }) {
  return (
    <div>
      {character ? (
        <>
          <h1 className="text-3xl font-semibold">{character.name}</h1>
          <p className="text-muted-foreground font-medium text-xl">
            {character?.species} &middot; {character?.gender}
          </p>

          <p className="text-sm text-muted-foreground mt-2">{`Origin: ${character?.origin?.name ?? 'unknown'}`}</p>
          <p className="text-sm text-muted-foreground">{`Last seen: ${character?.lastLocation?.name ?? 'unknown'}`}</p>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Skeleton className="h-[30px] w-[200px]" />
            <Skeleton className="h-[20px] w-[150px]" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-[14px] w-[165px] mt-2" />
            <Skeleton className="h-[14px] w-[165px]" />
          </div>
        </>
      )}
    </div>
  );
}
