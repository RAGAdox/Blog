import React from "react"
import Fuse from "fuse.js"
import SearchResult from "./searchResult"
import { Link } from "gatsby"

let data = [
  {
    node: {
      fields: {
        slug: "this-is-demo-for-search",
      },
      frontmatter: {
        title: "This is just a demo for search",
        author: "rishi mukherjee",
        tags: ["demo", "test"],
      },
    },
  },
  {
    node: {
      fields: {
        slug: "this-is-todo",
      },
      frontmatter: {
        title: "This is todo list ",
        author: "ragadox mukherjee",
        tags: ["search", "list"],
      },
    },
  },
]
class Search extends React.Component {
  tempArr = new Set()
  options = {
    shouldSort: true,
    keys: [
      "node.frontmatter.title",
      "node.frontmatter.author",
      "node.frontmatter.tags",
    ],
  }
  fuse = null
  constructor(props) {
    super(props)
    this.state = {
      showAutoComplete: "",
      autoCompleteArray: [],
      result: [],
    }
    this.fuse = new Fuse(props.data, this.options)
    //console.log(props.data)
    //console.log(this.fuse.search("skin"))
  }
  handelInputChange = event => {
    if (event.target.value.length > 1) {
      this.setState({
        result: this.fuse.search(event.target.value),
        showAutoComplete: "show",
      })
    }
    //console.log("Search Result ", this.state.result)
  }
  handelSubmit = event => {
    event.preventDefault()
  }
  handelKeyDown = event => {
    //Captures Tab key //
    if (event.keyCode == 9) {
      console.log("Key down function ", event.keyCode)
      event.preventDefault()
    }
  }
  handelOnFocus = event => {
    //if (this.state.showAutoComplete === "show")
    //  this.setState({ showAutoComplete: "" })
    console.log("on Focus triggered", event.target)
    if (this.state.showAutoComplete === "show")
      this.setState({ showAutoComplete: "" })
    else this.setState({ showAutoComplete: "show" })
  }
  handelOnBlur = event => {
    console.log("OnBlur Triggered", event.target)
    if (this.state.showAutoComplete === "show")
      this.setState({ showAutoComplete: "" })
  }
  render() {
    return (
      <div class="col">
        <form class="form-inline my-2 my-lg-0 row" onSubmit={this.handelSubmit}>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handelInputChange}
            onKeyDown={this.handelKeyDown}
          ></input>

          <button class="btn btn-outline-success my-2 my-sm-0">Search</button>
        </form>
        {
          <span className={"search-span " + this.state.showAutoComplete}>
            <div className="mr-sm-2 search-result-box">
              {this.state.result.map((element, key) => {
                return <SearchResult data={element.item.node}></SearchResult>
              })}
              <p>Search Result powered by fuse</p>
            </div>
          </span>
        }
      </div>
    )
  }
}
export default Search
