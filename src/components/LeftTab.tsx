import { BiNews, BiCog } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { BsTwitter, BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";

const LeftTab = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div
      className={`flex overflow-hidden 
      bg-base200 ${
        menuOpen
          ? "absolute bottom-0 top-20 z-10 w-screen px-5 md:relative md:top-0 md:basis-1/3"
          : "basis-0 pl-0"
      }
      } pt-12 font-kanit text-xl transition-all duration-300`}
    >
      <div className="w-full">
        <ul className="flex flex-col gap-14 text-white">
          <li
            className={`flex items-center gap-5
            opacity-${menuOpen ? 100 : 0} transition-all duration-200`}
          >
            <BiNews size={22} /> News Feed
          </li>
          <li
            className={`flex items-center gap-5
            opacity-${menuOpen ? 100 : 0} transition-all duration-200`}
          >
            <BiCog size={22} /> Settings
          </li>
          <li
            className={`flex items-center gap-5
            opacity-${menuOpen ? 100 : 0} transition-all duration-200`}
          >
            <FaUserAlt size={22} /> Account
          </li>
        </ul>
        <div className="divider" />
        <p
          className={`opacity-${
            menuOpen ? 100 : 0
          } transition-all duration-200`}
        >
          Links
        </p>
        <ul className="flex flex-col text-white">
          <li
            className={`flex items-center gap-5
            ${
              menuOpen ? "opacity-100" : "opacity-0"
            } p-2 transition-all duration-200`}
          >
            <BsTwitter size={22} /> Twitter
          </li>
          <li
            className={`flex items-center gap-5
            ${
              menuOpen ? "opacity-100" : "opacity-0"
            } p-2 transition-all duration-200`}
          >
            <BsFacebook /> Facebook
          </li>
          <li
            className={`flex items-center gap-5
            ${
              menuOpen ? "opacity-100" : "opacity-0"
            } p-2 transition-all duration-200`}
          >
            <BsLinkedin /> LinkedIn
          </li>
          <li
            className={`flex items-center gap-5
            ${
              menuOpen ? "opacity-100" : "opacity-0"
            } p-2 transition-all duration-200`}
          >
            <BsInstagram /> Instagram
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftTab;
