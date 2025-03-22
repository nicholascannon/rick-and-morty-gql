import { X } from 'lucide-react';

export function ClearButton(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    return (
        <button className="text-muted-foreground" {...props}>
            <X className="h-4 w-4" />
        </button>
    );
}
