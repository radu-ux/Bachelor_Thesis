import { COVID19CasesAmerica } from "../../../charts/COVID-19/covid_19_bubble_line_chart";
import { useEffect, useRef } from "react";
import Navigation from "../../shared/Navigation";
import Footer from "../../shared/Footer";
import COVID19_Vaccines from "../../../assets/COVID-19-Vaccinations-Suggestion.svg";
import COVID19_World_Restrictions from "../../../assets/COVID19-World-Restrictions-MapChart-Suggestion.svg";
import { ChartTitle,ChartInfo,ChartDescription,Card,
         CardImgPlaceholder,CardText,ExploreMore,
         ExploreMoreTitle,HorizontalLine,Redirection,
         ReplayButton,Emphasise} from "../../../styled-components/ChartPageStyledComponents.js";

function COVID19Vaccine() {
    const mapChart = useRef();
    const progressBar = useRef();

    useEffect(() =>{
        const americaCOVIDCasesMapChart = new COVID19CasesAmerica(["http://localhost:3001/covid-19-cases-america"]);
        americaCOVIDCasesMapChart.createChart();
    }, [])

    const replayChart = () => {
        const mapChartPlaceholder = mapChart.current;
        const progressBarPlaceholder = progressBar.current;
        mapChartPlaceholder.innerHTML = "";
        progressBarPlaceholder.innerHTML = "";
        const americaCOVIDCasesMapChart = new COVID19CasesAmerica(["http://localhost:3001/covid-19-cases-america"]);
        americaCOVIDCasesMapChart.createChart();
    }

    return(
        <div className="App">
            <header>
                <Navigation />
            </header>
            
            <main role="main" className="mb-5">
                <ChartInfo>
                    <ChartTitle>COVID-19 Cases America</ChartTitle>
                    <ChartDescription >
                        The chart comes in the form of a <Emphasise>Map Chart</Emphasise>.
                        It analyzes the evolution of <Emphasise>COVID-19 </Emphasise> 
                        in the counties of America. The statistic is made
                        on the data recorded between <Emphasise>January 23,2020 </Emphasise> and
                        <Emphasise> October 13, 2021</Emphasise>.
                        A complete overview of the data is available <Redirection href="#">here &#x2192;</Redirection>
                        <HorizontalLine />
                    </ChartDescription>
                    <div className="pt-3 container">
                        <div id="progressBar" ref={progressBar}></div>
                        <div id="americaCOVIDCasesMapChart" ref={mapChart}></div>
                    </div>
                </ChartInfo>
            </main>         


           <footer className="w-100" style={{backgroundColor:"rgb(248,248,248)"}}>
               <div>
                    <ExploreMore>
                        <ExploreMoreTitle>EXPLORE MORE ON THIS TOPIC</ExploreMoreTitle>
                        <div className="d-flex justify-content-center mt-5">
                                <Card className="mr-4 ml-4" href="/covid-19-vaccine">
                                    <div>
                                        <CardImgPlaceholder>
                                            <img src={COVID19_Vaccines}></img>
                                        </CardImgPlaceholder>
                                        <CardText className="pt-2">
                                            COVID19 Vaccination
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