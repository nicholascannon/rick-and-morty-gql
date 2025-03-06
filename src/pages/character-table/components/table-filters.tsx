import debounce from 'lodash.debounce';
import { useState } from 'react';

import { FilterCharacter } from '@/__generated__/types';
import { DropDownSelect } from '@/components/drop-down-select';
import { Input } from '@/components/ui/input';
import { SelectItem } from '@/components/ui/select';

interface Props {
    filterState: FilterCharacter;
    updateFilters: (filter: FilterCharacter) => void;
}

export function TableFilters(props: Props) {
    const [localFilterState, setLocalFilterState] = useState<FilterCharacter>(
        props.filterState,
    );
    const updateFilters = debounce(props.updateFilters, 250);

    const onFilterChange = (name: string, value: string | undefined) => {
        const updatedState = {
            ...localFilterState,
            [name]: value,
        };
        setLocalFilterState(updatedState);
        updateFilters(updatedState);
    };

    return (
        <section className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Input
                name="name"
                value={localFilterState.name ?? ''}
                onChange={(e) => onFilterChange(e.target.name, e.target.value)}
                className="md:w-1/3"
                placeholder="Search characters"
            />

            <DropDownSelect
                placeholder="Status"
                value={localFilterState.status ?? ''}
                triggerClassName="md:w-[180px]"
                options={
                    <>
                        <SelectItem value="Alive">Alive</SelectItem>
                        <SelectItem value="Dead">Dead</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                    </>
                }
                onValueChange={(value) => onFilterChange('status', value)}
                onReset={() => onFilterChange('status', undefined)}
            />

            <DropDownSelect
                placeholder="Gender"
                value={localFilterState.gender ?? ''}
                triggerClassName="md:w-[180px]"
                options={
                    <>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Genderless">Genderless</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                    </>
                }
                onValueChange={(value) => onFilterChange('gender', value)}
                onReset={() => onFilterChange('gender', undefined)}
            />
        </section>
    );
}
