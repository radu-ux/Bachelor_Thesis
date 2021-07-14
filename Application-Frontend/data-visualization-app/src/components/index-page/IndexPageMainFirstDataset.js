import WorldHappinessImg from "../../assets/World-Happiness-RaceBarChart.svg";
import COVID19VaccineImg from "./../../assets/COVID-19-Vaccinations.svg";
import COVID19_Cases_MapChart from "../../assets/COVID-19-Cases-MapChart.svg";
import TBDImage from '../../assets/TBD.svg';

function IndexPageMainFirstDataset() {
    return (
        <div className="container pt-5 mt-5">
          <div className="pb-3"><h5 className="title-for-set-of-charts">People and Society</h5></div>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="card" style={{height:"25.29rem"}}>
                  <img src={WorldHappinessImg} className="card-img-top" style={{height:"11rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">World Happiness Report</h5>
                    <p className="card-text">
                      The dataset plotted concernes the level of happiness in some European countries. <br/>
                      The stduy is made between the years <b>2015</b> and <b>2019</b>.
                    </p>
                  </div>
                  <div className="card-footer" style={{backgroundColor:"white", borderTop:"0"}}>
                    <a href="/world-happiness" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card" style={{height:"25.29rem"}}>
                <img src={COVID19VaccineImg} className="card-img-top" style={{height:"11rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">COVID-19 World Vaccination</h5>
                    <p className="card-text">
                      A chart regarding the evolutoion of people vaccination against <b>COVID 19</b> <br/>
                      Also contains inforamtions about the vaccine used in each contry. <br/>
                    </p>
                  </div>
                  <div className="card-footer" style={{backgroundColor:"white", borderTop:"0"}}>
                    <a href="/covid-19-vaccine" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card" style={{height:"25.29rem"}}>
                <img src={TBDImage} className="card-img-top" style={{height:"11rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                  <div className="card-footer" style={{backgroundColor:"white", borderTop:"0"}}>
                  <a href="#" className="btn btn-primary">View chart</a>
                  </div>  
                </div>
              </div>
            </div>    
          </div>
        </div>
    )
}

export default IndexPageMainFirstDataset;