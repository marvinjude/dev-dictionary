import React from 'react'
import { graphql } from 'gatsby'
import { WordData } from '../../components/Word-data'
import Layout from '../../components/Layout'

//Make Theme Per Library When Generating Templates
const themeObject = {
  react: 'blue',
  graphql: 'pink',
}

function generateTheme(pathname) {
  let library = pathname.split('/')[1]
  let searchQuery = pathname.split('/')[2]
  return {
    theme: themeObject[library],
    searchQuery
   };
}

export const ThemeContext = React.createContext();

export default function Template({ data,location }) {
  const theme = generateTheme(location.pathname);

  return (
    <ThemeContext.Provider value={theme}>
      <Layout>
        <WordData data={data} />
      </Layout>
    </ThemeContext.Provider>
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
