import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import EventWidget from "../components/EventWidget";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const VideoWorkshopTemplate = ({
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

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-8">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PreviewCompatibleImage imageInfo={featuredimage} />

            <PostContent content={content} />
            <div className="tile is-ancestor">
              <div className="tile is-vertical">
                {(gallery || []).map((item, i) => (
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={item.image} />
                    </article>
                  </div>
                ))}
              </div>
            </div>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="column is-4">
            <EventWidget
              events={upcoming}
              title="Upcoming Events"
              showBookButton
            />
            <EventWidget events={previous} title="Previous Events" />
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
  helmet: PropTypes.object
};

const VideoWorkshop = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <VideoWorkshopTemplate
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

VideoWorkshop.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
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
