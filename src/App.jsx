import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Scroller from "./components/scroller";
import GirlBackground from "./components/new/girl_back";
import Master_Key from "./components/new/master_key";
import YouCanScroll from "./components/new/you_can_scroll";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      {/* <Hero /> */}
      <GirlBackground />
      <Master_Key />
      {/* <YouCanScroll /> */}
      {/* <About /> */}
      <div></div>
      <Features />
      {/* <Story /> */}
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
