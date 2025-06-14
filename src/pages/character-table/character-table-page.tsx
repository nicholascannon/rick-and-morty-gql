import { ErrorPage } from '@/components/pages/error-page';
import { CharacterTable } from './components/character-table';
import { TableFilters } from './components/table-filters';
import { TablePagination } from './components/table-pagination';
import { useTableFilters } from './hooks/use-table-filters';
import { useGetCharacters } from './services/use-get-characters';

export function CharacterTablePage() {
  const { filterState, setFilterState } = useTableFilters();

  const { page, ...otherFilters } = filterState;
  const { data, loading, error } = useGetCharacters(page, otherFilters);

  if (error) return <ErrorPage error={error} />;

  return (
    <section className="flex flex-col gap-4">
      <TableFilters filterState={filterState} updateFilters={setFilterState} />
      <CharacterTable
        page={page}
        loading={loading}
        characters={data.characters}
        pagination={data.pagination}
      />
      <TablePagination pagination={data.pagination} />
    </section>
  );
}
