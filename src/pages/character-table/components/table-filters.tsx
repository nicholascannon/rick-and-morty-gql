import debounce from 'lodash.debounce';
import { useState } from 'react';

import { FilterCharacter } from '@/__generated__/types';
import { Input } from '@/components/ui/input';

interface Props {
    filterState: FilterCharacter;
    updateFilters: (filter: FilterCharacter) => void;
}

export function TableFilters(props: Props) {
    const [localFilterState, setLocalFilterState] = useState<FilterCharacter>(
        props.filterState,
    );
    const updateFilters = debounce(props.updateFilters, 250);

    const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedState = {
            ...localFilterState,
            [e.target.name]: e.target.value,
        };
        setLocalFilterState(updatedState);
        updateFilters(updatedState);
    };

    return (
        <section className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Input
                name="name"
                value={localFilterState.name ?? ''}
                onChange={onFilterChange}
                className="md:w-1/3"
                placeholder="Search characters"
            />
        </section>
    );
}
