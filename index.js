var fs      = require('fs')
var request = require('request');
var cheerio = require('cheerio');


function scrapePage() {
  request('http://www.torontoneighbourhoods.net/neighbourhoods/east-end/leslieville?real-estate', function(error, response, html){

    var $ = cheerio.load(html);

    var $price = $('div.info').each(function(i, element){
        var data = $(this);
        console.log(data.text())
      })

    //example version of all the html beong added
    // fs.writeFile(__dirname + "/example.html", html, function(error){
    //   console.log('example.html is added to directory')
    // })

    //adding the $price var to an html file

    fs.writeFile(__dirname + "/price.html", $price, function(error){
      console.log('added the prices.html is added to directory')
    })

  })
}

scrapePage();