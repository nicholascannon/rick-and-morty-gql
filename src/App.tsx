import { Button } from './components/ui/button';
import { CLIENT } from './lib/client';
import { AppProvider } from './providers/AppProvider';

export function App() {
    return (
        <AppProvider client={CLIENT}>
            <main>
                <h1>Hello, world</h1>
                <Button>Click me</Button>
            </main>
        </AppProvider>
    );
}
