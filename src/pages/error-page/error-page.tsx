import { useRouteError } from 'react-router';

interface GraphQLError {
  graphQLErrors?: Array<{ message: string }>;
  message?: string;
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="flex flex-col items-center pt-8 gap-4">
      <h1 className="text-2xl font-bold">Oops! An error has occurred</h1>
      <p className="text-muted-foreground text-sm">
        {extractErrorMessage(error)}
      </p>
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

function extractErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'graphQLErrors' in error) {
    const graphQLError = error as GraphQLError;
    if (graphQLError.graphQLErrors && graphQLError.graphQLErrors.length > 0) {
      return graphQLError.graphQLErrors[0].message;
    }
    if (graphQLError.message) {
      return graphQLError.message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}
