var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');

var URL = 'http://www.toronto-homes.net/Pickering-Toronto-Homes-For-Sale-MLS-Listings/page/1/'

function scrapePage(URL) {
  request(URL, function(error, response, html){

    var detailsArray  = [];
    var priceArray    = [];
    var locationArray = [];

    var $ = cheerio.load(html)

    // add in the div with the class that the data is in
    var $price = $('span.price').each(function(i, element){

        priceArray[i] = $(this).text();
        // this is the regexp to parse out the \n and \t in the text
        // var content = priceArray.toString().replace(/\t/g, '').replace(/\n/g, '').split('\r\n');
      })
    // console.log(priceArray);

    var $location = $('span.location').each(function(i, element){
        locationArray[i] = $(this).text();
    })
    // console.log(locationArray);

    var $detailslocation = $('span.details').each(function(i, element){
        detailsArray[i] = $(this).text();
    })
    // console.log(detailsArray);


    // this is function loops over all three of the arrays and places them in a new array
    // so that the data at array[i] matches details, price, location

    function cleaningData(details, price, location){

        var allDataPushed = [];

        // console.log(details)
        // console.log(price)
        // console.log(location)

        for (var i = 0; i < details.length; i++) {
          var matchedData = [];
          matchedData.push(details[i], price[i], location[i])
          allDataPushed.push(matchedData);
          console.log(matchedData.toString());
          matchedData.toString()
        }

        // var allDataStringed = allDataPushed.toString();
        // console.log(allDataStringed, "\n")
        // return allDataStringed
        return allDataPushed
    }

    var finalData = cleaningData(detailsArray, priceArray, locationArray)

    // var finalData         = priceArrayToString + "\n" + locationArrayToString + "\n" + detailsArrayToString

    //example version of all the html beong added
    // fs.writeFile(__dirname + "/example.html", html, function(error){
    //   console.log('example.html is added to directory')
    // })

    //adding the $price var to an html file

    fs.writeFile(__dirname + "/toronto-homes-pickering.txt", finalData, function(error){
      console.log('added the prices.html is added to directory')
    })

  })
}

scrapePage(URL);