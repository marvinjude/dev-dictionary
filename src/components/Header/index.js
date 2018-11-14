import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Search from '../search'
import styles from './styles.module.css'
import logo from '../../images/gatsby-icon.png'

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
        <img src={logo} alt={'logo'} className={styles['header__logo']} />
        <div className={styles['header__search']}>
          <Search searchIndex={data.siteSearchIndex.index} />
        </div>
        <div className={styles['header__links']}>
          <div className={styles['header__link']}>
            CONTRIBUTE
          </div>
          <div className={styles['header__link']}>
            ABOUT
          </div>
        </div>
      </div>
    )}
  />
)

export default Header
