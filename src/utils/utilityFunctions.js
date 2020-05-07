const commonWords = [
  "a",
  "an",
  "the",
  "this",
  "those",
  "these",
  "for",
  "of",
  "and",
  "or",
  "not",
  "will",
  "would",
  "what",
  "we",
  "are",
  "is",
  "was",
  "to",
]
const slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}
const transformData = function(data) {
  let searchData = {}
  data.forEach(element => {
    element.node.frontmatter.tags.forEach(tag => {
      tag = tag.toLowerCase()
      if (searchData[tag] == null) searchData[tag] = [element.node]
      else searchData[tag].push(element.node)
    })
  })
  data.forEach(element => {
    element.node.frontmatter.title
      .toLowerCase()
      .split(" ")
      .forEach(word => {
        if (!commonWords.includes(word) && word !== "") {
          if (searchData[word] == null) searchData[word] = [element.node]
          else searchData[word].push(element.node)
        }
      })
  })
  return searchData
}
module.exports = { slugify, transformData }
