import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

let randomInteger = Math.round(Math.random() * 10) % 5;
console.log(randomInteger) 

const Files = ({ data }) => {
  const edge = data.allMarkdownRemark.edges[randomInteger]
  return (
    <Layout>
      <div>
        <Link to={edge.node.frontmatter.path} key={edge.node.id}>
          <div>
            <h1>{edge.node.frontmatter.title}</h1>
          </div>
        </Link>
      </div>
    </Layout>
  )
}

export default Files

export const query = graphql`
  query FetchFiles {
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
