// Get today's date
var today = new Date()
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0')
var yyyy = today.getFullYear()

today = yyyy + mm + dd
var pageNum = 0

// Adding commas to data
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
}

function callNews() {
    if (pageNum < 3) {
        var apiKey = "87dGY4YaOYC6nGcdiLJJKwBEW1ZTr0YW"
        var newsQuery = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=corona+virus&begin_date=20191201&end_date=" + today + "&page=" + pageNum + "&sort=newest&api-key=" + apiKey

        $.ajax({
            url: newsQuery,
            method: "GET"
        }).then(function(response) {
            var data = response.response.docs

            for (let i = 0; i < data.length; i++) {
                // create master article div
                var containerDiv = $("<div>")
                containerDiv.addClass("newsArticle")
                // create a link with the article title as the contents
                var newLink = $("<a>")
                newLink.attr("href", data[i].web_url)
                newLink.attr("target", "_blank")
                newLink.html("<h3>" + data[i].headline.main + "</h3>")
                // create a paragraph with the publication date and article source
                var newP = $("<p>")
                var date = data[i].pub_date
                var splitDate = date.split("T")
                newP.append("Publish Date: <span>" + splitDate[0] + "</span><br>")
                newP.append("Source: <span>" + data[i].source + "</span>")
                // create a paragraph with the article snippet
                var snippet = $("<p>")
                snippet.text(data[i].snippet)
                // append everything to the master news div
                containerDiv.append(newLink)
                containerDiv.append(newP)
                containerDiv.append(snippet)
                $("#newsStories").append(containerDiv)

            }
            pageNum++
            callNews()
        })
        
    }
}

// Get the world stats
function callAPIWorld () {

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-smartable.p.rapidapi.com/stats/v1/global/",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
            "x-rapidapi-key": "1d79a935fbmsh6ce840778fdfc27p1edc1fjsnfd7dbd504b08"
        }
    }
    
    $.ajax(settings).done(function (response) {
        let data = response.stats

        console.log("World Data: " + data)

        // Run all of the data through the commas function
        let totalConfirmedCases = numberWithCommas(data.totalConfirmedCases)
        let totalRecoveredCases = numberWithCommas(data.totalRecoveredCases)
        let totalDeaths = numberWithCommas(data.totalDeaths)
        let newlyConfirmedCases = numberWithCommas(data.newlyConfirmedCases)
        let newlyRecoveredCases = numberWithCommas(data.newlyRecoveredCases)
        let newDeaths = numberWithCommas(data.newDeaths)

        // Append all world data to the page
        $("#totalConfirmedCases").text("Total Cases: " + totalConfirmedCases)
        $("#totalRecoveredCases").text("Total Recovered: " + totalRecoveredCases)
        $("#totalDeaths").text("Total Deaths: " + totalDeaths)
        $("#newlyConfirmedCases").text("New Cases: " + newlyConfirmedCases)
        $("#newlyRecoveredCases").text("Newly Recovered: " + newlyRecoveredCases)
        $("#newDeaths").text("New Deaths: " + newDeaths)
    })

}

callNews()
callAPIWorld()

// Get specific country stats
function callAPICountry() {
    var country = $("#countrySelector option:selected").val()
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-smartable.p.rapidapi.com/stats/v1/" + country + "/",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
            "x-rapidapi-key": "1d79a935fbmsh6ce840778fdfc27p1edc1fjsnfd7dbd504b08"
        }
    }
    
    $.ajax(settings).done(function (response) {
        let data = response.stats

        console.log("Country Data: " + data)

        // Run all of the data through the commas function
        let countryConfirmedCases = numberWithCommas(data.totalConfirmedCases)
        let countryRecoveredCases = numberWithCommas(data.totalRecoveredCases)
        let countryDeaths = numberWithCommas(data.totalDeaths)
        let newContryConfirmedCases = numberWithCommas(data.newlyConfirmedCases)
        let newContryRecoveredCases = numberWithCommas(data.newlyRecoveredCases)
        let newCountryDeaths = numberWithCommas(data.newDeaths)

        // Append all world data to the page
        $("#countryConfirmedCases").text("Total Cases: " + countryConfirmedCases)
        $("#countryRecoveredCases").text("Total Recovered: " + countryRecoveredCases)
        $("#countryDeaths").text("Total Deaths: " + countryDeaths)
        $("#newContryConfirmedCases").text("New Cases: " + newContryConfirmedCases)
        $("#newContryRecoveredCases").text("Newly Recovered: " + newContryRecoveredCases)
        $("#newCountryDeaths").text("New Deaths: " + newCountryDeaths)
    })
}

$("#submit").on("click", function() {
    callAPICountry()
})