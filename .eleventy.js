const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require("eleventy-plugin-reading-time");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("blog", "layouts/blog.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addCollection("blogPosts", (collections) => {
    return collections.getFilteredByGlob("./src/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });
  eleventyConfig.addCollection("blogTags", (collections) => {
    const tagsSet = new Set();
    const posts = collections.getFilteredByGlob("./src/blog/*.md");
    posts.map((post) => {
      if (post.data.tags) {
        post.data.tags.map((tag) => tagsSet.add(tag));
      }
    });
    const tags = Array.from(tagsSet);
    tags.sort();
    return tags;
  });
  eleventyConfig.addCollection("blogYears", (collections) => {
    const yearsSet = new Set();
    const posts = collections.getFilteredByGlob("./src/blog/*.md");
    posts.map((post) => {
      if (post.date) {
        yearsSet.add(post.date.getFullYear());
      }
    });
    const years = Array.from(yearsSet);
    years.sort().reverse();
    return years;
  });

  eleventyConfig.addFilter("formatTitle", (pageTitle, defaultTitle) => {
    if (pageTitle) {
      return `${pageTitle} | ${defaultTitle}`;
    }
    return defaultTitle;
  });
  eleventyConfig.addFilter("formatDate", (dateObj) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return Intl.DateTimeFormat("en-SG", options).format(dateObj);
  });
  eleventyConfig.addFilter("formatDateNumeric", (dateObj) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return Intl.DateTimeFormat("en-SG", options)
      .format(dateObj)
      .replace(/\//g, "-");
  });
  eleventyConfig.addFilter("getTags", (tags) => {
    const tagsCopy = [...tags];
    tagsCopy.sort();
    return tagsCopy;
  });
  eleventyConfig.addFilter("hasTag", (tags, tagToFind) => {
    return tags && tags.includes(tagToFind);
  });
  eleventyConfig.addFilter("isWithinYear", (date, year) => {
    return date.getFullYear() === year;
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
