import { useGetCharactersQuery } from '@/__generated__/graphql';
import { CharacterTable } from './components/character-table';
import { TableFilters } from './components/table-filters';
import { TablePagination } from './components/table-pagination';
import { useTableFilters } from './hooks/use-table-filters';

export function CharacterTablePage() {
  const { filterState, setFilterState } = useTableFilters();

  const { page, ...otherFilters } = filterState;
  const { data, loading, error } = useGetCharactersQuery({
    variables: {
      page,
      filter: otherFilters,
    },
  });
  const characters = data?.characters?.results;
  const pagination = data?.characters?.info;

  if (error) throw error;

  return (
    <section className="flex flex-col gap-4">
      <TableFilters filterState={filterState} updateFilters={setFilterState} />
      <CharacterTable
        page={page}
        loading={loading}
        characters={characters}
        pagination={pagination}
      />
      <TablePagination pagination={pagination} />
    </section>
  );
}
