import React from "react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { kebabCase } from "lodash";

export default function ContentCard({ post }) {
  return (
    <div className="is-parent column is-4" key={post.id}>
      <article
        className={`card ${post.frontmatter.featuredpost ? "is-featured" : ""}`}
      >
        {post.frontmatter.featuredimage ? (
          <Link className="" to={post.fields.slug}>
            <div className="card-image slim-card-image">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.title}`
                }}
              />
            </div>
          </Link>
        ) : null}
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <PreviewCompatibleImage
                  isRounded
                  imageInfo={{
                    image: post.frontmatter.authorimage,
                    alt: `image of author for post ${post.title}`
                  }}
                />
              </figure>
            </div>

            <div className="media-content">
              <Link className="" to={post.fields.slug}>
                <h3 className="title is-4">{post.frontmatter.title}</h3>
              </Link>
              <p className="subtitle is-6">{post.frontmatter.date}</p>
            </div>
          </div>

          <div className="content">
            <p>{post.frontmatter.description}</p>
          </div>
          <div className="tags">
            {post.frontmatter.tags.map(tag => (
              <span className="tag is-danger" key={tag}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </span>
            ))}
          </div>
        </div>
        <footer className="card-footer">
          <Link className="card-footer-item" to={post.fields.slug}>
            Read More →
          </Link>
        </footer>
      </article>
    </div>
  );
}
