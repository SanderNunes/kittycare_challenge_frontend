import type { HeaderProps } from "./Chatroom/ChatField/types";
import { useEffect } from "react";
import KittyLogo from "./KittyLogo";

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  useEffect(() => {
    // get current url
    const url = window.location.pathname;
    const isChatroom = url.includes("cat-assistant");

    // Only render header in chatroom
    if (!isChatroom) return;
  }, []);

  return (
    <div className="w-full h-fit flex justify-center items-center ">
      <div>
        {/* <a href="/"> */}
        <header
          className={`w-[400px] h-[240px] sm:h-[200px] sm:w-[900px] sm:mt-0 -mb-20 m-auto relative ${className}`}
          data-testid="kitty-logo"
        >
          <KittyLogo />
        </header>
        {/* </a> */}
      </div>
    </div >
  );
};

export default Header;
