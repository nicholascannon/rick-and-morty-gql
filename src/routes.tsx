import { Route, Routes as Switch } from 'react-router';

import { RootLayout } from '@/components/root-layout';
import { CharacterDetailsPage } from '@/pages/character';
import { TablePage } from '@/pages/table';

export function Routes() {
    return (
        <Switch>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<TablePage />} />
                <Route
                    path="/character/:id"
                    element={<CharacterDetailsPage />}
                />
            </Route>
        </Switch>
    );
}
