import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Nav from "~/components/Nav";
import { useEffect, useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const selector = document.querySelector("html");
    if (selector) {
      if (menuOpen) {
        selector.style.overflowY = "hidden";
      } else {
        selector.style.overflowY = "scroll";
      }
    }
  }, [menuOpen]);

  return (
    <SessionProvider session={session}>
      <Nav setMenuOpen={setMenuOpen} />
      <Component {...pageProps} menuOpen={menuOpen} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
