import { useEffect } from 'react';

import { CharacterTable } from './components/character-table';
import { TableFilters } from './components/table-filters';
import { TablePagination } from './components/table-pagination';
import { useTableFilters } from './hooks/use-table-filters';
import { useGetCharacters } from './services/use-get-characters';

export function CharacterTablePage() {
    const { filterState, setFilterState } = useTableFilters();

    const { page, ...otherFilters } = filterState;
    const { data, error } = useGetCharacters(page, otherFilters);

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
            <CharacterTable characters={characters} pagination={pagination} />
            <TablePagination pagination={pagination} />
        </section>
    );
}
