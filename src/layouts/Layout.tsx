import Footer from "../componenets/Footer";
import Header from "../componenets/Header";
import Hero from "../componenets/Hero";
import Searchbar from "../componenets/Searchbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Searchbar />
      </div>
      <div className=" container mx-auto py-10 flex-1 px-2"> {children} </div>
      <Footer />
    </div>
  );
};

export default Layout;
