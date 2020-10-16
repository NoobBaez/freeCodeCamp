const drawChar = (dataSet) => {
    const svgHeight = 500;
    const svgWidth = 800;
    const svgPadding = 50;

    let svg = d3
        .select("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)

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
        .domain([d3.min(dataSet, d => new Date(d[0]).getFullYear()), d3.max(dataSet, d => new Date(d[0]).getFullYear())])
        .range([0, svgWidth - svgPadding * 2]);

    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .attr("y", (d) => svgHeight - yScale(d[1]))
        .attr("x", (_d, i) => rectWidth * i + svgPadding)
        .attr("height", (d) => yScale(d[1]) - svgPadding)
        .attr("width", rectWidth)
        .attr("fill", "#2d6a4f")

    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")).ticks(15);

    let yScaleToAxis = d3.scaleLinear().domain([0, d3.max(dataSet, (d) => d[1])]).range([svgHeight - svgPadding, svgPadding]);
    let yAxis = d3.axisLeft().scale(yScaleToAxis);

    svg.append("g").attr("transform", `translate(${svgPadding}, 0)`).call(yAxis).attr("id", "y-axis");
    svg.append("g").attr("transform", `translate(${svgPadding}, ${svgHeight - svgPadding})`).call(xAxis).attr("id", "x-axis");
}

axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(response => {
    drawChar(response.data.data);
});