import { Route, Routes as Switch } from 'react-router';

import { RootLayout } from '@/components/ui/root-layout';
import { DetailsPage } from '@/pages/details';
import { TablePage } from '@/pages/table';

export function Routes() {
    return (
        <Switch>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<TablePage />} />
                <Route path="/details/:id" element={<DetailsPage />} />
            </Route>
        </Switch>
    );
}
