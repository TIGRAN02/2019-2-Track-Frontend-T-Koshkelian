import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import './styles/globalStyles.css'
import WeatherList from './components/WeatherList'

render(
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={WeatherList} />
    </Switch>
  </Router>,
  document.getElementById('root'),
)
