'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './worker'
import './assets/styles/tailwind.css'
import './assets/styles/index.scss'

ReactDOM.render(<App />, document.getElementById('app'))

registerServiceWorker()
