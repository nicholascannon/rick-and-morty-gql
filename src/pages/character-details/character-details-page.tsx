import { useParams } from 'react-router';

import { CharacterNotFound } from './character-not-found';
import { EpisodeTable } from './episode-table';
import { useGetCharacter } from './hooks/use-get-character';

import { Skeleton } from '@/components/ui/skeleton';

export function CharacterDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const { loading, data } = useGetCharacter(id);
    const character = data?.character;

    if (!loading && !character) return <CharacterNotFound />;

    return (
        <div className="flex flex-col gap-10">
            <section className="flex flex-row gap-12 items-center">
                {character ? (
                    <img
                        className="w-[200px] h-[200px] rounded-full"
                        src={character.image ?? '/headshot.jpg'}
                        alt={
                            character
                                ? `Image of ${character.name}`
                                : 'Character avatar'
                        }
                    />
                ) : (
                    <Skeleton className="w-[200px] h-[200px] rounded-full" />
                )}

                <div>
                    {character ? (
                        <>
                            <h1 className="text-3xl">{character.name}</h1>
                            <p className="text-gray-500 text-xl">
                                {character?.species} &middot;{' '}
                                {character?.gender}
                            </p>

                            <p className="text-sm text-gray-500 mt-2">{`Origin: ${character?.origin?.name ?? 'unknown'}`}</p>
                            <p className="text-sm text-gray-500">{`Last seen: ${character?.lastLocation?.name ?? 'unknown'}`}</p>
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
