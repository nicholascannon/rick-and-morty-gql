import debounce from 'lodash.debounce';
import { X } from 'lucide-react';
import { useState } from 'react';

import { FilterCharacter } from '@/__generated__/types';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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

            <div className="flex gap-2">
                <Select
                    value={localFilterState.status ?? ''}
                    onValueChange={(value) => onFilterChange('status', value)}
                >
                    <SelectTrigger className="md:w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Alive">Alive</SelectItem>
                        <SelectItem value="Dead">Dead</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                </Select>
                {localFilterState.status && (
                    <button
                        className="text-muted-foreground"
                        onClick={() => onFilterChange('status', undefined)}
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </section>
    );
}
