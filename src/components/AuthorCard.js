import React from "react";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

function AuthorCard({ authorImage, authorName, date }) {
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <PreviewCompatibleImage
            isRounded
            imageInfo={{
              image: authorImage,
              alt: `image of author ${authorName}`
            }}
          />
        </figure>
      </div>
      <div className="media-content">
        <p className="authorName">{authorName}</p>
        <p className="publishedDate">{date}</p>
      </div>
    </div>
  );
}

export default AuthorCard;
