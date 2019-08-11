import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import WorkshopList from '../components/WorkshopList';

import Testimonials from '../components/Testimonials';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const WorkshopsPageTemplate = ({ image, title }) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
          backgroundColor: '#f40',
          color: 'white',
          padding: '1rem'
        }}
      >
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section has-text-centered">
          <h2 class="title is-2">Core Team</h2>
          <div className="columns">
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/stephen.jpg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Stephen Castle</h3>
              </figure>
            </div>
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Justin Hines</h3>
              </figure>
            </div>
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Robert Thompson</h3>
              </figure>
            </div>
          </div>
        </div>
        <div className="section has-text-centered">
          <h2 class="title is-2">Regular Contributors</h2>
          <div className="columns">
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Austin Lambert</h3>
              </figure>
            </div>
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Cameron Tatz</h3>
              </figure>
            </div>
          </div>
        </div>
        <div className="section has-text-centered">
          <h2 class="title is-2">Supporters</h2>
          <div className="columns">
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Richard Hertzog</h3>
              </figure>
            </div>
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Marcus Ulrich</h3>
              </figure>
            </div>
            <div className="column is-3">
              <figure class="image">
                <img
                  src={`/img/contributors/placeholder.jpeg`}
                  className="is-rounded"
                />
                <h3 className="subtitle is-4">Aditya Jain</h3>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

WorkshopsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const WorkshopsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <WorkshopsPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
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
  query ContributorsPage($id: String!) {
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
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 480, quality: 70) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          description
        }
      }
    }
  }
`;
