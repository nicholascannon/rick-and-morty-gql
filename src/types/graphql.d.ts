/* eslint-disable import/no-default-export */
declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    const content: DocumentNode;
    export default content;
}
