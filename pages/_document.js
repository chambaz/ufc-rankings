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
