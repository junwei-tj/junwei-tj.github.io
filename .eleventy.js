const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require("eleventy-plugin-reading-time");

const collections = require("./src/_11ty/collections");
const filters = require("./src/_11ty/filters");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("blog", "layouts/blog.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addCollection("blogPosts", collections.getBlogPosts);
  eleventyConfig.addCollection("blogTags", collections.getBlogTags);
  eleventyConfig.addCollection("blogYears", collections.getBlogYears);

  eleventyConfig.addFilter("mdToHtml", filters.mdToHtml);
  eleventyConfig.addFilter("formatTitle", filters.formatTitle);
  eleventyConfig.addFilter("formatDate", filters.formatDate);
  eleventyConfig.addFilter("formatDateNumeric", filters.formatDateNumeric);
  eleventyConfig.addFilter("sortTags", filters.sortTags);
  eleventyConfig.addFilter("hasTag", filters.hasTags);
  eleventyConfig.addFilter("isWithinYear", filters.isWithinYear);

  eleventyConfig.addPassthroughCopy("./src/assets");

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addWatchTarget("./src/scss/");

  return {
    dir: {
      input: "src",
    },
  };
};
