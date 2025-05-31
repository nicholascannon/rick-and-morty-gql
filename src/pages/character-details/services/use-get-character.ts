import { useQuery } from '@apollo/client';

import getCharacterQuery from './get-character.query.gql';

import type {
  GetCharacterQuery,
  GetCharacterQueryVariables,
} from '@/__generated__/types';

export function useGetCharacter(id: string | undefined) {
  const res = useQuery<GetCharacterQuery, GetCharacterQueryVariables>(
    getCharacterQuery,
    id
      ? {
          variables: { id },
        }
      : {
          skip: true,
        },
  );

  return {
    ...res,
    data: res.data?.character,
  };
}
