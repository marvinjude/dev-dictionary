import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

const Files = ({ data }) => (
  <Layout>
    <div>
      {data.allMarkdownRemark.edges.map(edge => (
        <Link to={edge.node.frontmatter.path} key={edge.node.id}>
          <div>
            <h1>{edge.node.frontmatter.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  </Layout>
)

export default Files

export const query = graphql`
 query FetchFiles{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          path
          date
        }
      }
    }
  }
 }
`
