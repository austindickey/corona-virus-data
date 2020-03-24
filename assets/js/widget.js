var newsArray = []

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    newsArray[0] = count - 1
}

function callAPIWorld () {
    var worldQuery = "https://thevirustracker.com/free-api?global=stats"

    $.ajax({
        url: worldQuery,
        method: "GET"
    }).then(function(response) {
        var data = response.results[0]

        $("#totalWorldCases").text("Total Cases: " + data.total_cases)
        $("#totalWorldActiveCases").text("Active Cases: " + data.total_active_cases)
        $("#totalWorldRecoverd").text("Recovered: " + data.total_recovered)
        $("#totalWorldDeaths").text("Deaths: " + data.total_deaths)
        $("#totalWorldUnresolved").text("Unresolved: " + data.total_unresolved)
        $("#totalWorldNewToday").text("New Cases Today: " + data.total_new_cases_today)
        $("#totalWorldDeathsToday").text("New Deaths Today: " + data.total_new_deaths_today)

        countProperties(news)

        var artId = newsArray[0]

        for (let i = 0; i < 30; i++) {
            var current = news[artId]
            // console.log(current)

            var containerDiv = $("<div>")
            containerDiv.addClass("newsArticle")
            var newImg = $("<img>")
            newImg.attr("src", current.image)
            newImg.addClass("newsPics")
            var newLink = $("<a>")
            newLink.attr("href", current.url)
            newLink.html("<h3>" + current.title + "</h3>")
            var time = $("<p>")
            time.html("<span>" + current.time + "</span>")

            containerDiv.append(newImg)
            containerDiv.append(title)
            containerDiv.append(time)
            $("#newsStories").append(containerDiv)

            artId--
        }

    })
}

callAPIWorld()

function callAPICountry() {
    var country = $("#countrySelector option:selected").val()
    var countryQuery = "https://thevirustracker.com/free-api?countryTotal=" + country

    $.ajax({
        url: countryQuery,
        method: "GET"
    }).then(function(response) {
                
        var data = response.countrydata[0]
        var news = response.countrynewsitems[0]

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