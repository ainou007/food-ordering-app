import Navbar from "./navbar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 shadow-md backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        logo
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
