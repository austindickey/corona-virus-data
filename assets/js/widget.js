// Timeline data is not coming back from the virus tracker

// function callTimeline () {
//     var timelineQuery = "https://thevirustracker.com/timeline/map-data.json"

//     $.ajax({
//         url: timelineQuery,
//         method: "GET"
//     }).then(function(response) {
//          console.log(response)

//     })
// }

// Get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0')
var mm = String(today.getMonth() + 1).padStart(2, '0')
var yyyy = today.getFullYear()

today = yyyy + mm + dd
var pageNum = 0

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
    var worldQuery = "https://api.thevirustracker.com/free-api?global=stats"

    $.ajax({
        url: worldQuery,
        method: "GET"
    }).then(function(response) {
        var data = response.results[0]

        console.log("world data: " + data)
         
        $("#totalWorldCases").text("Total Cases: " + data.total_cases)
        $("#totalWorldActiveCases").text("Active Cases: " + data.total_active_cases)
        $("#totalWorldRecoverd").text("Recovered: " + data.total_recovered)
        $("#totalWorldDeaths").text("Deaths: " + data.total_deaths)
        $("#totalWorldUnresolved").text("Unresolved: " + data.total_unresolved)
        $("#totalWorldNewToday").text("New Cases Today: " + data.total_new_cases_today)
        $("#totalWorldDeathsToday").text("New Deaths Today: " + data.total_new_deaths_today)

    })
}

callNews()
callAPIWorld()

// Get specific country stats
function callAPICountry() {
    var country = $("#countrySelector option:selected").val()
    var countryQuery = "https://api.thevirustracker.com/free-api?countryTotal=" + country

    $.ajax({
        url: countryQuery,
        method: "GET"
    }).then(function(response) {
                
        var data = response.countrydata[0]

        console.log("country data: " + data)

        $("#totalCountryCases").text("Total Cases: " + data.total_cases)
        $("#totalCountryActiveCases").text("Active Cases: " + data.total_active_cases)
        $("#totalCountryRecoverd").text("Recovered: " + data.total_recovered)
        $("#totalCountryDeaths").text("Deaths: " + data.total_deaths)
        $("#totalCountryUnresolved").text("Unresolved: " + data.total_unresolved)
        $("#totalCountryNewToday").text("New Cases Today: " + data.total_new_cases_today)
        $("#totalCountryDeathsToday").text("New Deaths Today: " + data.total_new_deaths_today)

    })
}

$("#submit").on("click", function() {
    callAPICountry()
})