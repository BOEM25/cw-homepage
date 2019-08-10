import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

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
                    <div className="media">
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
                        <p className="subtitle is-6">
                          @{post.frontmatter.date}
                        </p>
                      </div>
                    </div>

                    <div className="content">
                      <p>{post.excerpt}</p>
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
