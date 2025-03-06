import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { FilterCharacter } from '@/__generated__/types';

export function useSyncFilterParams(
    filterState: FilterCharacter,
    page: number,
) {
    const navigate = useNavigate();

    useEffect(() => {
        const updatedParams = new URLSearchParams();

        updatedParams.set('page', String(page));
        if (filterState.name) updatedParams.set('name', filterState.name);
        if (filterState.status) updatedParams.set('status', filterState.status);
        if (filterState.gender) updatedParams.set('gender', filterState.gender);

        void navigate(`?${updatedParams.toString()}`, { replace: true });
    }, [filterState, navigate, page]);
}
