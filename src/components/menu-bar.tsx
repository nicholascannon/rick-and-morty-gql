import { Separator } from '@/components/ui/separator';

export function MenuBar() {
  return (
    <>
      <nav className="py-6">
        <ul className="flex gap-4 mb-4">
          <li>
            <h1 className="font-bold">Rick and Morty Characters</h1>
          </li>
        </ul>
        <Separator />
      </nav>
    </>
  );
}
