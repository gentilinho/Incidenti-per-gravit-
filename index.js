var svg = d3.select("svg")
    , width = +svg.attr("width")
    , height = +svg.attr("height")
    , radius = Math.min(width, height) / 2
    , g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var color = d3.scaleOrdinal(["#E8A6C4", "#FF9693", "#E88F7A", "#FFC8A8"]);
var pie = d3.pie().sort(null).value(function (d) {
    return d["Totale"];
});
var path = d3.arc().outerRadius(radius - 10).innerRadius(0);
var label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);
d3.csv("incidentipergravita.csv", function (d) {
    d["Totale"] = +d["Totale"];
    return d;
}, function (error, data) {
    if (error) throw error;
    var arc = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
    arc.append("path").attr("d", path).attr("fill", function (d) {
        return color(d.data.Gravitaincidente);
    });
    arc.append("text").attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    }).attr("dy", "0.35em").text(function (d) {
        return d.data.Gravitaincidente;
    });
});