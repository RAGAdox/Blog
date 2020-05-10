import React from "react"
import { Link } from "gatsby"
import Login from "../components/Login"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { fireAuth } from "../config/firebase"
const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />

    <button onClick={() => fireAuth.signOut()}>Sign Out</button>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
