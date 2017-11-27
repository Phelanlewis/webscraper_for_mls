var fs      = require('fs')
var request = require('request');
var cheerio = require('cheerio');


function scrapePage() {
  request('http://www.torontoneighbourhoods.net/neighbourhoods/east-end/leslieville?real-estate', function(error, response, html){
    // if (!error && response.statusCode === 200){
    //   var $ = cheerio.load(html);
    //   $('div.info').each(function(i, element){
    //     var data = $(this);
    //     console.log(data.text())
    //   })

    fs.writeFile(__dirname + "/example.html", html, function(error){
      console.log('example.html is added to directory')
    })
  })
}

scrapePage();