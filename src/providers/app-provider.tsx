import {
    type ApolloClient,
    ApolloProvider,
    type NormalizedCacheObject,
} from '@apollo/client';
import type { ReactNode } from 'react';

export const AppProvider = ({
    children,
    client,
}: {
    children: ReactNode;
    client: ApolloClient<NormalizedCacheObject>;
}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
