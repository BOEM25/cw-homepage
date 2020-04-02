import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HeaderTitle from "../components/HeaderTitle";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const ContributorsPageTemplate = ({
  title,
  subtitle,
  image,
  contributors
}) => (
  <div className="">
    <HeaderTitle title={title} subtitle={subtitle} image={image} />

    <section className="section section--gradient">
      <div className="container">
        <div className="columns is-multiline">
          {contributors.map(contributor => (
            <div className="column is-3">
              <figure className="image">
                <PreviewCompatibleImage
                  isRounded
                  imageInfo={{
                    image: contributor.image,
                    alt: `image of contributor ${contributor.name}`
                  }}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

ContributorsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    })
  )
};

const ContributorsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ContributorsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        contributors={frontmatter.contributors}
      />
    </Layout>
  );
};

ContributorsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default ContributorsPage;

export const ContributorsPageQuery = graphql`
  query ContributorsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        contributors {
          name
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
