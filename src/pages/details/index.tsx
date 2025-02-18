import { useParams } from 'react-router';

export function DetailsPage() {
    const { id } = useParams<{ id: string }>();

    return <h1>{id} Details Page</h1>;
}
