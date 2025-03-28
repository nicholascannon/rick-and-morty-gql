import type { Maybe } from '@/__generated__/types';
import { Skeleton } from '@/components/ui/skeleton';

export function CharacterAvatar({
    character,
}: {
    character?: { image?: Maybe<string>; name?: Maybe<string> } | null;
}) {
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
