import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center max-sm:px-2">
        <span className=" text-3xl text-white font-bold tracking-tight">
          MernHotels.com
        </span>
        <span className=" text-white font-bold tracking-tight flex gap-4">
          <Link to={"#"} className="hover:text-blue-200">
            Privacy Policy
          </Link>
          <Link to={"#"} className="hover:text-blue-200">
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
