import React from 'react'
import MaterialIcon from 'material-icons-react'
import styles from './styles.module.css'

export const WordData = ({ data }) => {
  const { markdownRemark: post } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = post

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '20px', padding: '30px 30px 30px 10px' }}>
        <p className={styles['title']}>{frontmatter.title}</p>
        <div className={styles['tags']}>
          <span className={styles['tag']}>Function</span>
          <span className={styles['tag']}>React 16.6</span>
        </div>
      </div>
      <div
        className={styles['content']}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className={styles.contribute}>
        <span>
          <a href="https://www.github.com/react-dictionary/">EDIT ON GITHUB</a>
        </span>
        <span>
          <a href="https://www.twitter.com/@marvinjudehk">by @marvinjudehk</a>
        </span>
      </div>
    </div>
  )
}
