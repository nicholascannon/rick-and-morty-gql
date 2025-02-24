import { Route, Routes as Switch } from 'react-router';

import { RootLayout } from '@/components/root-layout';
import { CharacterDetailsPage } from '@/pages/character-details';
import { CharacterTablePage } from '@/pages/character-table';

export function Routes() {
    return (
        <Switch>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<CharacterTablePage />} />
                <Route
                    path="/character/:id"
                    element={<CharacterDetailsPage />}
                />
            </Route>
        </Switch>
    );
}
