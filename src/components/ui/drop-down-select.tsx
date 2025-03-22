import type { ReactNode } from 'react';

import { Select, SelectContent, SelectTrigger, SelectValue } from './select';
import { ClearButton } from './clear-button';

export function DropDownSelect({
    value,
    options,
    placeholder,
    triggerClassName,
    onValueChange,
    onReset,
}: {
    value: string | undefined;
    options: ReactNode;
    placeholder?: ReactNode;
    triggerClassName?: string;
    onValueChange?: (value: string) => void;
    onReset?: () => void;
}) {
    return (
        <div className="flex gap-2">
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className={triggerClassName}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>{options}</SelectContent>
            </Select>

            {value && <ClearButton type="reset" onClick={onReset} />}
        </div>
    );
}
