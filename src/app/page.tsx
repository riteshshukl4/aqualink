
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-teal-500">
          Welcome to{' '}
          <a className="text-blue-600" href="https://example.com">
            AquaLink
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          A smart water tanker request, delivery, and monitoring platform.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/login" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Login as a Resident, Tanker Driver, or Admin.
            </p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by AquaLink
        </a>
      </footer>
    </div>
  );
}
