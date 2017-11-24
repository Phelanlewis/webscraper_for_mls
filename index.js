var fs      = require('fs')
var request = require('request');
var cheerio = require('cheerio');

request('http://www.torontoneighbourhoods.net/suburbs/durham/pickering?real-estate', function(error, response, html){
  if (!error && response.statusCode === 200){
    var $ = cheerio.load(html);
    $('div.info').each(function(i, element){
      var data = $(this);
      console.log(data.text())
    })

  }
})