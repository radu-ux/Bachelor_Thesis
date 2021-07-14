import TBDImage from '../../assets/TBD.svg';

function IndexPageMainSecondDataset() {
    return (
        <div className="container mt-5">
          <div className="pb-3"><h5 className="title-for-set-of-charts">Title for second category</h5></div>
          <div className="container">
            <div className="row">
            <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                  <img src={TBDImage} className="card-img-top" style={{height:"11rem"}}/>
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                  <img src={TBDImage} className="card-img-top" style={{height:"11rem"}}/>
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                  <img src={TBDImage} className="card-img-top" style={{height:"11rem"}}/>
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">View chart</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default IndexPageMainSecondDataset;