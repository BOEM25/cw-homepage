import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const ImageAndInfo = ({ title, body, image, side = "left" }) => (
  <div className="section">
    <div className="columns is-vcentered">
      {side === "right" ? (
        <div className="column">
          <div className="content">
            <h2 className="title">{title}</h2>
            <p className="">{body}</p>
          </div>
        </div>
      ) : null}
      <div className="column">
        <PreviewCompatibleImage imageInfo={image} />
      </div>
      {side === "left" ? (
        <div className="column">
          <div className="content">
            <h2 className="title">{title}</h2>
            <p className="body">{body}</p>
            <Link to="/contact">
              <button className="button">Contact Us</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

ImageAndInfo.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  pageData: PropTypes.shape({}),
  side: PropTypes.oneOf(["left", "right"])
};

export default ImageAndInfo;
