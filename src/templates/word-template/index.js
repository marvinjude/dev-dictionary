import React from 'react'
import { graphql } from 'gatsby'
import { WordData } from '../../components/Word-data'
import Layout from '../../components/Layout'

export default function Template({ data }) {
  return (
    <Layout>
      <WordData data={data} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
      }
    }
  }
`
