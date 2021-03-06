import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-white-ter">
        <div className="content has-text-centered has-text-white-ter">
          <div className="container">
            <div className="columns" style={{ maxWidth: "100%" }}>
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/workshops">
                        Live Workshops
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/video-workshops/">
                        Video Workshops
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/shop-talk-podcast/">
                        Shop Talk Podcast
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/open-source-fund/">
                        Open Source Fund
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <section>
                  <div>
                    <a
                      title="facebook"
                      href="https://facebook.com/workshopcode"
                    >
                      <img
                        src={facebook}
                        alt="Facebook"
                        style={{ width: "1em", height: "1em" }}
                      />
                    </a>
                    <a title="twitter" href="https://twitter.com/workshopcode">
                      <img
                        className="fas fa-lg"
                        src={twitter}
                        alt="Twitter"
                        style={{ width: "1em", height: "1em" }}
                      />
                    </a>
                    <a
                      title="instagram"
                      href="https://instagram.com/codeworkshop"
                    >
                      <img
                        src={instagram}
                        alt="Instagram"
                        style={{ width: "1em", height: "1em" }}
                      />
                    </a>
                    <a
                      title="youtube"
                      href="https://www.youtube.com/channel/UC27DIahQvIOJHnQwpJmH0LA"
                    >
                      <img
                        src={vimeo}
                        alt="Youtube"
                        style={{ width: "1em", height: "1em" }}
                      />
                    </a>
                  </div>
                  <div>
                    <img
                      src={logo}
                      alt="Kaldi"
                      style={{ width: "50%", margin: "2rem 0" }}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
