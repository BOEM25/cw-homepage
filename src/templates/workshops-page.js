import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import HeaderTitle from "../components/HeaderTitle";
import FeaturedWorkshopList from "../components/FeaturedWorkshopList";
import ImageAndInfo from "../components/ImageAndInfo/ImageAndInfo";
import Testimonials from "../components/Testimonials";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const WorkshopsPageTemplate = ({
  image,
  title,
  subtitle,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage,
  pricing
}) => (
  <div className="">
    <HeaderTitle title={title} subTitle={subtitle} />
    <section className="section section--gradient">
      <div className="container">
        <article className="message is-primary">
          <div className="message-header">
            <p>Important Message</p>
          </div>
          <div className="message-body">
            All live workshops are currently on hold until further notice due to
            the developing COVID-19 situation. Please if you can join us on
            Discord or our remote meetups which we will continue to post on
            Meetup.com. Be safe and take care of yourselves.
            <div className="buttons are-medium" style={{ marginTop: "1rem" }}>
              <a
                className="button is-primary"
                href="https://www.meetup.com/code-workshop/"
              >
                Meetup.com
              </a>
              <a className="button is-link" href="https://discord.gg/5E63d7u">
                Discord
              </a>
            </div>
          </div>
        </article>
        <div className="section">
          <h2 className="title big">FEATURED WORKSHOPS</h2>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <FeaturedWorkshopList gridItems={intro.blurbs} />
              <div
                className="full-width-image-container"
                style={{
                  backgroundImage: `url(${
                    fullImage.childImageSharp
                      ? fullImage.childImageSharp.fluid.src
                      : fullImage
                  })`
                }}
              />
              <ImageAndInfo
                title={main.heading}
                body={main.description}
                image={main.onsiteImage}
              />
              <div className="tile is-ancestor">
                <div className="tile is-vertical">
                  <div className="tile">
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image1} />
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image2} />
                      </article>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={main.image3} />
                    </article>
                  </div>
                </div>
              </div>
              <Testimonials testimonials={testimonials} />
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
  query WorkshopsPage($id: String!) {
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
          onsiteImage {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
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
