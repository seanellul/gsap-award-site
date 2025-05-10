import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#000000FF] py-4 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-3 items-center">
        <p className="text-sm font-light text-center md:text-left">
          ©KeyTrader 2025. All rights reserved
        </p>
        <p className="text-sm font-light text-center">
          Built by Divergent Studios.
        </p>
        <a
          href="#privacy-policy"
          className="text-sm font-light hover:underline text-center md:text-right opacity-50"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
