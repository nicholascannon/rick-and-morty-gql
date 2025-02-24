import { Link, useParams } from 'react-router';

import { useGetCharacter } from './hooks/use-get-character';

import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function CharacterDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const { loading, data } = useGetCharacter(id);
    const character = data?.character;

    if (!loading && !character) {
        return (
            <section className="flex flex-col gap-4 justify-center items-center">
                <img
                    className="w-[200px] h-[200px] rounded-full"
                    src="/headshot.jpg"
                    alt="Unknown character avatar"
                />
                <div className="text-center">
                    <h1 className="text-3xl ">Oops! Who is that?</h1>
                    <p className="text-gray-500">
                        Sorry that character doesn&apos;t exist.{' '}
                        <Link className="underline" to="/">
                            Go back
                        </Link>
                        .
                    </p>
                </div>
            </section>
        );
    }

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
                <h2 className="text-2xl ">Episodes</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Episode</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Aired</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {character
                            ? character?.episode.map((episode) => (
                                  <TableRow key={episode?.id}>
                                      <TableCell>{episode?.episode}</TableCell>
                                      <TableCell>{episode?.name}</TableCell>
                                      <TableCell>{episode?.air_date}</TableCell>
                                  </TableRow>
                              ))
                            : new Array(5).fill(null).map((_, index) => (
                                  <TableRow key={index}>
                                      <TableCell>
                                          <Skeleton className="h-[20px] w-[50px]" />
                                      </TableCell>
                                      <TableCell>
                                          <Skeleton className="h-[20px] w-[150px]" />
                                      </TableCell>
                                      <TableCell>
                                          <Skeleton className="h-[20px] w-[100px]" />
                                      </TableCell>
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </section>
        </div>
    );
}
