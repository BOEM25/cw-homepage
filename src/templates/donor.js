import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import EventWidget from "../components/EventWidget";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const DonorTemplate = ({
  content,
  contentComponent,
  upcoming,
  previous,
  tags,
  gallery,
  title,
  featuredimage,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return <section className="section"></section>;
};

DonorTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const Donor = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <DonorTemplate
        content={post.html}
        contentComponent={HTMLContent}
        gallery={post.frontmatter.gallery}
        featuredimage={post.frontmatter.featuredimage}
        upcoming={post.frontmatter.upcoming}
        previous={post.frontmatter.previous}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

Donor.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Donor;

export const pageQuery = graphql`
  query DonorByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
