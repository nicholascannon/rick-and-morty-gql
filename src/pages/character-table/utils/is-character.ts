import type { TableCharacterFragment } from '@/__generated__/graphql';

export function isCharacter(
  character: TableCharacterFragment | null,
): character is TableCharacterFragment {
  return character !== null;
}
