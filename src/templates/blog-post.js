import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import useSiteMetadata from "../components/SiteMetadata";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
require("prismjs/themes/prism-tomorrow.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
export const BlogPostTemplate = ({
  content,
  contentComponent,
  featuredImage,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container article-container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <section className="section">
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredImage,
                  alt: `featured image thumbnail for post ${title}`
                }}
              />
            </section>
            <PostContent content={content} />
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
        </div>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { siteUrl } = useSiteMetadata();
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        featuredImage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.frontmatter.title} />
            <meta property="article:author" content={post.frontmatter.author} />
            <meta property="og:url" content={`${siteUrl}${post.fields.slug}`} />

            <meta
              property="og:image"
              content={`${siteUrl}${post.frontmatter.featuredimage.childImageSharp.fluid.src}`}
            />
            <script type="application/ld+json">{`
{ "@context": "https://schema.org", 
"@type": "BlogPosting",
"headline": "${post.frontmatter.title}",
"publisher": "Code Workshop",
"image": "${siteUrl}${
              post.frontmatter.featuredimage.childImageSharp.fluid.src
            }",
"genre": "programming and software development", 
"keywords": "${post.frontmatter.tags.join(" ")}",
"wordcount": "${post.wordCount.words}",
"url": "${siteUrl}${post.fields.slug}",
"datePublished": "${post.frontmatter.date}",
"description": "${post.frontmatter.description}",
"author": {
  "@type": "Person",
  "name": "${post.frontmatter.author}"
}
}
  `}</script>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      wordCount {
        words
      }
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        author
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`;
