import React from 'react';
import { Link } from 'gatsby';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export default function ContentCard({ post }) {
  return (
    <div className="is-parent column is-4" key={post.id}>
      <Link className="card-footer-item" to={post.fields.slug}>
        <article
          className={`card ${
            post.frontmatter.featuredpost ? 'is-featured' : ''
          }`}
        >
          {post.frontmatter.featuredimage ? (
            <div className="card-image">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.title}`
                }}
              />
            </div>
          ) : null}
          <div className="card-content">
            <div className="media wrap">
              <div class="media-left">
                <figure class="image is-48x48">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.authorimage,
                      alt: `image of author for post ${post.title}`
                    }}
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{post.frontmatter.title}</p>
                <p className="subtitle is-6">{post.frontmatter.date}</p>
              </div>
            </div>

            <div className="content">
              <p>{post.frontmatter.description}</p>
            </div>
          </div>
          <footer class="card-footer">
            <Link className="card-footer-item" to={post.fields.slug}>
              Read More →
            </Link>
          </footer>
        </article>
      </Link>
    </div>
  );
}
