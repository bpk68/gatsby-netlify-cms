import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: "is-active"
          })
          : this.setState({
            navBarActiveClass: ""
          });
      }
    );
  };

  render() {
    return (
      <nav
        className="navbar is-white"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Kendal Mint Code" style={{ width: "88px" }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                about
              </Link>
              <Link className="navbar-item" to="/blog">
                stories
              </Link>
              <Link className="navbar-item" to="/faq-for-recruiters">
                recruitment FAQ
              </Link>
              <Link className="navbar-item" to="/the-front-end-podcast">
                podcast
              </Link>
              <Link className="navbar-item" to="/projects">
                projects
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              {/* <a
                className="navbar-item"
                href="https://mentors.codingcoach.io/?country=GB"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/coding-coach_png.png" alt="Coding Coach Mentor" />
              </a> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
