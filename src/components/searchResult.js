import React from "react"
import { Link } from "gatsby"
const SearchResult = props => {
  console.log(props.data.frontmatter)
  return (
    <div className="search-result-item">
      <Link to={"/" + props.data.fields.slug}>
        <p>{props.data.frontmatter.title}</p>
      </Link>
    </div>
  )
}
export default SearchResult
