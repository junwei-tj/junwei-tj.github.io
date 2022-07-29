const md = require("markdown-it")();
const mdToHtml = (content) => {
  return md.render(content);
};

const formatTitle = (pageTitle, defaultTitle) => {
  if (pageTitle) {
    return `${pageTitle} | ${defaultTitle}`;
  }
  return defaultTitle;
};

const formatDate = (dateObj) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return Intl.DateTimeFormat("en-SG", options).format(dateObj);
};

const formatDateNumeric = (dateObj) => {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return Intl.DateTimeFormat("en-SG", options)
    .format(dateObj)
    .replace(/\//g, "-");
};

const sortTags = (tags) => {
  const tagsCopy = [...tags];
  tagsCopy.sort();
  return tagsCopy;
};

const hasTags = (tags, tagToFind) => {
  return tags && tags.includes(tagToFind);
};

const isWithinYear = (date, year) => {
  return date.getFullYear() === year;
};

module.exports = {
  mdToHtml,
  formatTitle,
  formatDate,
  formatDateNumeric,
  sortTags,
  hasTags,
  isWithinYear,
};
