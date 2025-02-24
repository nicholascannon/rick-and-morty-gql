import { Link } from 'react-router';

import { Separator } from './ui/separator';

export function MenuBar() {
    return (
        <>
            <nav className="py-6 mb-6">
                <ul className="mb-4">
                    <Link to="/">Home</Link>
                </ul>
                <Separator />
            </nav>
        </>
    );
}
