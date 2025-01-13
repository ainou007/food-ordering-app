import Link from "../global/link";
import Logo from "../global/logo";
import Navbar from "./navbar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <Logo />
        </Link>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
