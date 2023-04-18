import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex justify-self-center md:w-3/4 lg:w-full lg:justify-between lg:pr-12 xl:w-10/12">
      <div className="flex w-full flex-col items-center justify-center lg:w-3/5 lg:items-start">
        <h1 className="text-center font-kanit text-6xl font-extrabold text-white sm:text-7xl xl:text-8xl ">
          <span className="bg-gradient-to-t from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          News Summary
        </h1>
        <div className="py-2" />
        <p className="text-center font-kanit text-lg text-gray-400 xl:text-xl">
          Stay informed without reading for hours. Subscribe to our daily
          newsletter, <span className="text-orange-500">Smart Brief</span>. Our
          <span className="text-yellow-500"> AI-powered</span> tool condenses
          the top news stories into an easy-to-read format, allowing you to
          quickly scan and get the highlights of the day&apos;s events.
        </p>
        <div className="py-5" />
        <button className="w-30 btn-primary btn h-14 lg:self-center">
          Subscribe
        </button>
      </div>
      <Image
        src={"/hero.png"}
        width={270}
        height={500}
        alt="Hero"
        className="hidden -rotate-12 lg:block"
      />
    </div>
  );
}
