import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export interface FilterState {
  page: number;
  name?: string;
  gender?: string;
  status?: string;
}

export function useTableFilters() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const name = searchParams.get('name') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const gender = searchParams.get('gender') ?? undefined;

  const [filterState, setFilterState] = useState<FilterState>({
    page,
    name,
    status,
    gender,
  });

  // Sync URL to react state (page is the only value that may change outside of react state)
  useEffect(() => {
    setFilterState((prev) => ({ ...prev, page }));
  }, [page]);

  // Sync react state to URL
  useEffect(() => {
    // cannot have undefined or non string values in URL
    const cleanState = Object.fromEntries(
      Object.entries(filterState)
        .filter(([, value]) => value)
        .map(([key, value]) => [key, String(value)]),
    );
    const updatedParams = new URLSearchParams(cleanState);

    void navigate(`?${updatedParams.toString()}`, { replace: true });
  }, [filterState, navigate]);

  const resetFilters = useCallback(() => setFilterState({ page: 1 }), []);

  return {
    filterState,
    setFilterState,
    resetFilters,
  };
}
