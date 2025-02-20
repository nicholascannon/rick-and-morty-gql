import { useParams } from 'react-router';

import { useGetCharacter } from './hooks/use-get-character';

export function CharacterDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const { loading, data } = useGetCharacter(id);
    const character = data?.character;

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (!character) {
        return <h1>Character not found</h1>;
    }

    return (
        <section>
            <h1>{character.name}</h1>
            <img
                className="w-[200px] h-[200px]"
                src={character.image!}
                alt={`Image of ${character.name}`}
            />
        </section>
    );
}
