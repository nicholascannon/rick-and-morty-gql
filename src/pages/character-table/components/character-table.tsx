import { Link } from 'react-router';

import { isCharacter } from '../utils/is-character';

import { NoResults } from './no-results';

import {
    PaginationInfoFragment,
    TableCharacterFragment,
} from '@/__generated__/types';
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

interface Props {
    characters: (TableCharacterFragment | null)[] | undefined | null;
    pagination: PaginationInfoFragment | null | undefined;
}

export function CharacterTable({ characters, pagination }: Props) {
    return (
        <>
            {pagination?.count && characters?.length && (
                <p className="text-sm text-muted-foreground">
                    Showing {characters?.length} of {pagination.count}
                </p>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Species</TableHead>
                        <TableHead>Gender</TableHead>
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
                                                  character.image ??
                                                  '/headshot.jpg'
                                              }
                                              alt={
                                                  character.name ?? 'Character'
                                              }
                                          />
                                      </Avatar>

                                      <Link
                                          to={`/character/${character.id}`}
                                          className="ml-4"
                                      >
                                          {character.name ??
                                              'Unknown character'}
                                      </Link>
                                  </TableCell>

                                  <TableCell>{character.status}</TableCell>

                                  <TableCell>{character.species}</TableCell>

                                  <TableCell>{character.gender}</TableCell>
                              </TableRow>
                          ))
                        : new Array(5).fill(null).map((_, index) => (
                              <TableRow key={index}>
                                  <TableCell className="flex flex-row items-center">
                                      <Skeleton className="h-[40px] w-[40px] rounded-full" />
                                      <Skeleton className="h-[20px] w-[150px] ml-4" />
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>

            {characters && characters.length === 0 && <NoResults />}
        </>
    );
}
