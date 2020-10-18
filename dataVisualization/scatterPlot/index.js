axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
    .then(response => {
        const dataset = response.data;
        draw(dataset);
    });

const draw = (dataset) => {

    const svgWidth = 1000
    const svgHeight = svgWidth / 2;
    const svgPadding = svgWidth * 0.05;

    let body = d3.select("body");

    //add title
    body.append("h1").attr("id", "title").text("Doping in Professional Bicycle Racing")

    let svg = body
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .attr("class", "graph-svg-component");

    //scale
    let yScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d) => d.Seconds), d3.max(dataset, (d) => d.Seconds - 1)])
        .range([svgPadding, svgHeight - svgPadding]);

    let xScale = d3.scaleLinear()
        .domain([d3.min(dataset, (d) => d.Year - 1), d3.max(dataset, (d) => d.Year + 1)])
        .range([svgPadding, svgWidth - svgPadding]);

    //toolTip
    d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    function onMouseOver(mouse, data) {
        let tooltipDiv = d3.select("#tooltip")

        tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1);

        d3.select("#tooltip")
            .attr("data-year", mouse.x)
            .html(`
            <p>${data.Name}: ${data.Nationality}</p>
            <p>Year: ${data.Year}, Time: ${data.Time}</p>
            <p>${data.Doping}</p>
            `)
            .style("opacity", 1)
            .style("left", mouse.x - 160 + "px")
            .style("cursor", "pointer")
            .style("top", mouse.y - 130 + "px")
            .style("color", "#333333");
    }

    function onMouseOut() {
        d3.select("#tooltip").transition()
            .duration(500)
            .style("opacity", 0);
    }

    //circles / dots
    let circle = svg
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => d.Time)
        .attr("cx", (d) => xScale(d.Year))
        .attr("cy", (d) => yScale(d.Seconds))
        .attr("r", 5)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut);

    //axis
    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y"));
    let yAxis = d3.axisLeft().scale(yScale) //.tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g").attr("transform", `translate(${svgPadding}, 0)`).attr("id", "x-axis").call(yAxis);
    svg.append("g").attr("transform", `translate(0, ${svgHeight - svgPadding})`).attr("id", "y-axis").call(xAxis);
}