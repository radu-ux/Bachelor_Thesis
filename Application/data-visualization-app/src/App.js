import IndexPageMainIntro from "./components/index-page/IndexPageMainIntro";
import IndexPageMainFirstDataset from "./components/index-page/IndexPageMainFirstDataset";
import IndexPageMainSecondDataset from "./components/index-page/IndexPageMainSecondDataset";
import IndexPageMainThirdDataset from "./components/index-page/IndexPageMainThirdDataset";
import IndexPageMainRecommandation from "./components/index-page/IndexPageMainRecommandation";
import Wave from "./components/index-page/Wave";
import Navigation from "./components/shared/Navigation";
import Footer from "./components/shared/Footer";
import "./css/site.css";

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />  
      </header>

      <main role="main" className="pb-5">
        <div className="w-100 pt-5 presentational-layout">
            <IndexPageMainIntro />
            <Wave />
        </div>
        <IndexPageMainFirstDataset />
        <IndexPageMainSecondDataset />
        <IndexPageMainThirdDataset />
        <IndexPageMainRecommandation />
      </main>

      <Footer />
    </div>
  );
}

export default App;
