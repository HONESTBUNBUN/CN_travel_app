import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="mb-4 font-heading text-heading-1 text-primary-dark">
          Plan my trip to China
        </h1>
        <p className="mb-8 max-w-[321px] font-body text-body-2 text-primary-gray">
          A guided way to choose cities and scenic places that fit your time and interests.
        </p>
        <Link
          href="/onboarding/q1"
          className="w-full max-w-[345px] rounded-full bg-primary-dark px-md py-sm font-body text-body-2 text-white transition-colors hover:bg-primary-dark/90"
        >
          Start planning
        </Link>
      </div>
    </main>
  );
}
