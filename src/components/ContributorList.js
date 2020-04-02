import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class ContributorList extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: contributors } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {contributors &&
          contributors.map(({ node: contributor }) => (
            <div className="column is-3">
              <Link className="" to={contributor.fields.slug}>
                <figure className="image">
                  <PreviewCompatibleImage
                    isRounded
                    imageInfo={{
                      image: contributor.frontmatter.image,
                      alt: `image of contributor ${contributor.frontmatter.name}`
                    }}
                  />
                </figure>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

ContributorList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query ContributorListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "contributor" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                templateKey
                image {
                  childImageSharp {
                    fluid(maxWidth: 320, quality: 100) {
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
    render={(data, count) => <ContributorList data={data} count={count} />}
  />
);
