var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');

var URL = 'http://www.toronto-homes.net/Leslieville-Toronto-Homes-For-Sale-MLS-Listings/'

function scrapePage(URL) {
  request(URL, function(error, response, html){

    var detailsArray  = [];
    var priceArray    = [];
    var locationArray = [];

    var $ = cheerio.load(html)

    // add in the div with the class that the data is in
    var $price = $('span.price').each(function(i, element){

        priceArray[i] = $(this).text();
        // var content = priceArray.toString().replace(/\t/g, '').replace(/\n/g, '').split('\r\n');
      })
    console.log(priceArray);

    var $location = $('span.location').each(function(i, element){
        locationArray[i] = $(this).text();
    })
    console.log(locationArray);

    var $detailslocation = $('span.details').each(function(i, element){
        detailsArray[i] = $(this).text();
    })
    console.log(detailsArray);

    priceArrayToString    = priceArray.toString();
    locationArrayToString = locationArray.toString();
    detailsArrayToString  = detailsArray.toString();

    var finalData         = priceArrayToString + "\n" + locationArrayToString + "\n" + detailsArrayToString

    //example version of all the html beong added
    // fs.writeFile(__dirname + "/example.html", html, function(error){
    //   console.log('example.html is added to directory')
    // })

    //adding the $price var to an html file

    fs.writeFile(__dirname + "/toronto-homes.txt", finalData, function(error){
      console.log('added the prices.html is added to directory')
    })

  })
}

scrapePage(URL);