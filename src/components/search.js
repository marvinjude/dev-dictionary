import React, { Component } from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'

import styles from './styles.module.css'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }
  render() {

    const shouldCurve =
      this.state.results.length > 0 ||
      (this.state.query.length > 0 && this.state.results.length === 0)

    const showNoResFound =
      this.state.results.length === 0 && this.state.query.length > 0

    return (
      <div
        style={{ borderRadius: '10px', transition: 'all 200ms ease-in' }}
        className={shouldCurve ? styles.shadow : ''}
      >
        <input
          className={shouldCurve ? styles.active : styles.input}
          type="text"
          // value={this.state.query}
          onChange={this.search}
          placeholder="search word"
          defaultValue={this.props.value}
        />
        <ul className={styles.results}>
          {this.state.results.length > 0 &&
            this.state.results.map(page => (
              <li key={page.id} className={styles.result}>
                <Link to={page.path} className={styles.link}>
                  <span>{page.title}</span>
                </Link>
              </li>
            ))}
          {/* Show `No Result Found` Conditionally */}
          {showNoResFound && (
            <li className={styles.result}>
              No Result for {this.state.query}..
            </li>
          )}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    const results = this.index
      .search(query, {
        expand: true,
        fields:{
          title: { boost: 2 },
        },
      })
      .map(({ ref }) => this.index.documentStore.getDoc(ref))

    this.setState({ query, results })
  }
}
