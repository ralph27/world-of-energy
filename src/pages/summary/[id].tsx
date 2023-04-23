import Image from "next/image";
import Category from "~/components/Category";
import LeftTab from "~/components/LeftTab";
import { Kanit, Roboto } from "next/font/google";
import Subscribe from "~/components/Subscribe";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--roboto-font",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
  variable: "--kanit-font",
});

export default function Page({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div className={`flex ${kanit.variable} ${roboto.variable}`}>
      <LeftTab menuOpen={menuOpen} />
      <div className="mx-auto my-0 w-full pt-5 lg:w-11/12 ">
        <div className="px-2 font-kanit">
          <Category category="science" color="#2775c3" />
          <h1 className="pt-4 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Portrait of a rocket on fire
          </h1>
        </div>
        <div className="relative my-6 h-64 w-full sm:h-80 md:h-96 lg:mx-auto lg:my-10 lg:h-100">
          <Image
            src="https://fireship.io/lessons/typescript-nodejs-setup/img/featured.webp"
            fill
            alt="picture"
          />
        </div>

        <div className="mx-auto my-0 max-w-3xl items-center pl-3 pr-3 leading-7 text-[#d1d5db] sm:px-6">
          <Subscribe />
          <p className="mt-5 font-kanit text-base sm:text-xl lg:text-2xl">
            South Texas erupted in cheers yesterday as SpaceX&apos;s Starship,
            the world&apos;s most powerful rocket system, blasted off on its
            first orbital test launch…and careened back down to Earth in a ball
            of flames. Elon Musk&apos;s 394-foot-tall baby climbed for just
            under four minutes before things started to go sideways in what
            scientists consider a “successful failure.” Despite exploding—or,
            um, undergoing a “rapid unscheduled disassembly”—over the Gulf of
            Mexico, Starship actually surpassed the one expectation Musk set for
            the test: “Just don&apos;t blow up the launchpad.” Mission
            accomplished. The brief flight allowed engineers to gather
            much-needed data that they&apos;ll use to figure out what went
            wrong. The next Starship test flight could happen in just a few
            months, which is good considering the ambitious plans SpaceX has for
            the rocket: Big picture: Starship is meant to fly, just not yet. The
            rocket performed well for its first test flight, making it through
            Max Q, one of the most challenging moments of liftoff when
            spacecraft are most at risk of getting ripped apart by pressure.
            Once operational, the stainless steel Starship will be integral to
            future moon missions and satellite launches.—ML
          </p>
        </div>
      </div>
    </div>
  );
}
