export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">
      <div className="p-8">
        <h2 className={`mb-8 text-3xl font-semibold text-center mt-16`}>Welcome Future Beavers!</h2>
        <h2 className={`mb-3 text-2xl max-w-[70ch] text-center`}>This website will help you to confidently choose an undergraduate major that best matches your skills and goals.</h2>
      </div>
      <div className="p-8">
        <h3 className={`mb-3 text-3xl font-semibold`}>Start by choosing an exploration method below:</h3>
      </div>

      <div className="mb-32 grid lg:max-w-full lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-center">
        <a
          href="/majors"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-orange hover:bg-orange/20"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold hover:text-orange`}>
            View Majors{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            </span>
          </h2>
          <span className={`m-0 max-w-[30ch] text-lg`}>
            Learn more about all majors.
          </span>
        </a>

        <a
          href="/quiz"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-orange hover:bg-orange/20"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-3xl font-semibold hover:text-orange`}>
            Major Exploration Quiz{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            </span>
          </h2>
          <span className={`m-0 max-w-[30ch] text-lg`}>
            Get 3 major recommendations based on your answers.
          </span>
        </a>
        <a
          href="/compare"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-orange hover:bg-orange/20"
        >
          <h2 className={`mb-3 text-3xl font-semibold hover:text-orange`}>
            Major Comparison Table{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            </span>
          </h2>
          <span className={`m-0 max-w-[30ch] text-lg`}>
            Use this table to compare 3 majors.
          </span>
        </a>
      </div>
    </main>
  )
}
