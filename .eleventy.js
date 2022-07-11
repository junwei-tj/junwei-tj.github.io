const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require("eleventy-plugin-reading-time");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addCollection("blogPosts", (collection) => {
    return collection.getFilteredByGlob("./src/blog/*.md");
  });

  eleventyConfig.addFilter("formatDate", (dateObj) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return Intl.DateTimeFormat("en-SG", options).format(dateObj);
  });
  eleventyConfig.addFilter("getTags", (tags) => {
    const tagsCopy = [...tags];
    tagsCopy.sort();
    return tagsCopy;
  });

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
