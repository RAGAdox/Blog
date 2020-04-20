import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>About Me :-</h1>
    <p>
      Hi this is Rishi Mukherjee.I am interested in learning new and promising
      technologies .I also have a interest in PC hardware components .As of
      hobbies i like to play Keyboard and sometimes play games like
      Fortnite,Call Of Duty,Need for Speed and PUBG Mobile{" "}
    </p>

    <p>This is an example page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default About
