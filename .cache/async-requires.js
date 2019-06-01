// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-index-page-js": () => import("/Users/tracer/dev/cw-homepage/src/templates/index-page.js" /* webpackChunkName: "component---src-templates-index-page-js" */),
  "component---src-templates-blog-post-js": () => import("/Users/tracer/dev/cw-homepage/src/templates/blog-post.js" /* webpackChunkName: "component---src-templates-blog-post-js" */),
  "component---src-templates-product-page-js": () => import("/Users/tracer/dev/cw-homepage/src/templates/product-page.js" /* webpackChunkName: "component---src-templates-product-page-js" */),
  "component---src-templates-about-page-js": () => import("/Users/tracer/dev/cw-homepage/src/templates/about-page.js" /* webpackChunkName: "component---src-templates-about-page-js" */),
  "component---src-templates-tags-js": () => import("/Users/tracer/dev/cw-homepage/src/templates/tags.js" /* webpackChunkName: "component---src-templates-tags-js" */),
  "component---src-pages-404-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-blog-index-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/blog/index.js" /* webpackChunkName: "component---src-pages-blog-index-js" */),
  "component---src-pages-contact-examples-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/contact/examples.js" /* webpackChunkName: "component---src-pages-contact-examples-js" */),
  "component---src-pages-contact-file-upload-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/contact/file-upload.js" /* webpackChunkName: "component---src-pages-contact-file-upload-js" */),
  "component---src-pages-contact-index-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/contact/index.js" /* webpackChunkName: "component---src-pages-contact-index-js" */),
  "component---src-pages-contact-thanks-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/contact/thanks.js" /* webpackChunkName: "component---src-pages-contact-thanks-js" */),
  "component---src-pages-tags-index-js": () => import("/Users/tracer/dev/cw-homepage/src/pages/tags/index.js" /* webpackChunkName: "component---src-pages-tags-index-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/tracer/dev/cw-homepage/.cache/data.json")

