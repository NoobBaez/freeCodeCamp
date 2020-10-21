axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(response => {
    createHeatMap(response.data);
});

function createHeatMap(data) {
    const dataset = data.monthlyVariance;

    const svgWidth = 1300;
    const svgHeight = svgWidth / 3;
    const svgPadding = {
        left: svgHeight * 0.1,
        bottom: svgHeight * 0.1
    };

    let body = d3.select("body");

    //title
    body.append("h1")
        .attr("id", "title")
        .text("Monthly Global Land-Surface Temperature");

    //description
    body.append("p")
        .attr("id", "description")
        .text("1753 - 2015: base temperature 8.66℃");

    //svg
    let svg = body
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    //scale
    const minYear = d3.min(dataset, (d) => d.year + 1);
    const maxYear = d3.max(dataset, (d) => d.year);
    let xScale = d3.scaleLinear().domain([minYear, maxYear]).range([svgPadding.left, svgWidth]);

    let yScale = d3.scaleBand()
        .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
        .range([0, svgHeight - svgPadding.bottom]);

    const rectHeight = (svgHeight - svgPadding.bottom) / 12;
    const rectWidth = (svgWidth - svgPadding.left) / dataset.length * 12;

    let rects = svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => d.variance)
        .attr("y", (d) => {
            if (d.month === 1) return 0;
            return (d.month - 1) * rectHeight + "px";
        })
        .attr("x", (d) => Math.floor(xScale(d.year)) + 3 + "px")
        .attr("height", rectHeight)
        .attr("width", rectWidth)
        .attr("fill", (d) => {
            const tem = d.variance + data.baseTemperature;

            if (tem > 11.7) {
                return "#e70e02";
            } else if (tem <= 11.7 && tem > 10.6) {
                return "#f42b03";
            } else if (tem <= 10.6 && tem > 9.5) {
                return "#ec7505";
            } else if (tem <= 9.5 && tem > 8.3) {
                return "#ffdc5e";
            } else if (tem <= 8.3 && tem > 7.2) {
                return "#ade8f4";
            } else if (tem <= 7.2 && tem > 6.1) {
                return "#90e0ef";
            } else if (tem <= 6.1 && tem > 5.1) {
                return "#48cae4";
            } else if (tem <= 5.0 && tem > 3.9) {
                return "#00b4d8";
            } else if (tem <= 3.9 && tem > 2.8) {
                return "#0096c7";
            } else {
                return "#0077b6";
            };
        })
        .attr("opacity", 0.8);

    //axis
    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y"));
    svg.append("g").attr("transform", `translate(0, ${svgHeight - svgPadding.bottom})`).attr("id", "x-axis").call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(${svgPadding.left - 3}, 0)`).attr("id", "y-axis").call(yAxis);

}