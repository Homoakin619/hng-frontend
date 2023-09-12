export default function Navigation() {
  return (
    <>
      <section className="banner" id="ban">
        <div className="navigation">
          <div className="navigation-brand">
            <img src="/assets/icons/logo.svg" alt="" />
          </div>
          <div className="search">
            <input
              className="search-bar"
              type="search"
              name=""
              id=""
              placeholder="What do you want to watch?"
            />
            <img src="/assets/icons/search.svg" id="search" role="button" />
          </div>
          <div className="user">
            <span className="status bold">Sign In</span>
            <img src="/assets/icons/menu.svg" alt="" />
          </div>
        </div>
        <div className="banner-content-container">
          <div className="banner-content">
            <span className="banner-title bold">John Wick 3: Parabellum</span>
            <div className="banner-ratings">
              <div>
                <img src="/assets/icons/imdb.svg" alt="" />
                <span>86.0 / 100</span>
              </div>
              <div>
                <img src="/assets/icons/tomato.svg" alt="" />
                <span>97%</span>
              </div>
            </div>
            <span className="banner-text medium">
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on his head, he is the target of hit men and women everywhere.
            </span>
            <div>
              <span className="button">
                <img src="/assets/icons/play.svg" />
                <span className="banner-button bold" role="button">
                  Watch Trailer
                </span>
              </span>
            </div>
          </div>
          <div className="slider-buttons">
            <span className="slider-btn active">1</span>
            <span className="slider-btn">2</span>
            <span className="slider-btn">3</span>
            <span className="slider-btn">4</span>
            <span className="slider-btn">5</span>
          </div>
        </div>
      </section>
      <script src="/test.js"></script>
    </>
  );
}
