/**
 * @file page.tsx
 * @description Home page component.
 * Displays a simple "Hello World" centered on the screen.
 */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-10 py-20">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <div className="max-w-2xl text-center space-y-4">
        <p>Scroll down to test the header effect.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  );
}
