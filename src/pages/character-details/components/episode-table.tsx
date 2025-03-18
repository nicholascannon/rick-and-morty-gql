import type { GetCharacterQuery } from '@/__generated__/types';
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
    character: GetCharacterQuery['character'] | undefined;
}

export function EpisodeTable({ character }: Props) {
    return (
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
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
    );
}
