import { getServerSession } from "next-auth";
import Link from "../global/link";
import Logo from "../global/logo";
import Navbar from "./navbar";
import { authConfig } from "@/auth/auth.config";

const Header = async () => {
  const session = await getServerSession(authConfig);
  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <Logo />
        </Link>
        <Navbar session={session} />
      </div>
    </div>
  );
};

export default Header;
