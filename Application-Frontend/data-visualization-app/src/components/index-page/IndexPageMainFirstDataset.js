import WorldHappinessImg from "../../assets/World-Happiness-RaceBarChart.svg";

function IndexPageMainFirstDataset() {
    return (
        <div className="container pt-5 mt-5">
          <div className="pb-3"><h5 class="title-for-set-of-charts">People and Society</h5></div>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="card">
                  <img src={WorldHappinessImg} class="card-img-top"/>
                  <div className="card-body">
                    <h5 className="card-title">World Happiness Report</h5>
                    <p className="card-text">
                      The dataset plotted concernes the level of happiness in some European countries. <br/>
                      The stduy is made between the years <b>2015</b> and <b>2019</b>.
                    </p>
                    <a href="/world-happiness" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                  </div>
                </div>
              </div>
            </div>    
          </div>
        </div>
    )
}

export default IndexPageMainFirstDataset;