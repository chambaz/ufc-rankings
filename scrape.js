const fs = require('fs')
const Promise = require('promise')
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

console.log('Fetching fighters...')

request(ufc('/rankings'), (error, response, html) => {
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

    $(this).find('.name-column a').each(function(index) {
      listData.fighters[index] = {
        name: $(this).html().trim()
      }

      promises.push(getFighter(listData.weightClass, index, $(this).attr('href')))
    })

    data.push(listData)
  })

  Promise.all(promises).then((fighters) => {
    fighters.forEach(fighter => {
      const thisFighter = _.find(data, item => {
        return item.weightClass === fighter.weightClass
      }).fighters[fighter.ranking]

      thisFighter.record = fighter.record
      thisFighter.image = fighter.image
    })

    fs.writeFile('data.json', JSON.stringify(data), () => {
      console.log('File saved')
    })
  })
})

function getFighter(weightClass, ranking, url) {
  console.log(`Fetching ${url}...`)
  return new Promise((resolve, reject) => {
    request(ufc(url), (error, response, html) => {
      if (error || response.statusCode !== 200) {
        reject()
      }

      const $ = cheerio.load(html)

      resolve({
        weightClass,
        ranking,
        record: $('.fighter-record').html().split('<span')[0],
        image: $('.fighter-image img').attr('src')
      })
    })
  })
}

function ufc(url) {
  return `http://www.ufc.com${url}`
}
