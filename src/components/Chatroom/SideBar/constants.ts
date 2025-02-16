import KittyCare from "/assets/svg/KittyCare.svg";
import Logout from "/assets/svg/Logout.svg";
import Profile from "/assets/svg/Profile.svg";
import { NavItem } from "./types";


export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: "KittyCare", src: KittyCare, content: "Kitty Care" },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { id: "Logout", src: Logout, content: "Logout" },
  { id: "Profile", src: Profile, content: "Profile" },
]; 