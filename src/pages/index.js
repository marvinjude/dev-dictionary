import React from 'react'
import { Link, graphql } from 'gatsby'

import styles from './index.module.css'
import Search from '../components/search'
import logo from '../images/logo.svg'

const IndexPage = ({ data }) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <div>
        <h1 style={{fontFamily:"cursive"}}>dev-dictionary</h1>
      </div>
      <Search
        searchIndex={data.siteSearchIndex.index}
      />
    </div>
    <div className={styles.bottom}>
      <div className={styles.wod}>
        <div className={styles.dictionaryLogo}>
          <img src={logo} alt={'react'} />
        </div>
        <div className={styles.dictionaryLogoContent}>
          <p className={styles.word}>Suspense</p>
          <p className={styles.wordtext}>
            the word means that there is still
            more to be done in the wordld of the web
            <Link to={'/react/lazy'}> more </Link>
          </p>
        </div>
      </div>
      <div className={styles.wod}>
        <div className={styles.dictionaryLogo}>
          <img src={logo} alt={'react'} />
        </div>
        <div className={styles.dictionaryLogoContent}>
          <p className={styles.word}>Suspense</p>
          <p className={styles.wordtext}>
            the word means that there is still
            more to be done in the wordld of the web
            <Link to={'/react/suspense'}> more </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default IndexPage

export const query = graphql`
  query SearchIndexQry {
    siteSearchIndex {
      index
    }
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
