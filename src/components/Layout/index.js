import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'


import './layout.css'
import Header from '../Header'
import styles from './styles.module.css'
import Questioneer from '../Questioneer'
import { ThemeContext } from '../../templates/word-template';

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
          <div className={styles.main}>{children}</div>
          <div className={styles.aside}>
            <div className={styles.gamecontainer}>
              <Questioneer />
            </div>
            <div className={styles.ads}>Coming Soon</div>
            <ThemeContext.Consumer>
              {(theme) => (
                <>
                  {console.log(theme)}
                </>
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
        <div className={styles.otherDictionaries}>
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
