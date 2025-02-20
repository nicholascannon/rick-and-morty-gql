import {
    ApolloClient,
    ApolloProvider,
    NormalizedCacheObject,
} from '@apollo/client';
import { ReactNode } from 'react';

export const AppProvider = ({
    children,
    client,
}: {
    children: ReactNode;
    client: ApolloClient<NormalizedCacheObject>;
}) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
