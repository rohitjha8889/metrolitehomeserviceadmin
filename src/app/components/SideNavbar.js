import sideNav from "./style/sideNav.module.css";
import Image from "next/image";
import Link from "next/link";


// Icons Linking
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHelpCircleSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdCleanHands } from "react-icons/md";
// Icon Linking end


import Logo from "../../../public/logo.png";
function SideNavbar() {
  return (
    <>
    
      <div className={sideNav.main}>
        <div className={sideNav.logo}>
          <Image src={Logo} />
        </div>

        <div className={sideNav.menuBar}>
          <ul>
            <li>
              <FaBookmark size={20}/>
              <Link href={"/booking"}>
                Booking 
              </Link>
            </li>
            <li>
              <FaRegImages size={20}/>
              <Link href={"/banner"}>
                Banner 
              </Link>
            </li>
            <li>
              <MdCleanHands size={20}/>
              <Link href={"/services"}>
                Services 
              </Link>
            </li>
            <li>
            <IoSettingsSharp size={23}/>
              <Link href={"/setting"}>
                Setting 
              </Link>
            </li>
            <li>
            <IoHelpCircleSharp size={25}/>
              <Link href={"/help"}>
                Help & Support
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideNavbar;
