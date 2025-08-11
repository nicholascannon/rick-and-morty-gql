import { useRouteError } from 'react-router';

interface GraphQLError {
  graphQLErrors?: Array<{ message: string }>;
  message?: string;
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Handle GraphQL errors specifically
  let errorMessage = 'An unexpected error occurred';
  if (error && typeof error === 'object' && 'graphQLErrors' in error) {
    // Handle GraphQL-specific errors
    const graphQLError = error as GraphQLError;
    if (graphQLError.graphQLErrors && graphQLError.graphQLErrors.length > 0) {
      errorMessage = graphQLError.graphQLErrors[0].message;
    } else if (graphQLError.message) {
      errorMessage = graphQLError.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <section className="flex flex-col items-center pt-8 gap-4">
      <h1 className="text-2xl font-bold">Oops! An error has occurred</h1>
      <p className="text-muted-foreground text-sm">{errorMessage}</p>
      <p>
        Please reload the page to{' '}
        <a className="underline" href={document.location.href}>
          try again
        </a>
        .
      </p>
    </section>
  );
}
