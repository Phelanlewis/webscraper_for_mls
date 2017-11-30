var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');

var URL = 'https://www.remax.ca/on/ajax-real-estate/#queryText=Ajax,+ON&minPrice=10000&propertyTypeIds=&isCommercial=false&showSchools=false&schoolTypes=0,1,2&schoolLevels=0,1,2&schoolPrograms=0,1&schoolIds=&refreshPins=true&gallery.listingPageSize=100&coordinatesFor=Ajax,+ON&mode=Box&province=ON&cityName=Ajax&alt=&zoom=14&south=43.843435170791544&west=-79.07801818847656&north=43.89417495560465&east=-78.96815490722656&listingtab.index=1&mainlist.listingPageSize=100'
var URL2 = 'https://www.remax.ca/on/ajax-real-estate/#queryText=Ajax,+ON&minPrice=10000&propertyTypeIds=&isCommercial=false&showSchools=false&schoolTypes=0,1,2&schoolLevels=0,1,2&schoolPrograms=0,1&schoolIds=&refreshPins=true&gallery.listingPageSize=100&coordinatesFor=Ajax,+ON&mode=Box&province=ON&cityName=Ajax&alt=&zoom=14&south=43.843435170791544&west=-79.07801818847656&north=43.89417495560465&east=-78.96815490722656&listingtab.index=1&mainlist.listingPageSize=100&mainlist.listingPage=2'

function scrapePage(URL) {
  request(URL, function(error, response, html){

    var propertyType    = [];
    var detailsArray    = [];
    var priceArray      = [];
    var locationArray   = [];
    var tempPriceArray  = [];

    var $ = cheerio.load(html)

    var $propertyType = $('li.propertyDescription').each(function(i, element){
        propertyType[i] = $(this).text();

    })

    // console.log(propertyType);

    // add in the div with the class that the data is in
    var $price = $('li.propertyPrice').each(function(i, element){

        priceArray[i] = $(this).children('span').text().toString().replace(/[^a-zA-Z0-9]/g, '').replace(/,/g, '').replace(/\n/g, '').replace(/\s/g,'');

        // priceArray[i] = tempContent
        // this is the regexp to parse out the \n and \t in the text
        // var content = priceArray.toString().replace(/\t/g, '').replace(/\n/g, '').split('\r\n');
      })
    console.log(priceArray);

    var $location = $('li.propertyName').each(function(i, element){
        locationArray[i] = $(this).children('h3').children('span').text();
    })

    // console.log(locationArray);

    var $bedroomNumber = $('li.propertyBeds').each(function(i, element){
        bedroom = [];
        bedroom[i] = $(this).text() + " " + "bedrooms";
        // console.log(bedroom[i]);
    })

    var $bathroomNumber = $('li.propertyBaths').each(function(i, element){
        bathroom = [];
        bathroom[i] = $(this).text() + " " + "bathrooms";
        // console.log(bathroom[i]);
        return
    })

    function addingBedroomBathroom(bedroom, bathroom, detailsArray){
        var addedTogether = bedroom + " " + "+" + " " + bathroom;
        console.log(addedTogether)

        detailsArray.push(addedTogether)
        console.log(detailsArray)
    }

    // console.log(detailsArray);


    // this is function loops over all three of the arrays and places them in a new array
    // so that the data at array[i] matches details, price, location

    function cleaningData(type, details, price, location){

        addingBedroomBathroom($bedroomNumber, $bathroomNumber, detailsArray)

        var allDataPushed = [];

        // console.log(details)
        // console.log(price)
        // console.log(location)

        for (var i = 0; i < details.length; i++) {
          var matchedData = [];
          matchedData.push(type[i], addingBedroomBathroom[i], price[i], location[i])
          allDataPushed.push(matchedData);
          console.log(matchedData.toString(), "\n");
          matchedData.toString()
        }

        var allDataStringed = allDataPushed.toString();

        // console.log(allDataStringed)
        return allDataPushed
    }

    var finalData = cleaningData(propertyType, detailsArray, priceArray, locationArray)

    // priceArrayToString    = priceArray.toString();
    // locationArrayToString = locationArray.toString();
    // detailsArrayToString  = detailsArray.toString();

    // var finalData         = priceArrayToString + "\n" + locationArrayToString + "\n" + detailsArrayToString

    //example version of all the html beong added
    // fs.writeFile(__dirname + "/example.html", html, function(error){
    //   console.log('example.html is added to directory')
    // })

    //adding the $price var to an html file

    // fs.writeFile(__dirname + "/remax.txt", finalData, function(error){
    //   console.log('added the prices.html is added to directory')
    // })

  })
}

scrapePage(URL2);