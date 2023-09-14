

export default function SideNavbar() {
  return (
    <section className="sidenav">
        <img src="/assets/icons/logo1.svg" alt="" />
        <div className="menus">
            <div>
                <img className="menu" src="/assets/icons/home.svg" alt="" />
                <span className="nav-item bold">Home</span>
            </div>
            <div>
                <img className="menu" src="/assets/icons/movies.svg" alt="" />
                <span className="nav-item bold">Movies</span>
            </div>
            <div>
                <img className="menu" src="/assets/icons/tv.svg" alt="" />
                <span className="nav-item bold">TV Series</span>
            </div>
            <div>
                <img className="menu" src="/assets/icons/calendar.svg" alt="" />
                <span className="nav-item bold">Upcoming</span>
            </div>
        </div>
        <div className="quiz-text">
            <h4>play movie quizes and earn <br/> free tickets</h4>
            <span className="quiz-body medium">50k people are playing now</span>
            <span className="quiz-btn medium">Start Playing</span>
        </div>
        <div className="logout">
            <img className="menu" src="/assets/icons/logout.svg" alt="" />
            <span className="nav-item bold" >Log out</span>
        </div>
    </section>
  )
}