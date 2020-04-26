import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { kebabCase } from "lodash";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

class VideoRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline stretch">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-4" key={post.id}>
              <article
                className={`card ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`}
              >
                {post.frontmatter.featuredimage ? (
                  <Link className="" to={post.fields.slug}>
                    <div className="card-image slim-card-image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.title}`,
                        }}
                      />
                    </div>
                  </Link>
                ) : null}
                <div className="card-content">
                  <div className="media-content">
                    <Link className="" to={post.fields.slug}>
                      <h3 className="title is-4">{post.frontmatter.title}</h3>
                    </Link>
                    <p className="subtitle is-6">{post.frontmatter.date}</p>
                  </div>

                  <div className="content">
                    <p>{post.frontmatter.description}</p>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link className="card-footer-item" to={post.fields.slug}>
                    Start Video →
                  </Link>
                </footer>
              </article>
            </div>
          ))}
      </div>
    );
  }
}

VideoRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query VideoRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: {
              templateKey: { eq: "video-workshop" }
              published: { eq: true }
            }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                description
                tags
                authorimage {
                  childImageSharp {
                    fluid(maxWidth: 160, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 620, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <VideoRoll data={data} count={count} />}
  />
);
