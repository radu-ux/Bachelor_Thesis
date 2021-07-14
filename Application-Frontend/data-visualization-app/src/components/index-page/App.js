import IndexPageMainIntro from "./IndexPageMainIntro";
import IndexPageMainFirstDataset from "./IndexPageMainFirstDataset";
import IndexPageMainSecondDataset from "./IndexPageMainSecondDataset";
import IndexPageMainThirdDataset from "./IndexPageMainThirdDataset";
import IndexPageMainRecommandation from "./IndexPageMainRecommandation";
import Wave from "./Wave";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";

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
        <IndexPageMainRecommandation />
      </main>

      <footer className="w-100" style={{backgroundColor:"white"}}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
