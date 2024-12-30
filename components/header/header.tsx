import Link from "../global/link";
import Navbar from "./navbar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">logo</Link>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
