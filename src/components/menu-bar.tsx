import { Link } from 'react-router';

import { Separator } from './ui/separator';

export function MenuBar() {
    return (
        <>
            <nav className="py-6 mb-6">
                <ul className="flex gap-4 mb-4">
                    <li>
                        <h1 className="font-bold">Rick and Morty Characters</h1>
                    </li>
                    <li>
                        <Link
                            to="/"
                            className="text-muted-foreground hover:text-primary"
                        >
                            Home
                        </Link>
                    </li>
                </ul>
                <Separator />
            </nav>
        </>
    );
}
