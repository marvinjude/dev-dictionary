import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Search from '../search'
import styles from './styles.module.css'
import logo from '../../images/gatsby-icon.png'
import { ThemeContext } from '../../templates/word-template'

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div className={styles.header}>
        {console.log(JSON.stringify(data.siteSearchIndex.index))}
        <img src={logo} alt={'logo'} className={styles['header__logo']} />
        <div className={styles['header__search']}>
          {/* <ThemeContext.Consumer>
            {({ searchQuery }) => (
              <Search
                searchIndex={data.siteSearchIndex.index}
                value={searchQuery}
              />
            )}
          </ThemeContext.Consumer> */}
        </div>
        <div className={styles['header__links']}>
          <div className={styles['header__link']}>CONTRIBUTE</div>
          <div className={styles['header__link']}>ABOUT</div>
        </div>
      </div>
    )}
  />
)

export default Header
