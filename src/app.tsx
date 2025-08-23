import { CLIENT } from '@/lib/client';
import { Router } from '@/router';
import { ApolloProvider } from '@apollo/client';

export function App() {
  return (
    <ApolloProvider client={CLIENT}>
      <Router />
    </ApolloProvider>
  );
}
