import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Brand from "./pages/Brand";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ThemeWrapper from "./components/Theme/ThemeWrapper";

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <ThemeWrapper>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Brand />
      <Contact />
      <Footer />
      </ThemeWrapper>
    </div>
  );
}

export default App;
