axios.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(response => {
    createHeatMap(response.data);
});

function createHeatMap(data) {
    const dataset = data.monthlyVariance;

    const svgWidth = 1800;
    const svgHeight = svgWidth / 3;
    const svgPadding = {
        left: svgHeight * 0.2,
        bottom: svgHeight * 0.3
    };

    const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const COLOR_TEMP = [
        {
            color: "rgb(215, 48, 39)",
            temp: 12.8
        },
        {
            color: "rgb(244, 109, 67)",
            temp: 11.7
        },
        {
            color: "rgb(253, 174, 97)",
            temp: 10.6
        },
        {
            color: "rgb(254, 224, 144)",
            temp: 9.5
        },
        {
            color: "rgb(255, 255, 191)",
            temp: 8.3
        },
        {
            color: "rgb(224, 243, 248)",
            temp: 7.2
        },
        {
            color: "rgb(171, 217, 233)",
            temp: 6.1
        },
        {
            color: "rgb(116, 173, 209)",
            temp: 5.0
        },
        {
            color: "rgb(69, 117, 180)",
            temp: 3.9
        },
        {
            color: "#0077b6",
            temp: 2.8
        }
    ];

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
        .attr("id", "heatMap")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    //scale
    const minYear = d3.min(dataset, (d) => d.year);
    const maxYear = d3.max(dataset, (d) => d.year);
    let xScale = d3.scaleLinear().domain([minYear, maxYear]).range([svgPadding.left, svgWidth]);

    let yScale = d3.scaleBand()
        .domain(MONTH)
        .range([0, svgHeight - svgPadding.bottom]);

    const rectHeight = (svgHeight - svgPadding.bottom) / 12;
    const rectWidth = (svgWidth - svgPadding.left) / dataset.length * 12;

    //tooltip
    let toolTip = body
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    function onMouseOver(mouse, data) {
        toolTip
            .attr("data-year", data.year)
            .transition()
            .duration(200)
            .style("opacity", 0.8);


        function precission(x) {
            return Number.parseFloat(x).toPrecision(2);
        };

        toolTip
            .html(`
        <div>
            <p>${data.year} - ${MONTH[data.month - 1]}</p>
            <p>${precission(data.variance + 8.66)}℃</p>
            <p>${precission(data.variance)}℃</p>
        </div>
        `)
            .style("left", mouse.x + "px")
            .style("top", mouse.y + "px")
    };

    function onMouseOut() {
        toolTip
            .transition()
            .duration(500)
            .style("opacity", 0);
    };

    //rects
    svg
        .selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => d.variance)
        .attr("y", (d) => {
            if (d.month === 1) return 0;
            return (d.month - 1) * rectHeight + "px";
        })
        .attr("x", (d) => Math.floor(xScale(d.year)) - 1 + "px")
        .attr("height", rectHeight)
        .attr("width", rectWidth)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("fill", "transparent")
        .transition()
        .ease(d3.easeElastic)
        .duration(600)
        .delay((_d, i) => i * 0.5)
        .attr("fill", (d) => {
            const tem = d.variance + data.baseTemperature;

            if (tem >= 11.7) {
                return COLOR_TEMP[0].color;
            } else if (tem < 11.7 && tem >= 10.6) {
                return COLOR_TEMP[1].color;;
            } else if (tem < 10.6 && tem >= 9.5) {
                return COLOR_TEMP[2].color;;
            } else if (tem < 9.5 && tem >= 8.3) {
                return COLOR_TEMP[3].color;;
            } else if (tem < 8.3 && tem >= 7.2) {
                return COLOR_TEMP[4].color;;
            } else if (tem < 7.2 && tem >= 6.1) {
                return COLOR_TEMP[5].color;;
            } else if (tem < 6.1 && tem >= 5.1) {
                return COLOR_TEMP[6].color;;
            } else if (tem < 5.0 && tem >= 3.9) {
                return COLOR_TEMP[7].color;;
            } else if (tem < 3.9 && tem >= 2.8) {
                return COLOR_TEMP[8].color;;
            } else {
                return COLOR_TEMP[9].color;;
            };
        });

    //axis
    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("Y")).ticks(20);
    svg.append("g").attr("transform", `translate(0, ${svgHeight - svgPadding.bottom})`).attr("id", "x-axis").call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(${svgPadding.left - 3}, 0)`).attr("id", "y-axis").call(yAxis);

    //legeng
    const legenHeight = 50;
    const legenWidth = legenHeight * 11;
    const paddingBottom = legenHeight * 0.35;

    let legenXScale = d3.scaleBand().domain([2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8]).range([0, legenWidth]);

    let legend = svg
        .append("svg")
        .attr("id", "legend")
        .attr("height", legenHeight)
        .attr("width", 50 * 11)
        .attr("x", svgPadding.left)
        .attr("y", 500)
        .attr("fill", "red")

    legend
        .selectAll("rect")
        .data(COLOR_TEMP.reverse())
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 55 + 27)
        .attr("y", 0)
        .attr("height", legenHeight - paddingBottom)
        .attr("width", 56)
        .attr("fill", (d) => d.color)

    const legenAxisX = d3.axisBottom(legenXScale).tickSize(-legenHeight).tickFormat(d3.format('.1f'));

    legend.append("g").attr("transform", `translate(-1, ${legenHeight - paddingBottom})`).attr("id", "legend").call(legenAxisX);

}