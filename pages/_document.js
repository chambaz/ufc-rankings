import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    const styles = flush()
    return { html, head, styles }
  }

  render () {
    return (
     <html>
       <Head>
        <title>UFC Rankings</title>
        <meta name="description" content="UFC rankings app for MMA in pound for pound, heavyweight, light heavyweight, middleweight, welterweight, lightweight, featureweight, bantamweight, flyweight, and strawweight divisions." />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#d53e29" />
        <meta name="theme-color" content="#ffffff" />
        <style>{`body { margin: 0 }`}</style>
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
