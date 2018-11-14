import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../Header'
import './layout.css'
import styles from './styles.module.css'
import Questioneer from '../Questioneer';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <div className={styles.container}>
          <div className={styles.main}>
            {children}
          </div>
          <div className={styles.aside}>
            <div className={styles.gamecontainer}>
                <Questioneer/>
            </div>
            <div className={styles.ads}>Coming Soon</div>
          </div>
        </div>
        <div className = {styles.otherDictionaries} >
          <div className={styles.card}>Qraphql</div>
          <div className={styles.card}>React</div>
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
