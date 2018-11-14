import React, { Component } from 'react'
import styles from './styles.module.css'
import MaterialIcon from 'material-icons-react'
import fetchQuestions from '../../utils/fetchQuestions'
import Loader from '../../loader.jsx';

class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
    }
  }

  render() {
    const { options, revealAns, rightAnsKey, clickHandler } = this.props

    return (
      <div className={styles.buttons}>
        {Object.keys(options).map(key => (
          <button
            key={key}
            disabled={revealAns}
            className={styles.button}
            onClick={() => {
              this.setState({ selectedOption: key })
              clickHandler(key)
            }}
          >
            {options[key]}

            {/* TODO: function rightOrWrong() */}
            {/* {revealAns && rightORWorong()} */}

            {revealAns
              ? key == this.state.selectedOption
                ? rightAnsKey == this.state.selectedOption
                  ? 'rite'
                  : 'wring'
                : ''
              : ''}
          </button>
        ))}
      </div>
    )
  }
}
class Questioneer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      revealAns: false,
      finished: false,
      currentQuestion: 1,
      totalScore: 0,
      questions: {},
      userAns: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
      },
    }
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this)
    this.calcNewState = this.calcNewState.bind(this)
    this.getNewScore = this.getNewScore.bind(this)
    this.computeSheet = this.computeSheet.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
  }
  componentDidMount() {
    this.fetchQuestions()
  }

  fetchQuestions() {
    fetchQuestions().then(questions => {
      this.setState({ questions, loading:false })
    })
  }
  moveToNextQuestion() {
    if (this.state.currentQuestion < 5) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        revealAns: false,
      })
    }
  }
  // Returns new Score making sure not to give new score if it has been given
  getNewScore(currentQuestionKey, selectedOption) {
    return this.state.questions[currentQuestionKey].answer == selectedOption &&
      this.state.userAns[currentQuestionKey] === undefined
      ? this.state.totalScore + 100
      : this.state.totalScore
  }

  calcNewState(selectedOption) {
    const { currentQuestion: currentQuestionKey } = this.state
    this.setState(state => ({
      userAns: { ...state.userAns, [currentQuestionKey]: selectedOption },
      totalScore: this.getNewScore(currentQuestionKey, selectedOption),
      revealAns: true,
    }))
    // Move to next question in 1sec
    setTimeout(this.moveToNextQuestion, 1000)
  }
  computeSheet() {
    const resultTable = {}
    for (const questionID in this.state.questions) {
      resultTable[questionID] =
        this.state.userAns[questionID] === undefined
          ? undefined
          : this.state.userAns[questionID] ==
            this.state.questions[questionID].answer
    }
    return resultTable
  }

  render() {
    if (!this.state.loading) {
      var { options, answer: rightAnsKey } = this.state.questions[
        this.state.currentQuestion
      ]
    }

    return (
      <div className={styles.container}>
        {(!this.state.loading && (
          <div>
            <span className={styles.scores}>
              Score •
              <span style={{ color: 'green', paddingRight: '20px' }}>
                {this.state.totalScore}
              </span>
            </span>
            <p className={styles.question}>
              {this.state.questions[this.state.currentQuestion].question}
            </p>
            <div className={styles.buttons}>
              <Options
                options={options}
                rightAnsKey={rightAnsKey}
                revealAns={this.state.revealAns}
                clickHandler={this.calcNewState}
              />
            </div>
            <Indicator
              currentQuestionId={this.state.currentQuestion}
              computeSheet={this.computeSheet}
            />
            <button className={styles.skip}>SKIP</button>
          </div>
        )) ||<Loader fill ="purple"/>}
      </div>
    )
  }
}

//Need to know ehich of the indexes to select
//Need to know about a sheet that know if user answer to question was wrong or right
function Indicator({ currentQuestionId, computeSheet }) {
  const sheet = computeSheet()
  const e = [1, 2, 3, 4, 5]

  const getColor = value => {
    if (value === undefined) return 'gray'
    else if (value) return 'green'
    else return 'red'
  }
  const indicators = e.map(i => (
    <button
      key={i}
      className={styles.indicator}
      style={{
        transform: currentQuestionId == i ? `scale(1)` : `scale(0.5)`,
        backgroundColor: getColor(sheet[i]),
      }}
    />
  ))
  return <div className={styles.indicators}>{indicators}</div>
}
export default Questioneer
