import debounce from 'lodash.debounce';
import { X } from 'lucide-react';
import { ReactNode, useState } from 'react';

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

            <DropDownSelect
                placeholder="Status"
                value={localFilterState.status ?? ''}
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
        </section>
    );
}

function DropDownSelect({
    value,
    options,
    placeholder,
    onValueChange,
    onReset,
}: {
    value: string | undefined;
    options: ReactNode;
    placeholder?: ReactNode;
    onValueChange?: (value: string) => void;
    onReset?: () => void;
}) {
    return (
        <div className="flex gap-2">
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="md:w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>{options}</SelectContent>
            </Select>

            {value && (
                <button className="text-muted-foreground" onClick={onReset}>
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
