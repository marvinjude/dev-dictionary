import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    {/* word data comes in here */}
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/files/">Go to page Files</Link>
  </Layout>
)

export default IndexPage
