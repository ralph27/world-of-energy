import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/Nav";
import { Kanit, Roboto } from "next/font/google";
import LeftTab from "~/components/LeftTab";
import { useState } from "react";
import NewsTab from "~/components/NewsTab";
import Hero from "~/components/Hero";
import Card from "~/components/Card";
import { api } from "~/utils/api";

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

const Home: NextPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = api.articles.getPreview.useQuery();
  console.log(data);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${kanit.variable} ${roboto.variable} bg-base100`}>
        <Nav setMenuOpen={setMenuOpen} />
        <div className="flex h-[calc(100vh-_82.67px)] overflow-hidden">
          <LeftTab menuOpen={menuOpen} />
          <div className="grid items-start overflow-y-scroll px-2 pt-10 sm:py-10">
            <Hero />
            <div className="py-6 font-kanit">
              <h1 className="bg-gradient-to-t from-[#5F0A87] to-[#A4508B] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                LATEST SUMMARIES
              </h1>

              <div className="grid-list grid-template-columns-sm  md:grid-template-columns-md lg:grid-template-columns-lg   justify-items-center gap-16 p-6">
                <Card
                  category="science"
                  description="How to configure a new Node.js project with TypeScript and ES Modules How to configure a new Node.js project with TypeScript and ES Modules "
                  title="Setup Node with TypeScript"
                  image="https://fireship.io/lessons/typescript-nodejs-setup/img/featured.webp"
                  id="1"
                />
                <Card
                  category="science"
                  description="How to configure a new Node.js project with TypeScript and ES Modules"
                  title="Setup Node with TypeScript"
                  image="https://fireship.io/lessons/typescript-nodejs-setup/img/featured.webp"
                  id="1"
                />
                <Card
                  category="science"
                  description="How to configure a new Node.js project with TypeScript and ES Modules"
                  title="Setup Node with TypeScript"
                  image="https://fireship.io/lessons/typescript-nodejs-setup/img/featured.webp"
                  id="1"
                />
                <Card
                  category="science"
                  description="How to configure a new Node.js project with TypeScript and ES Modules"
                  title="Setup Node with TypeScript"
                  image="https://fireship.io/lessons/typescript-nodejs-setup/img/featured.webp"
                  id="1"
                />
              </div>
            </div>
          </div>

          {/* <NewsTab /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
