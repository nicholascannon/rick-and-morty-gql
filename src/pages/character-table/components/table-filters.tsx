import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';

import type { FilterState } from '../hooks/use-table-filters';

import { DropDownSelect } from '@/components/ui/drop-down-select';
import { Input } from '@/components/ui/input';
import { SelectItem } from '@/components/ui/select';
import { ClearButton } from '@/components/ui/clear-button';

interface Props {
    filterState: FilterState;
    updateFilters: (filter: FilterState) => void;
}

interface LocalState {
    name?: string;
    status?: string;
    gender?: string;
}

const DEBOUNCE_DELAY = 500;

export function TableFilters({ filterState, updateFilters }: Props) {
    const [localState, setLocalState] = useState<LocalState>(filterState);
    const debouncedUpdateFilters = useMemo(
        () => debounce(updateFilters, DEBOUNCE_DELAY),
        [updateFilters],
    );

    const onFilterChange = (
        name: string,
        value: string | undefined,
        debounce = false,
    ) => {
        setLocalState({ ...localState, [name]: value });

        const updatedFilterState = {
            ...filterState,
            [name]: value,
            page: 1, // always go back to first page
        };

        if (debounce) {
            debouncedUpdateFilters(updatedFilterState);
            return;
        }
        updateFilters(updatedFilterState);
    };

    return (
        <section className="flex flex-col gap-2 md:flex-row md:gap-4">
            <div className="flex gap-2 md:w-1/3">
                <Input
                    name="name"
                    value={localState.name ?? ''}
                    onChange={(e) =>
                        onFilterChange(e.target.name, e.target.value, true)
                    }
                    placeholder="Search characters"
                />
                {localState.name && (
                    <ClearButton
                        type="reset"
                        onClick={() => onFilterChange('name', undefined)}
                    />
                )}
            </div>

            <DropDownSelect
                placeholder="Status"
                value={localState.status ?? ''}
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
                value={localState.gender ?? ''}
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
