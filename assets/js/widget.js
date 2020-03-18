function callAPIWorld () {
    var worldQuery = "https://thevirustracker.com/free-api?global=stats"

    $.ajax({
        url: worldQuery,
        method: "GET"
    }).then(function(response) {
        var data = response.results[0]

        console.log(data)

        $("#totalWorldCases").text("Total Cases: " + data.total_cases)
        $("#totalWorldActiveCases").text("Active Cases: " + data.total_active_cases)
        $("#totalWorldRecoverd").text("Recovered: " + data.total_recovered)
        $("#totalWorldDeaths").text("Deaths: " + data.total_deaths)
        $("#totalWorldUnresolved").text("Unresolved: " + data.total_unresolved)
        $("#totalWorldNewToday").text("New Cases Today: " + data.total_new_cases_today)
        $("#totalWorldDeathsToday").text("New Deaths Today: " + data.total_new_deaths_today)

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

        console.log(response)
                
        var data = response.results[0]

        // console.log(data)

    })
}

$("#submit").on("click", function() {
    callAPICountry()
})