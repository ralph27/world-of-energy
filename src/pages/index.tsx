import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/Nav";
import { Kanit } from "next/font/google";
import LeftTab from "~/components/LeftTab";
import { useState } from "react";
import NewsTab from "~/components/NewsTab";

const kanit = Kanit({
  subsets: ["latin"],
  weight: "400",
  variable: "--kanit-font",
});

const Home: NextPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${kanit.variable}`}>
        <Nav setMenuOpen={setMenuOpen} />
        <div className="flex h-[calc(100vh-_82.67px)] overflow-hidden ">
          <LeftTab menuOpen={menuOpen} />
          <NewsTab />
          <NewsTab />
        </div>
      </main>
    </>
  );
};

export default Home;
