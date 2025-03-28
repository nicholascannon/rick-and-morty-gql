import { useParams } from 'react-router';

import { CharacterNotFound } from './components/character-not-found';
import { EpisodeTable } from './components/episode-table';
import { useGetCharacter } from './services/use-get-character';

import { Skeleton } from '@/components/ui/skeleton';
import { CharacterAvatar } from './components/character-avatar';

export function CharacterDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { loading, data: character } = useGetCharacter(id);

    if (!loading && !character) return <CharacterNotFound />;

    return (
        <div className="flex flex-col gap-10">
            <section className="flex flex-row gap-12 items-center">
                <CharacterAvatar character={character} />

                <div>
                    {character ? (
                        <>
                            <h1 className="text-3xl font-semibold">
                                {character.name}
                            </h1>
                            <p className="text-muted-foreground font-medium text-xl">
                                {character?.species} &middot;{' '}
                                {character?.gender}
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
            </section>

            <section>
                <h2 className="text-2xl ">Appears in</h2>
                <EpisodeTable character={character} />
            </section>
        </div>
    );
}
