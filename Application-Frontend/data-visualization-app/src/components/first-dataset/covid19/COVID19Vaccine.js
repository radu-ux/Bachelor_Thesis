import { COIVD19Vaccinations } from "../../../charts/COVID-19/covid_19_bubble_chart";
import { useEffect, useRef } from "react";
import Navigation from "../../shared/Navigation";
import Footer from "../../shared/Footer";
import COVID19_World_Restrictions from "../../../assets/COVID19-World-Restrictions-MapChart-Suggestion.svg";
import COVID19_Cases_MapChart from "../../../assets/COVID-19-Cases-MapChart-Suggestion.svg";
import { ChartTitle,ChartInfo,ChartDescription,Card,
         CardImgPlaceholder,CardText,ExploreMore,
         ExploreMoreTitle,HorizontalLine,Redirection,
         ReplayButton,Emphasise} from "../../../styled-components/ChartPageStyledComponents.js";

function COVID19Vaccine() {
    const bubbleChart = useRef();
    const pieChart = useRef();

    useEffect(() =>{
        const multiLineChart = new COIVD19Vaccinations(["http://localhost:3001/covid-19-vaccine"]);
        multiLineChart.createChart();
    }, [])

    const replayChart = () => {
        const bubbleChartPlaceHolder = bubbleChart.current;
        const pieChartPlaceholder = pieChart.current;
        bubbleChartPlaceHolder.innerHTML = "";
        pieChartPlaceholder.innerHTML = "";
        const vaccinatonChart = new COIVD19Vaccinations(["http://localhost:3001/covid-19-vaccine"]);
        vaccinatonChart.createChart();
    }

    return(
        <div className="App">
            <header>
                <Navigation />
            </header>
            
            <main role="main" className="mb-5">
                <ChartInfo>
                    <ChartTitle>COVID-19 Vaccinations</ChartTitle>
                    <ChartDescription >
                        The chart comes in the form of a <Emphasise>Bubble Chart</Emphasise>.
                        It analyzes the global situation regarding the <Emphasise>COVID-19 </Emphasise> 
                        vaccinations last recorded in <Emphasise>2021-03-22 </Emphasise>.
                        There is also presented information about what vaccinies had been used more 
                        frequently. This fact is described by using a <Emphasise>Pie Chart </Emphasise>.
                        All the data is available <Redirection href="#">here &#x2192;</Redirection>
                        <HorizontalLine />
                    </ChartDescription>
                    <ReplayButton onClick={replayChart}>Replay</ReplayButton>
                    <div className="pt-3 container">
                        <div className="row">
                            <div className="col">
                                <div id='bubbleChartPlaceholder' ref={bubbleChart}></div>
                            </div>
                            <div className="col">
                                <div id='pieChartPlaceholder' ref={pieChart}></div>
                            </div>
                        </div>
                    </div>
                </ChartInfo>
            </main>         


           <footer className="w-100" style={{backgroundColor:"rgb(248,248,248)"}}>
               <div>
                    <ExploreMore>
                        <ExploreMoreTitle>EXPLORE MORE ON THIS TOPIC</ExploreMoreTitle>
                        <div className="d-flex justify-content-center mt-5">
                                <Card className="mr-4 ml-4" href="/covid-19-cases-america">
                                    <div>
                                        <CardImgPlaceholder>
                                            <img src={COVID19_Cases_MapChart}></img>
                                        </CardImgPlaceholder>
                                        <CardText className="pt-2">
                                            COVID19 in America
                                        </CardText>
                                    </div>
                                </Card>
                                <Card className="mr-4 ml-4" href="/covid-19-world-restrictions">
                                    <div>
                                        <CardImgPlaceholder>
                                            <img src={COVID19_World_Restrictions}></img>
                                        </CardImgPlaceholder>
                                        <CardText className="pt-2">
                                            COVID19 World Restrictions
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

export default COVID19Vaccine;