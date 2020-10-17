const drawChar = (dataSet) => {
    const svgHeight = 500;
    const svgWidth = 1000;
    const svgPadding = 50;

    //svg
    let svg = d3
        .select("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)

    //title
    svg.append("text")
        .attr("id", "title")
        .attr("x", svgWidth / 2 - svgPadding * 2)
        .attr("y", 100)
        .attr("font-size", 30)
        .attr("fill", "rgb(43, 193, 123)")
        .attr("font-weight", "bold")
        .text("United States GDP")

    let yScale = d3.scaleLinear().domain([0, d3.max(dataSet, (d) => d[1])]).range([svgPadding, svgHeight - svgPadding]);

    const rectWidth = (svgWidth - (svgPadding * 2)) / dataSet.length;

    let xScale = d3
        .scaleLinear()
        .domain([d3.min(dataSet, d => new Date(d[0]).getFullYear() + 1), d3.max(dataSet, d => new Date(d[0])).getFullYear() + 0.6])
        .range([0, svgWidth - svgPadding * 2]);

    //toolTip
    d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);
``
    function onMouseOver(d, data) {

        let tooltipDiv = d3.select("#tooltip")

        tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1);

        d3.select("#tooltip")
            .attr("data-date", data[0])
            .html(`<center><b>${data[0]}</b> <p>$${new Intl.NumberFormat().format(data[1])} Billion</p></center>`)
            .style("opacity", 1)
            .style("left", d.x - 60 + "px")
            .style("cursor", "pointer")
            .style("top", svgHeight - yScale(data[1]) + 20 + "px")
            .style("color", "#333333");
    }

    function onMouseOut(d) {
        d3.select("#tooltip").transition()
            .duration(500)
            .style("opacity", 0);
    }

    //generate rects
    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("fill", "#2d6a4f")
        .attr("y", (d) => svgHeight - yScale(d[1]))
        .attr("x", (_d, i) => rectWidth * i + svgPadding)
        .attr("height", 0)
        .attr("width", rectWidth)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .transition()
        .delay((_d, i) => { return i * 15 })
        .duration(1500)
        .attr("height", (d) => yScale(d[1]) - svgPadding);

    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y"));

    let yScaleToAxis = d3.scaleLinear().domain([0, d3.max(dataSet, (d) => d[1])]).range([svgHeight - svgPadding, svgPadding]);
    let yAxis = d3.axisLeft().scale(yScaleToAxis);

    //axis
    svg.append("g").attr("transform", `translate(${svgPadding}, 0)`).call(yAxis).attr("id", "y-axis");
    svg.append("g").attr("transform", `translate(${svgPadding}, ${svgHeight - svgPadding})`).call(xAxis).attr("id", "x-axis");

    //axis labels
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", '10px')
        .attr("x", svgWidth - 50)
        .attr("y", svgHeight - 10)
        .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("x", -150)
        .attr("y", 70)
        .text("Gross Domestic Product");
}

axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(response => {
    drawChar(response.data.data);
});