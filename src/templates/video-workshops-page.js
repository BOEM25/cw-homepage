import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import VideoRoll from "../components/VideoRoll";
import HeaderTitle from "../components/HeaderTitle";
import EmailForm from "../components/EmailForm";

export const WorkshopsPageTemplate = ({ title, image, subtitle }) => (
  <div className="">
    <HeaderTitle title={title} subtitle={subtitle} image={image} />

    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                Videos Coming Soon
              </h1>
              <p>
                We are working on recording our first video tutorials and
                workshops. Subscribe below for an update when the first one is
                published.
              </p>
              <div className="section">
                <div className="columns">
                  <div className="column is-10 is-offset-1">
                    <VideoRoll />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <EmailForm />
  </div>
);

WorkshopsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string
};

const WorkshopsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <WorkshopsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
      />
    </Layout>
  );
};

WorkshopsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default WorkshopsPage;

export const WorkshopsPageQuery = graphql`
  query VideoWorkshopsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
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
