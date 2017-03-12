const fs = require('fs')
const Promise = require('promise')
const request = require('request')
const cheerio = require('cheerio')
const ufcRankingUrl = 'http://www.ufc.com/rankings'

request(ufcRankingUrl, (error, response, html) => {
  if (error || response.statusCode !== 200) {
    return
  }

  const $ = cheerio.load(html)
  const data = []
  const promises = []

  $('.ranking-list').each(function() {
    const listData = {
      weightClass: $(this).find('.weight-class-name').html().trim(),
      fighters: []
    }

    $(this).find('.name-column a').each(function() {
      listData.fighters.push($(this).html().trim())
      promises.push(getFighter($(this)))
    })
    
    data.push(listData)
  })

  console.log(promises)

  Promise.all(promises).then(() => {
    console.log('done!')
    fs.writeFile('data.json', JSON.stringify(data), () => {
      console.log('File saved')
    })
  })
})

function getFighter($html) {
  const $ = cheerio.load($html)

  return new Promise((resolve) => {
    resolve('yay')
  })
}
