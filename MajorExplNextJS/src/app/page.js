import Image from "next/image";
import corvallisCampus from '../components/corvallisCampus.jpg';

export default function Home() {
  return (
    <div>
      <div className="font-mono mx-auto max-w-8xl px-4 pt-28 sm:px-6 lg:px-8">
        <header className="bg-gradient-to-r from-orange/30 to-orange/20 shadow">
          <h1 className="text-2xl font-bold font-mono tracking-tight text-gray-900 text-center py-4">Welcome Future Beavers!</h1>
          <h2 className={`mb-3 text-xl max-w-[100ch] text-center py-4`}>This website will help you to confidently choose an undergraduate major that best matches your skills and goals.</h2>
        </header>
        <div className='flex justify-center'>
          <Image src={corvallisCampus} alt="OSU corvallis campus" width={500} height={400} />
          {/* source: https://oregonstate.edu (for academic use at OSU only) */}
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center font-mono p-16 bg-orange-50">
        <div className="p-8 bg-gradient-to-r from-orange/30 to-orange/20 shadow">
          <h3 className={`mb-3 text-2xl font-semibold text-center`}>Start by choosing an exploration method below:</h3>
          <div className="mb-32 grid lg:max-w-full lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-center">
            <a
              href="/majors"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-orange hover:bg-orange/20"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold hover:text-white`}>
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
              <h2 className={`mb-3 text-2xl font-semibold hover:text-white`}>
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
              <h2 className={`mb-3 text-2xl font-semibold hover:text-white`}>
                Major Comparison Table{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                </span>
              </h2>
              <span className={`m-0 max-w-[30ch] text-lg`}>
                Use this table to compare 3 majors.
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>

  )
}
