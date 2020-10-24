const jsonURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

axios.get(jsonURL)
    .then(response => {
        drawMap(response.data)
    });

function drawMap(topoJsonData) {
    const states = topojson.feature(topoJsonData, topoJsonData.objects.counties).features;
    console.log(states);

    const width = 1050;
    const height = 700;

    //create a path and set its projection
    let path = d3.geoPath()

    let body = d3.select("body");

    let svg = body.append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path)

};


