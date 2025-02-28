import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { CharacterTable } from './components/character-table';
import { TablePagination } from './components/table-pagination';
import { useGetCharacters } from './hooks/use-get-characters';

export function CharacterTablePage() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);

    const { data, error } = useGetCharacters(page);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    if (error) return <h1>Error: {error.message}</h1>;

    const characters = data?.characters?.results;
    const pagination = data?.characters?.info;

    return (
        <section className="flex flex-col gap-4">
            <CharacterTable characters={characters} />
            <TablePagination pagination={pagination} />
        </section>
    );
}
