import React, { Component } from 'react'
import styles from './styles.module.css'
import MaterialIcon from 'material-icons-react'
import fetchQuestions from '../../utils/fetchQuestions'
import Loader from '../../loader.jsx'
import { helloData } from '../../utils/api'

function Option({
  optionValue,
  optionKey,
  setSelectedOptionKeyHandler,
  rightOptionKey,
  selectedOptionKey,
  revealAns,
  type,
}) {
  function functionCalcStylesAndIcon() {
    //right button to highlight
    if (revealAns && optionKey == selectedOptionKey)
      if (rightOptionKey == selectedOptionKey)
        //correct ans
        return {
          s: { backgroundColor: 'green', color: 'white', border: 'none' },
          icon: ` ✔`,
        }
      else
        return {
          s: { backgroundColor: 'red', color: 'white', border: 'none' },
          icon: ` ✖`,
        }
    else return { s: {}, icon: `` }
  }
  function generateOptionButton() {
    const { s, icon } = functionCalcStylesAndIcon()

    if (type == 'A')
      return (
        <button
          onClick={() => setSelectedOptionKeyHandler(optionKey)}
          className={styles.button}
          style={{ ...s }}
          disabled={revealAns}
        >
          {optionValue}
          {icon}
        </button>
      )
    else
      return (
        <img
          onClick={() => setSelectedOptionKeyHandler(optionKey)}
          className={styles.imageoption}
          style={{ ...s }}
          disabled={revealAns}
          src={optionValue}
          alt="img"
        />
      )
  }

  return { ...generateOptionButton() }
}

class Options extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptionKey: null,
    }
  }

  setSelectedOptionKey = selectedOptionKey => {
    this.setState({ selectedOptionKey })
    this.props.calcNewState(selectedOptionKey)
  }

  render() {
    const { options } = this.props
    // ______________________________
    // | OptionKey|      OptionValue |
    // |_________ |__________________|
    // |      1   |   Jude   or url  |
    // |      2   |   Alice  or url  |
    // _______________________________

    return (
      <div
        className={
          this.props.type == 'A' ? styles.buttons : styles.imageoptions
        }
      >
        {Object.keys(options).map(optionKey => (
          <Option
            type={this.props.type}
            key={optionKey}
            optionValue={options[optionKey]}
            optionKey={optionKey}
            setSelectedOptionKeyHandler={this.setSelectedOptionKey}
            rightOptionKey={this.props.rightOptionKey}
            selectedOptionKey={this.state.selectedOptionKey}
            revealAns={this.props.revealAns}
          />
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
      currentQuestion: 1,
      totalScore: 0,
      questions: {},
      userAns: {
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
      },
      done: false,
    }
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this)
    this.calcNewState = this.calcNewState.bind(this)
    this.getNewScore = this.getNewScore.bind(this)
    this.computeSheet = this.computeSheet.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
  }
  componentDidMount() {
    // let splitedPathName = window.location.pathname.split('/')
    // let word = splitedPathName[splitedPathName.length - 1]

    this.fetchQuestions()
  }

  fetchQuestions() {
    fetchQuestions().then(questions => {
      this.setState({ questions, loading: false })
    })
  }
  moveToNextQuestion() {
    if (this.state.currentQuestion < Object.keys(this.state.questions).length) {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      revealAns: false,
    })
    } else this.setState({ done: true })
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
      var { options, type, answer: rightAnsKey } = this.state.questions[
        this.state.currentQuestion
      ]
    }

    return (
      <div className={styles.container}>
        {(this.state.done && 'DONE') || (
          <>
            {(!this.state.loading && (
              <>
                <div className={styles.scores}>
                  score •
                  <span style={{ color: 'green', paddingRight: '20px' }}>
                    {this.state.totalScore}
                  </span>
                </div>
                <div className={styles.middle}>
                  <p className={styles.question}>
                    {this.state.questions[this.state.currentQuestion].question}
                  </p>
                    <Options
                      options={options}
                      rightOptionKey={rightAnsKey}
                      calcNewState={this.calcNewState}
                      revealAns={this.state.revealAns}
                      type={type}
                    />
                </div>
                <div className={styles.bottom}>
                  <Indicator
                    currentQuestionId={this.state.currentQuestion}
                    computeSheet={this.computeSheet}
                  />
                  <button
                    onClick={this.moveToNextQuestion}
                    className={styles.skip}
                  >
                    SKIP
                  </button>
                </div>
              </>
            )) || (
              <Loader fill="purple" style={{ width: '50px', height: '50px' }} />
            )}
          </>
        )}
      </div>
    )
  }
}

//Need to know ehich of the indexes to select
//Need to know about a sheet that know if user answer to question was wrong or right
function Indicator({ currentQuestionId, computeSheet }) {
  const sheet = computeSheet()
  const e = [1, 2, 3, 4, 5, 6]

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
