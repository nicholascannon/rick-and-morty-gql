import { useQuery } from '@apollo/client';

import getCharactersQuery from './get-characters.query.gql';

import type {
    FilterCharacter,
    GetCharactersQuery,
    GetCharactersQueryVariables,
} from '@/__generated__/types';

export function useGetCharacters(page: number, filter?: FilterCharacter) {
    return useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
        getCharactersQuery,
        {
            variables: {
                page,
                filter,
            },
        },
    );
}
