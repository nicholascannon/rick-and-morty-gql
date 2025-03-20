import { useQuery } from '@apollo/client';

import getCharactersQuery from './get-characters.query.gql';

import type {
    FilterCharacter,
    GetCharactersQuery,
    GetCharactersQueryVariables,
} from '@/__generated__/types';

export function useGetCharacters(page: number, filter?: FilterCharacter) {
    const res = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
        getCharactersQuery,
        {
            variables: {
                page,
                filter,
            },
        },
    );

    return {
        ...res,
        data: {
            characters: res.data?.characters?.results,
            pagination: res.data?.characters?.info,
        },
    };
}
