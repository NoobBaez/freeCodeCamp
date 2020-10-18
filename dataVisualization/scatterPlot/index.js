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
    body.append("h1").attr("id", "title").text("Doping in Professional Bicycle Racing");
    //add subtitle
    body.append("p").attr("id", "legend").text("35 Fastest times up Alpe d'Huez")

    let svg = body
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .attr("class", "graph-svg-component");

    //scale
    let yScale = d3.scaleLinear()
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
            .attr("data-year", data.Year)
            .html(`
            <p>${data.Name}: ${data.Nationality}</p>
            <p>Year: ${data.Year}, Time: ${d3.timeFormat("%M:%S")(data.Time)}</p>
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

    //axis
    let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y"));
    let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.timeFormat("%M:%S"))

    dataset.forEach(d => {
        var parsedTime = d.Time.split(':');
        d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
    });

    yScale.domain(d3.extent(dataset, (d) => d.Time));

    //label
    const labelData = ["No doping allegations", "Riders with doping allegations"];
    svg.selectAll("rect")
        .data(labelData)
        .enter()
        .append("rect")
        .attr("x", svgWidth / 2 + 250 + "px")
        .attr("y", (_d, i) => i * 25 + svgHeight / 2.5 + "px")
        .attr("width", "15")
        .attr("height", "15")
        .style("stroke", "black")
        .attr("fill", (d) => {
            if (!d.includes("No")) {
                return "#2ec4b6";
            } else {
                return "#ff9f1c";
            }
        });

    svg.selectAll("label")
        .append("div")
        .attr("id", "label")
        .data(labelData)
        .enter()
        .append("text")
        .attr("x", (d) => svgWidth / 2 + 270 + "px")
        .attr("y", (_d, i) => i * 25 + svgHeight / 2.4 + "px")
        .text((d) => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");

    //circles / dots
    svg
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => d.Time.toISOString())
        .attr("cx", (d) => xScale(d.Year))
        .attr("cy", (d) => yScale(d.Time))
        .attr("r", 0)
        .attr("fill", (d) => {
            if (d.Doping) {
                return "#2ec4b6";
            } else {
                return "#ff9f1c";
            }
        })
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .transition()
        .ease(d3.easeElastic)
        .delay((_d, i) => { return i * 65 })
        .duration(250)
        .attr("r", 7);

    svg.append("g").attr("transform", `translate(${svgPadding}, 0)`).attr("id", "y-axis").call(yAxis);
    svg.append("g").attr("transform", `translate(0, ${svgHeight - svgPadding})`).attr("id", "x-axis").call(xAxis);

}