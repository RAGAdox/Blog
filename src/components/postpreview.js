import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { slugify } from "../utils/utilityFunctions"
//import { } from 'reactstrap'
const PostPreview = ({
  title,
  author,
  path,
  date,
  body,
  thumbnailImage,
  tags,
  fluid,
}) => {
  console.log(tags)

  return (
    <div className="col-sm-6">
      <div className="card">
        <Img className="card-img-top" fluid={fluid} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Created By <span className="text-info">{author}</span> on{" "}
            <span className="text-info"> {date}</span>
            <br />
            <span>{thumbnailImage}</span>
          </p>
          <p className="card-text">{body}</p>
          <div className="card-body">
            <div className="col-sm-6 float-left">
              {tags.map(tag => {
                return (
                  <Link
                    key={tag}
                    className="badge badge-primary"
                    to={`/tag/${slugify(tag)}`}
                  >
                    {tag}
                  </Link>
                )
              })}
            </div>
            <Link to={path} className="btn btn-primary float-right">
              Go to this post
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostPreview
