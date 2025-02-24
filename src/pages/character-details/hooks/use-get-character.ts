import { useQuery } from '@apollo/client';

import getCharacterQuery from './get-character.query.gql';

import type {
    GetCharacterQuery,
    GetCharacterQueryVariables,
} from '@/__generated__/types';

export const useGetCharacter = (id: string | undefined) => {
    return useQuery<GetCharacterQuery, GetCharacterQueryVariables>(
        getCharacterQuery,
        id
            ? {
                  variables: { id },
              }
            : {
                  skip: true,
              },
    );
};
