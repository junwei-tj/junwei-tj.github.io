const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin(syntaxHighlight);
};