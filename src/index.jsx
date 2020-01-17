/**
 * Application starting point
 */
import React from 'react'
import _ from 'lodash'
import { render } from 'react-dom'
import App from './App'
import 'styles/main.scss'


const mountNode = document.getElementById('root')


render(<App />, mountNode)
