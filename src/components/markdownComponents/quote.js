import React from "react"
const Quote = props => {
  const data = {
    text: props.children[0] ? props.children[0] : null,
    author: props.author ? props.author : null,
  }
  const style = {
    colvalue: props.children[0].length > 500 ? 12 : 6,
    float: props.float ? props.float : "none",
    display: props.display ? props.display : "block",
  }

  if (data.text != null)
    return (
      <>
        <div
          className={`card card-quote col-sm-${style.colvalue} float-${style.float} d-${style.display}`}
        >
          <div className="card-body">
            <div className="card-title">
              <h1 style={{ display: "inline" }}>"</h1>

              <h5 className="card-title" style={{ display: "inline" }}>
                {data.text}
              </h5>
            </div>
            <div className="card-text float-right">
              - {data.author ? data.author : "Anonumous"}
            </div>
          </div>
        </div>
      </>
    )
}
export default Quote
