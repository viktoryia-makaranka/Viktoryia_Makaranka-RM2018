import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Root from './index'
import configureStore from './redux/configureStore'

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          ${process.env.NODE_ENV === 'development' ? '' : '<link href="/css/main.css" rel="stylesheet" type="text/css">'}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            if (!window) {
              global.window = {}
            }
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configureStore({ movies: { searchParams: { search: req.param('searchText') }}})
    const context = {}

    const root = (
      <Root
        context={context}
        location={req.url}
        Router={StaticRouter}
        store={store}
      />
    )

    const htmlString = renderToString(root)

    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      })
      res.end()
      return
    }

    const preloadedState = store.getState()

    res.send(renderHTML(htmlString, preloadedState))
  }
}
