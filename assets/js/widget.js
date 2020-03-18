function callAPIWorld () {
    var worldQuery = "https://thevirustracker.com/free-api?global=stats"

    $.ajax({
        url: worldQuery,
        method: "GET"
    }).then(function(response) {
        var data = response.results[0]

        console.log(data)

    })
}

callAPIWorld()