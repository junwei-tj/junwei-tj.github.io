const getBlogPosts = (collectionApi) => {
  return collectionApi.getFilteredByGlob("./src/blog/*.md").sort((a, b) => {
    return b.date - a.date;
  });
};

const getBlogTags = (collectionApi) => {
  const tagsSet = new Set();
  const posts = collectionApi.getFilteredByGlob("./src/blog/*.md");
  posts.map((post) => {
    if (post.data.tags) {
      post.data.tags.map((tag) => tagsSet.add(tag));
    }
  });
  const tags = Array.from(tagsSet);
  tags.sort();
  return tags;
};

const getBlogYears = (collectionApi) => {
  const yearsSet = new Set();
  const posts = collectionApi.getFilteredByGlob("./src/blog/*.md");
  posts.map((post) => {
    if (post.date) {
      yearsSet.add(post.date.getFullYear());
    }
  });
  const years = Array.from(yearsSet);
  years.sort().reverse();
  return years;
};

module.exports = {
  getBlogPosts,
  getBlogTags,
  getBlogYears,
};
