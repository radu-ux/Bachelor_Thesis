import GitLogo from '../../assets/github.svg'
import D3Logo from '../../assets/d3.svg'

function Footer() {
    return (
        <footer className="mt-5 border-top footer text-muted">
            <div className="container" style={{fontSize: "12px"}}>
                <div className="row">
                    <div className="col">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <a href="#" id="git-logo"><img src={GitLogo}></img></a>
                                </div>
                                <div className="col">
                                    <a href="#" id="d3-logo"><img src={D3Logo}></img></a>
                                </div>
                                <div className="col">
                                    &copy; 2021 - D3CHARTS
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>  
                    </div>
                    <div className="col-5"></div>
                    <div className="col">
                        <div className="container" id="footer-nav">
                            <div className="row">
                                <div className="col">
                                    <a href="#">Home</a>
                                </div>
                                <div className="col">
                                    <a href="#">Topics</a>
                                </div>
                                <div className="col">
                                    <a href="#">About</a>
                                </div>
                                <div className="col">
                                    <a href="#">Custom Charts</a>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;