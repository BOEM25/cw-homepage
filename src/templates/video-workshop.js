import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import YouTube from "react-youtube";
import Layout from "../components/Layout";
import EventWidget from "../components/EventWidget";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const VideoWorkshopTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  featuredimage,
  video,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      <div className="container article-container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {helmet || ""} <YouTube videoId={video} className="videoPost" />
            <PostContent content={content} className="content" />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }} className="content">
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

VideoWorkshopTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const VideoWorkshop = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <VideoWorkshopTemplate
        content={post.html}
        contentComponent={HTMLContent}
        featuredimage={post.frontmatter.featuredimage}
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
        video={post.frontmatter.video}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

VideoWorkshop.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default VideoWorkshop;

export const pageQuery = graphql`
  query VideoWorkshopByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        video
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 920, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
