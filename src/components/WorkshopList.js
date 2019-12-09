import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import ReactTooltip from "react-tooltip";

import PreviewCompatibleImage from "./PreviewCompatibleImage";
import easy from "../img/icons/easy.svg";
import medium from "../img/icons/medium.svg";
import hard from "../img/icons/hard.svg";

import js from "../img/languages/js.svg";
import go from "../img/languages/go.svg";

import cpp from "../img/languages/c++.svg";

const experienceMap = {
  0: {
    icon: easy,
    message:
      "This workshop can be completed with little to no programming experience."
  },
  1: {
    icon: medium,
    message: "This course requires moderate programming experience."
  },
  2: {
    icon: hard,
    message:
      "This course is for professional programmers with some years of experience."
  }
};

const languageMap = {
  "c++": cpp,
  go: go,
  javascript: js
};

class WorkshopList extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <Link className="card-footer-item" to={post.fields.slug}>
                <article
                  className={`card ${
                    post.frontmatter.featuredpost ? "is-featured" : ""
                  }`}
                >
                  {post.frontmatter.featuredimage ? (
                    <div className="card-image">
                      <div className="iconBar">
                        <img
                          src={
                            experienceMap[post.frontmatter.experienceLevel].icon
                          }
                          className="experienceIcon"
                          data-tip={
                            experienceMap[post.frontmatter.experienceLevel]
                              .message
                          }
                        />
                        <ReactTooltip multiline />
                        {(post.frontmatter.languages || []).map(language => (
                          <img
                            src={languageMap[language]}
                            className="experienceIcon"
                          />
                        ))}
                      </div>
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
                              alt: `author thumbnail for event ${post.title}`
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
                    <div className="tags">
                      {post.frontmatter.tags.map(tag => (
                        <span className="tag is-danger">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <footer class="card-footer">
                    <Link className="card-footer-item" to={post.fields.slug}>
                      Scheduled Times and Syllabus →
                    </Link>
                  </footer>
                </article>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

WorkshopList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query WorkshopListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "workshop" } } }
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
                description
                tags
                languages
                experienceLevel
                authorimage {
                  childImageSharp {
                    fluid(maxWidth: 160, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
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
    render={(data, count) => <WorkshopList data={data} count={count} />}
  />
);
