import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-[85vh]">
        {/* background theme */}
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
