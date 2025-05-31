import { Link } from 'react-router';

export function CharacterNotFound() {
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <img
        className="w-[200px] h-[200px] rounded-full"
        src="/headshot.jpg"
        alt="Unknown character avatar"
      />
      <div className="text-center">
        <h1 className="text-3xl ">Oops! Who is that?</h1>
        <p className="text-gray-500">
          Sorry that character doesn&apos;t exist.{' '}
          <Link className="underline" to="/">
            Go back
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
