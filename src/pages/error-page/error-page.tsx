import { GraphQLError } from 'graphql';
import { useRouteError } from 'react-router';

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
  if (error instanceof GraphQLError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}
