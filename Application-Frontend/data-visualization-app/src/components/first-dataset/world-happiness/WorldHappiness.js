import { MultiLineChart } from "../../../charts/World-Happiness-RaceBarChart/multi_linechart";
import { useEffect, useRef } from "react";
import Navigation from "../../shared/Navigation";
import Footer from "../../shared/Footer";
import BarChart from "../../../assets/World-Happines-RaceBarChart-Suggestion.svg";
import TBDSuggestionImage from '../../../assets/TBD-Suggestion.svg';
import { ChartTitle,ChartInfo,ChartDescription,Card,
         CardImgPlaceholder,CardText,ExploreMore,
         ExploreMoreTitle,HorizontalLine,Redirection,
         ReplayButton,Emphasise} from "../../../styled-components/ChartPageStyledComponents.js";

function WorldHappiness() {
    const chartRef = useRef();

    useEffect(() =>{
        const multiLineChart = new MultiLineChart(["http://localhost:3001/world-happiness/2015", "http://localhost:3001/world-happiness/2016", "http://localhost:3001/world-happiness/2017", "http://localhost:3001/world-happiness/2018", "http://localhost:3001/world-happiness/2019"]);
        multiLineChart.createChart();
    }, [])

    const replayChart = () => {
        const chartPlaceHolder = chartRef.current
        chartPlaceHolder.innerHTML = "";
        const multiLineChart = new MultiLineChart(["http://localhost:3001/world-happiness/2015", "http://localhost:3001/world-happiness/2016", "http://localhost:3001/world-happiness/2017", "http://localhost:3001/world-happiness/2018", "http://localhost:3001/world-happiness/2019"]);
        multiLineChart.createChart();
    }

    return(
        <div className="App">
            <header>
                <Navigation />
            </header>
            
            <main role="main" className="mb-5">
                <ChartInfo>
                    <ChartTitle>World Happiness Report</ChartTitle>
                    <ChartDescription >
                        The chart comes in the form of a <Emphasise>Race-Bar-Chart</Emphasise>.
                        It reveals the first 10 most happiest countries around the world and presents the 
                        evolution of this fact between some specific years. It ranks the countries based on a happiness score
                        thus organizing them in a hierarchical manner. The data had been collected
                        between the years 2015-2019 and can be found <Redirection href="#">here &#x2192;</Redirection>
                        <HorizontalLine />
                    </ChartDescription>
                    <ReplayButton onClick={replayChart}>Replay</ReplayButton>
                    <div className="pt-3" id='chartPlaceholder' ref={chartRef}></div>
                </ChartInfo>
            </main>         


           <footer className="w-100" style={{backgroundColor:"rgb(248,248,248)"}}>
               <div>
                    <ExploreMore>
                        <ExploreMoreTitle>EXPLORE MORE ON THIS TOPIC</ExploreMoreTitle>
                        <div className="d-flex justify-content-center mt-5">
                                <Card className="mr-4 ml-4" href="#">
                                    <div>
                                        <CardImgPlaceholder>
                                        <img src={TBDSuggestionImage} className="card-img-top"/>
                                        </CardImgPlaceholder>
                                        <CardText className="pt-2">
                                            Happiness rank on regions
                                        </CardText>
                                    </div>
                                </Card>
                                <Card className="mr-4 ml-4" href="#">
                                    <div>
                                        <CardImgPlaceholder>
                                        <img src={TBDSuggestionImage} className="card-img-top"/>
                                        </CardImgPlaceholder>
                                        <CardText className="pt-2">
                                            Level of freedom
                                        </CardText>
                                    </div>
                                </Card>
                        </div>
                    </ExploreMore>
                    <Footer />
               </div>
           </footer>
      </div>
    )
}

export default WorldHappiness;