import Banner from "../../assets/banner.svg";

function Navigation() {
    return (
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-5">
            <div className="container">
                <a className="navbar-brand" href="/"><img src={Banner}></img></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navBarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse" id="navBarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">Topics</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">Custom Charts</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;