import React from "react"
import { Link } from "gatsby"
import { slugify } from "../utils/utilityFunctions"
import Image from "./markdownComponents/image"
//import { } from 'reactstrap'
const PostPreview = ({
  title,
  author,
  date,
  body,
  slug,
  thumbnailImage,
  tags,
  // fluid,
}) => {
  console.log(tags)
  const path = "/path-was-deleted"
  return (
    <div className="col-sm-6 mb-5" to={slug}>
      <div
        className="card h-100 card-shadow p-3 mb-5"
        onmouseover="mouseEffect(this)"
      >
        {/* <Img className="card-img-top" fluid={fluid} /> */}
        <Image name={thumbnailImage} thumbnail={true} />
        <div className="card-body card-body-post-preview">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Created By <span className="text-info">{author}</span> on{" "}
            <span className="text-info"> {date}</span>
            <br />
            <span>{thumbnailImage}</span>
          </p>
        </div>
        <div className="card-body">
          <p className="card-text">{body}</p>
        </div>
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
          <Link to={slug} className="btn btn-primary float-right col-sm-6">
            Go to this post
          </Link>
        </div>
      </div>
    </div>
  )
}
export default PostPreview
