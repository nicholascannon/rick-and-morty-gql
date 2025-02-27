import { useState } from 'react';
import { Link } from 'react-router';

import { useGetCharacters } from './hooks/use-get-characters';
import { isCharacter } from './utils/is-character';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function CharacterTablePage() {
    const [page] = useState(1);
    const { data, error } = useGetCharacters(page);

    if (error) return <h1>Error: {error.message}</h1>;

    const characters = data?.characters?.results;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {characters
                    ? characters.filter(isCharacter).map((character) => (
                          <TableRow key={character.id}>
                              <TableCell className="flex flex-row items-center">
                                  <Avatar>
                                      <AvatarImage
                                          src={
                                              character.image ?? '/headshot.jpg'
                                          }
                                          alt={character.name ?? 'Character'}
                                      />
                                  </Avatar>

                                  <Link
                                      to={`/character/${character.id}`}
                                      className="ml-4"
                                  >
                                      {character.name ?? 'Unknown character'}
                                  </Link>
                              </TableCell>
                          </TableRow>
                      ))
                    : new Array(10).fill(null).map((_, index) => (
                          <TableRow key={index}>
                              <TableCell>
                                  <Skeleton className="h-[20px] w-[150px]" />
                              </TableCell>
                          </TableRow>
                      ))}
            </TableBody>
        </Table>
    );
}
