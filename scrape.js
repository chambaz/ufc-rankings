const fs = require('fs');
const request = require('request')
const cheerio = require('cheerio')
const ufcRankingUrl = 'http://www.ufc.com/rankings'

request(ufcRankingUrl, (error, response, html) => {
  if (error || response.statusCode !== 200) {
    return
  }

  const $ = cheerio.load(html)
  const data = []

  $('.ranking-list').each(function() {
    const listData = {
      weightClass: $(this).find('.weight-class-name').html().trim(),
      fighters: []
    }

    $(this).find('.name-column a').each(function() {
      listData.fighters.push($(this).html().trim())
    })

    data.push(listData)
  })

  fs.writeFile('data.json', JSON.stringify(data), function(err) {
    console.log('File saved')
  })

  console.log(data)
})
