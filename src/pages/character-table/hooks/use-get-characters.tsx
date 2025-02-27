import { useQuery } from '@apollo/client';

import getCharactersQuery from './get-characters.query.gql';

import {
    GetCharactersQuery,
    GetCharactersQueryVariables,
} from '@/__generated__/types';

export function useGetCharacters(page: number) {
    return useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
        getCharactersQuery,
        {
            variables: {
                page,
            },
        },
    );
}
