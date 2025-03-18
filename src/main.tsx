import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

import './index.css';

// biome-ignore lint/style/noNonNullAssertion: we know the element exists
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
