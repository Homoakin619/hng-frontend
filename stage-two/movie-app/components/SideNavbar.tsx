

export default function SideNavbar() {
  return (
    <section className="sidenav">
        <img src="/assets/icons/logo.svg" alt="" />
        <div className="menus">
            <div>
                <img src="/assets/socials/facebook.svg" alt="" />
                <span>Home</span>
            </div>
            <div>
                <img src="/assets/socials/facebook.svg" alt="" />
                <span>Movies</span>
            </div>
            <div>
                <img src="/assets/socials/facebook.svg" alt="" />
                <span>TV Series</span>
            </div>
            <div>
                <img src="/assets/socials/facebook.svg" alt="" />
                <span>Upcoming</span>
            </div>
        </div>
        <div className="quiz-text">
            <span>play more quizzes and earn free tickets</span>
            <span className="quiz-btn">Start Playing</span>
        </div>
        <div className="logout">
            <img src="/assets/socials/facebook.svg" alt="" />
            <span>Log out</span>
        </div>
    </section>
  )
}