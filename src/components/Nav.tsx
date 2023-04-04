import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import Tag from "./Tag";

const Nav = ({
  setMenuOpen,
}: {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: sessionData } = useSession();

  return (
    <nav className="navbar justify-between border-b border-white/50 bg-base-200 px-8 py-3">
      <div className="flex items-center gap-3">
        <BiMenu
          size={40}
          className="cursor-pointer text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
        <Image
          width={50}
          height={10}
          src="/logo.jpg"
          alt="World of Energy Logo"
          className=" hidden select-none rounded-full sm:block"
        />
        <h1 className="hidden select-none font-kanit text-xl text-white sm:block">
          World of Energy
        </h1>
      </div>
      <div
        className={`flex gap-3 rounded-lg ${
          sessionData ? "border" : ""
        } border-neutral-content/30 px-1 py-1 font-kanit`}
      >
        {sessionData && (
          <div className="flex gap-3">
            <Image
              width={35}
              height={35}
              src={sessionData.user.image || ""}
              alt="Profile Picture"
              className="h-fit rounded-full pt-1"
            />
            <div>
              <h1 className="text-xl text-white">{sessionData?.user.name}</h1>
              <Tag name="free" />
            </div>
          </div>
        )}

        <button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
          className="btn-primary btn-md btn"
        >
          {sessionData ? "Log Out" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
