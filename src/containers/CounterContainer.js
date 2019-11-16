import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CounterComp from '../../trash/CounterComp'
import ActionTypes from '../constants/ActionTypes'
import { incrementIfOdd } from '../../trash/counter'

export class CounterContainer extends React.Component {
  increment = () => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props
    dispatch({ type: ActionTypes.INCREMENT_COUNTER })
  }

  decrement = () => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props
    dispatch({ type: ActionTypes.DECREMENT_COUNTER })
  }

  incrementIfOdd = () => {
    incrementIfOdd()
  }

  render() {
    const { counter } = this.props

    return (
      <CounterComp
        counter={counter}
        increment={this.increment}
        decrement={this.decrement}
        incrementIfOdd={this.incrementIfOdd}
      />
    )
  }
}

CounterContainer.propTypes = {
  counter: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    dispatch: PropTypes.func.isRequired,
  }
}

export default connect(mapStateToProps)(CounterContainer)
