'use strict'

/* eslint-disable */

let installingWorker = null
let refreshing = false

document.getElementById('reload-page').addEventListener('click', () => {
  document.getElementById('update-page-message').className = ''
  window.location.reload()
  // if (installingWorker) {
  //   installingWorker.postMessage({ action: 'skipWaiting' })
  // }
})

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export default function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = 'niftyurl-worker.js'
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config)
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit http://bit.ly/CRA-PWA'
          )
        })
      } else {
        registerValidSW(swUrl, config)
      }
    })
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
              )

              showUpdateBar()

              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              console.log('Content is cached for offline use.')
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }

      // navigator.serviceWorker.addEventListener('controllerchange', () => {
      //   if (refreshing) return
      //   window.location.reload()
      //   refreshing = true
      // })
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl)
    .then(response => {
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

function showUpdateBar() {
  let snackbar = document.getElementById('update-page-message')
  snackbar.className = 'show'
}

/* eslint-enable */
