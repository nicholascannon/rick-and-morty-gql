import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';

import { useGetCharacters } from './hooks/use-get-characters';
import { isCharacter } from './utils/is-character';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
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
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);

    const { data, error } = useGetCharacters(page);

    useEffect(() => {
        scrollToTop();
    }, [page]);

    if (error) return <h1>Error: {error.message}</h1>;

    const characters = data?.characters?.results;
    const pagination = data?.characters?.info;

    const getPageLink = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(page));
        return `/?${newParams.toString()}`;
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <section className="flex flex-col gap-4">
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
                              </TableRow>
                          ))
                        : new Array(10).fill(null).map((_, index) => (
                              <TableRow key={index}>
                                  <TableCell className="flex flex-row items-center">
                                      <Skeleton className="h-[40px] w-[40px] rounded-full" />
                                      <Skeleton className="h-[20px] w-[150px] ml-4" />
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>

            {pagination ? (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            {/* TODO: look into moving disabled code into a variant of the PaginationLink */}
                            <PaginationPrevious
                                className={
                                    !pagination.prev
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }
                                aria-disabled={!pagination.prev}
                                to={
                                    pagination.prev
                                        ? getPageLink(pagination.prev)
                                        : '#'
                                }
                            />
                        </PaginationItem>

                        {/* TODO: add page numbers */}
                        {/* <PaginationItem>
                            <PaginationLink>1</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink isActive>2</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> */}

                        <PaginationItem>
                            <PaginationNext
                                className={
                                    !pagination.next
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }
                                aria-disabled={!pagination.next}
                                to={
                                    pagination.next
                                        ? getPageLink(pagination.next)
                                        : '#'
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            ) : (
                <div className="mx-auto flex w-full justify-center">
                    <div className="flex flex-row items-center gap-1">
                        <Skeleton className="h-10 w-20 rounded-md" />
                        <Skeleton className="h-10 w-20 rounded-md" />
                    </div>
                </div>
            )}
        </section>
    );
}
