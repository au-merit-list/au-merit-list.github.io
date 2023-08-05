d3.csv("list.csv").then(function (data) {
  // console.log(data);

  var list = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("");
    d3.selectAll("p").classed("noresults", true).html("");
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    // console.log(inputValue.length);
    if (inputValue.length < 4) {
      d3.select("p")
        .classed("noresults2", true)
        .html(
          "<center><strong>Please try using more than 4 characters to avoid too many results!</strong>",
        );
      inputValue = "Something to give no results";
    }
    var filteredData = list.filter((list) =>
      list.fullname.toLowerCase().trim().includes(inputValue),
    );

    if (
      filteredData.length === 0 &&
      inputValue !== "Something to give no results"
    ) {
      var filteredData = list.filter((list) =>
        list.admit_card.trim().includes(inputValue),
      );
    }
    // console.log(filteredData.length)
    if (
      filteredData.length === 0 &&
      inputValue !== "Something to give no results"
    ) {
      d3.select("p")
        .classed("noresults", true)
        .html("<center><strong>No results.</strong>");
    }
    output = _.sortBy(filteredData, "merit_score").reverse();

    for (var i = 0; i < filteredData.length; i++) {
      d3.select("tbody")
        .insert("tr")
        .html(
          "<td>" +
            [i + 1] +
            "</td>" +
            "<td>" +
            output[i]["admit_card"] +
            "</a>" +
            "</td>" +
            "<td>" +
            output[i]["merit_position"] +
            "</a>" +
            "</td>" +
            "<td>" +
            output[i]["merit_score"] +
            "</td>" +
            "<td>" +
            output[i]["fullname"] +
            "</td>" +
            "<td>" +
            output[i]["degree"],
        );
    }
  }
  window.resizeTo(screen.width, screen.height);
});
