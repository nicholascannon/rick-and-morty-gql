import { useParams } from 'react-router';

import { useGetCharacterQuery } from '@/__generated__/graphql';
import { CharacterAvatar } from './components/character-avatar';
import { CharacterDetails } from './components/character-details';
import { CharacterNotFound } from './components/character-not-found';
import { EpisodeTable } from './components/episode-table';

export function CharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { loading, data, error } = useGetCharacterQuery(
    id
      ? {
          variables: {
            id,
          },
        }
      : {
          skip: true,
        },
  );

  const character = data?.character;

  if (!loading && !character) return <CharacterNotFound />;
  if (error) throw error;

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-row gap-12 items-center">
        <CharacterAvatar character={character} />

        <CharacterDetails character={character} />
      </section>

      <section>
        <h2 className="text-2xl ">Appears in</h2>
        <EpisodeTable character={character} />
      </section>
    </div>
  );
}
