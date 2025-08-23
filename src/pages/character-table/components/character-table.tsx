import type {
  PaginationInfoFragment,
  TableCharacterFragment,
} from '@/__generated__/graphql';
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
import { Link } from 'react-router';
import { isCharacter } from '../utils/is-character';
import { NoResults } from './no-results';

interface Props {
  page: number;
  characters: (TableCharacterFragment | null)[] | undefined | null;
  pagination: PaginationInfoFragment | null | undefined;
  loading: boolean;
}

const SKELETON_ROWS = 20;

export function CharacterTable({
  page,
  characters,
  pagination,
  loading,
}: Props) {
  return (
    <>
      <PageInfo
        page={page}
        loading={loading}
        resultCount={characters?.length}
        pagination={pagination}
      />

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
                        src={character.image ?? '/headshot.jpg'}
                        alt={character.name ?? 'Character'}
                      />
                    </Avatar>

                    <Link
                      to={`/character/${character.id}`}
                      className="ml-4 hover:underline"
                    >
                      {character.name ?? 'Unknown character'}
                    </Link>
                  </TableCell>

                  <TableCell>{character.status}</TableCell>

                  <TableCell>{character.species}</TableCell>

                  <TableCell>{character.gender}</TableCell>
                </TableRow>
              ))
            : new Array(SKELETON_ROWS).fill(null).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <TableRow key={index}>
                  <TableCell className="flex flex-row items-center">
                    <Skeleton className="h-[40px] w-[40px] rounded-full" />
                    <Skeleton className="h-[20px] w-[150px] ml-4" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-[20px] w-[40px]" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-[20px] w-[80px]" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-[20px] w-[50px]" />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {characters?.length === 0 && <NoResults />}
    </>
  );
}

function PageInfo({
  page,
  resultCount,
  pagination,
  loading,
}: {
  page: number;
  resultCount: number | undefined;
  pagination: PaginationInfoFragment | undefined | null;
  loading: boolean;
}) {
  if (loading) return <Skeleton className="h-6 w-44" />;
  if (!resultCount || !pagination) return null;

  return (
    <p className="text-sm text-muted-foreground">
      Showing {(page - 1) * resultCount + 1} -{' '}
      {Math.min(page * resultCount, pagination.count ?? 0)} of{' '}
      {pagination.count}
    </p>
  );
}
