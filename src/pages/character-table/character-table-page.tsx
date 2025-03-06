import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { CharacterTable } from './components/character-table';
import { TableFilters } from './components/table-filters';
import { TablePagination } from './components/table-pagination';
import { useGetCharacters } from './hooks/use-get-characters';
import { useSyncFilterParams } from './hooks/use-sync-filter-params';

import { FilterCharacter } from '@/__generated__/types';

export function CharacterTablePage() {
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page') ?? 1);
    const name = searchParams.get('name');
    const status = searchParams.get('status');
    const gender = searchParams.get('gender');

    const [filterState, setFilterState] = useState<FilterCharacter>({
        name,
        status,
        gender,
    });

    const { data, error } = useGetCharacters(page, filterState);

    useSyncFilterParams(filterState, page);

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
