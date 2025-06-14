export function ErrorPage({ error }: { error?: Error }) {
  console.error(error);

  return (
    <section className="flex flex-col items-center mt-8 gap-4">
      <h1 className="text-2xl font-bold">Oops! An error has occurred</h1>
      {error && (
        <p className="text-muted-foreground text-sm">{error.message}</p>
      )}
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
