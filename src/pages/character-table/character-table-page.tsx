import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { CharacterTable } from './components/character-table';
import { TableFilters } from './components/table-filters';
import { TablePagination } from './components/table-pagination';
import { useGetCharacters } from './hooks/use-get-characters';

import { FilterCharacter } from '@/__generated__/types';

export function CharacterTablePage() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);
    const name = searchParams.get('name');

    const [filterState, setFilterState] = useState<FilterCharacter>({ name });

    const { data, error } = useGetCharacters(page, filterState);

    useEffect(() => {
        const updatedParams = new URLSearchParams();
        updatedParams.set('page', String(page));
        if (filterState.name) updatedParams.set('name', filterState.name);

        void navigate(`?${updatedParams.toString()}`, { replace: true });
    }, [filterState, navigate, page]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    if (error) return <h1>Error: {error.message}</h1>;

    const characters = data?.characters?.results;
    const pagination = data?.characters?.info;

    return (
        <section className="flex flex-col gap-4">
            <TableFilters
                filterState={filterState}
                updateFilters={setFilterState}
            />
            <CharacterTable characters={characters} />
            <TablePagination pagination={pagination} />
        </section>
    );
}
