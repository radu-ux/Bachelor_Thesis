import GitLogo from '../../assets/github.svg'
import D3Logo from '../../assets/d3.svg'

function Footer() {
    return (
        <>
            <div className="container mt-5" id="line"></div>
                <div className="container">
                    <div className="pt-3 pb-3">
                        <div className="d-flex flex-row">
                            <a className="mr-4" href="#" id="git-logo"><img src={GitLogo}></img></a>
                            <a className="mr-4" href="#" id="d3-logo"><img src={D3Logo}></img></a>
                            <span>&copy; 2021 - D3CHARTS</span>
                            <div className="ml-auto" id="footer-nav">
                                <a href="#">Home</a>
                                <a className="ml-4" href="#">Topics</a>
                                <a className="ml-4" href="#">About</a>
                                <a className="ml-4" href="#">Custom Charts</a>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Footer;