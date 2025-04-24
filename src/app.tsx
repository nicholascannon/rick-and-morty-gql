import { CLIENT } from '@/lib/client';
import { AppProvider } from '@/providers/app-provider';
import { Router } from '@/router';

export function App() {
    return (
        <AppProvider client={CLIENT}>
            <Router />
        </AppProvider>
    );
}
