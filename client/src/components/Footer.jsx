import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="logo-mark">GV</div>
            <div className="logo-text">GAMEVERSE</div>
          </Link>

          <p>
            Discover, explore and learn about the most popular
            video games in one place.
          </p>
        </div>

        <div className="footer-column">
          <h3>EXPLORE</h3>

          <Link to="/">Home</Link>
          <Link to="/games">All Games</Link>
        </div>

        <div className="footer-column">
          <h3>ABOUT</h3>

          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className="footer-column">
          <h3>CONTACT</h3>

          <p>gameverse@gmail.com</p>
          <p>+91 98000 98000</p>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 GameVerse. All rights reserved.</span>
        <span>Built with React · Node.js · MongoDB</span>
      </div>

    </footer>
  );
}

export default Footer;