import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import EmailForm from "../components/EmailForm";
import Layout from "../components/Layout";
import HeaderTitle from "../components/HeaderTitle";
import FeaturedWorkshopList from "../components/FeaturedWorkshopList";
import BlogRoll from "../components/BlogRollHomePage";

export const IndexPageTemplate = ({ image, title, subtitle }) => (
  <div className="">
    <HeaderTitle title={title} subtitle={subtitle} image={image} />
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <FeaturedWorkshopList />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/workshops">
                      See all workshops
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="margin-top-0 email-banner slanted">
        <EmailForm />
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
        <div className="column is-12">
          <h3 className="has-text-weight-semibold is-size-2">Latest content</h3>
          <BlogRoll />
          <div className="column is-12 has-text-centered">
            <Link className="btn" to="/blog">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <Helmet>
        <script type="application/ld+json">{`
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": "Code Workshop",
      "url": "https://codeworkshop.dev",
      "sameAs" : [ "https://facebook.com/workshopcode",
      "https://twitter.com/workshopcode",
      "https://instagram.com/codeworkshop"],
      "logo": {
        "@type": "ImageObject",
        "url": "https://codeworkshop.dev/img/codeworkshop-logo.png",
        "width": 303,
        "height": 231
      }
    }
  `}</script>
      </Helmet>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
