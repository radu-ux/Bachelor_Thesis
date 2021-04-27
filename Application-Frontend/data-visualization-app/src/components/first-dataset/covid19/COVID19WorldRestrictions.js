import {ChartDataFetchUtil, COVID19Restrictions, AnimationUtil} from "../../../charts/COVID-19/covid_19_world_restrictions_map_chart.js";
import { useEffect, useRef } from "react";
import Navigation from "../../shared/Navigation";
import Footer from "../../shared/Footer";
import COVID19_Vaccines from "../../../assets/COVID-19-Vaccinations-Suggestion.svg";
import COVID19_Cases_MapChart from "../../../assets/COVID-19-Cases-MapChart-Suggestion.svg";
import { ChartTitle,ChartInfo,ChartDescription,Card,
         CardImgPlaceholder,CardText,ExploreMore,
         ExploreMoreTitle,HorizontalLine,Redirection,
         GreenEmphasise, YellowEmphasise, RedEmphasise ,Emphasise} from "../../../styled-components/ChartPageStyledComponents.js";
         
function COVID19WorldRestrictions() {
    const çhartDataFetchUtil = new ChartDataFetchUtil(["http://localhost:3001/covid-19-world-restrictions-countriesCode"]);
    const covidWorldRestrictionMapChart = new COVID19Restrictions();
    const animationUtil = new AnimationUtil();
    const defaultUserOption = "parks";

    var ChartData = {
        countries_by_date: null,
        countries_geometries: null, 
        countries_with_ids: null,
        world_restrictions: null,
        dates: null
    };

    useEffect(() => {
        çhartDataFetchUtil.prepareData().then(response => {
            const {csvData, jsonData} = response;
            ChartData.countries_with_ids = csvData.countries_with_ids;
            ChartData.countries_by_date = jsonData.countries_by_date;
            ChartData.countries_geometries = jsonData.countries_geometries;
            ChartData.world_restrictions = jsonData.world_restrictions;
            ChartData.dates = jsonData.dates
            
            covidWorldRestrictionMapChart.chartDataValue = ChartData;
            animationUtil.chartDataValue = ChartData;
    
            covidWorldRestrictionMapChart.createWorldLands();
            covidWorldRestrictionMapChart.createBubbles(defaultUserOption);
            covidWorldRestrictionMapChart.createEvolutionLine();
    
            animationUtil.currentChartInstance = covidWorldRestrictionMapChart;
            animationUtil.playBubbleAnimation(defaultUserOption);
        });
    });

    const handleUserSelection = () => {
        if(animationUtil.animationPlaying) {
            animationUtil.animation.stop();
            animationUtil.animationPlaying = false;
        }
    
        const bubbles = document.getElementById("bubbles")
        const itemSelect = document.getElementById("itemOfRestriction");
        const userOption = itemSelect.options[itemSelect.selectedIndex].value;
    
        covidWorldRestrictionMapChart.deleteCurrentBubles();
    
        covidWorldRestrictionMapChart.restoreEvolutionLine();
        covidWorldRestrictionMapChart.createBubbles(userOption);
    
        animationUtil.currentChartInstance = covidWorldRestrictionMapChart;
        animationUtil.playBubbleAnimation(userOption);
    }

    return(
        <div className="App">
            <header>
                <Navigation />
            </header>
            
            <main role="main" className="mb-5">
                <ChartInfo>
                    <ChartTitle>COVID-19 World Restrictions</ChartTitle>
                    <ChartDescription >
                        The chart comes in the form of a <Emphasise>Map Chart</Emphasise>.
                        It presents a global situation regarding the level o restrictions registered in some 
                        countries around the world. The statistics are made startig 
                        from  <Emphasise>15, February 2020</Emphasise> up to <Emphasise>27, June 2020</Emphasise>.
                        The restrictions studied implies areas as: <Emphasise>parks </Emphasise>, <Emphasise>grocery and pharmacy </Emphasise>and 
                        <Emphasise> retail and recreation </Emphasise>. The data restrictions evolution was made public by Google and 
                        thanks to Jaime Carter the data was parsed to a <Emphasise>json</Emphasise> file format that was used to plot the actual values on the chart.
                        The bubbles on the chart represent the fructuation of restriction level going from <GreenEmphasise>GREEN</GreenEmphasise> (restrictions impact low) to 
                        <YellowEmphasise> YELLOW</YellowEmphasise> (restriction impac medium) and finally to <RedEmphasise>RED</RedEmphasise> (restriction impact high). Next to
                        the map chart there is represented the mean value of restrictions, registered for the chosen topic, for each day of the month. 
                        All the data is available <Redirection href="#">here &#x2192;</Redirection>
                        <HorizontalLine />
                    </ChartDescription>
                    <div className="pt-2 container">
                        <div className="row">
                            <div id="options">
                                <label className="mr-2">Choose domain to vizualize restriction evolution</label>
                                <select id="itemOfRestriction" onChange={handleUserSelection}>
                                    <option value="parks">Parks</option>
                                    <option value="retail_and_recreation">Retail and Recreation</option>
                                    <option value="grocery_and_pharmacy">Grocery and Pharmacy</option>
                                </select> 
                            </div> 
                        </div>

                        <div id="tooltip"></div>
                        <div className="row">
                            <div className="col">
                                <div id="mapChart"></div>
                            </div>
                            <div className="col">
                                <div id="progressBar"></div>
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
                        </div>
                    </ExploreMore>
                    <Footer />
               </div>
           </footer>
      </div>
    )
}

export default COVID19WorldRestrictions;