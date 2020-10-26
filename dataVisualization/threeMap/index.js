let margin = 10;
let width = 1000;
let height = 600;

let body = d3.select("body");

//title
body.append("h1").text("Movie Sales").attr("id", "title");

//description
body.append("p").text("Top 100 Most Sold Movies Grouped by Category").attr("id", "description");

// add the SVG to the body element
let svg = body
    .append("svg")
    .attr("width", width + margin * 2)
    .attr("height", height + margin * 2)
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

// read the json data
d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json", (data) => {

    let root = d3.hierarchy(data).sum((d) => d.value)

    d3.treemap()
        .size([width, height])(root);

    //tooltip
    let toolTip = body
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    function onMouseOver(event) {
        toolTip
            .transition()
            .duration(200)
            .style("opacity", 0.8);

        toolTip
            .attr("data-value", event.data.value)
            .html(`
      <div>
         <p><b>Name:</b> ${event.data.name}</p>
         <p><b>Category:</b> ${event.data.category}</p>
         <p><b>Value:</b> ${Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(event.data.value)}</p>
      </div>
      `)
            .style("left", event.x1 + "px")
            .style("top", event.y1 + "px")
    };

    function onMouseOut() {
        toolTip
            .transition()
            .duration(500)
            .style("opacity", 0);
    };

    function color(category) {
        switch (category) {
            case "Action":
                return "#ffadad";
            case "Drama":
                return "#ffd6a5";
            case "Adventure":
                return "#fdffb6"
            case "Family":
                return "#caffbf";
            case "Animation":
                return "#9bf6ff";
            case "Comedy":
                return "#a0c4ff";
            case "Biography":
                return "#a0c4ff";
            default:
                return "#ffc6ff";
        }
    }

    svg.
        selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("class", "tile")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .attr("x", function (d) { return d.x0; })
        .attr("y", function (d) { return d.y0; })
        .attr("width", function (d) { return d.x1 - d.x0; })
        .attr("height", function (d) { return d.y1 - d.y0; })
        .style("stroke", "black")
        .style("fill", (d) => color(d.data.category));


    const LABEL = ["Action", "Drama", "Adventure", "Family", "Animation", "Comedy", "Biography"];

    svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function (d) { return d.x0 + 5 })    
        .attr("y", function (d) { return d.y0 + 20 })    
        .text(function (d) { return d.data.name })
        .attr("font-size", "6px")
        .attr("fill", "black");

    let svgLabel = body
        .append("svg")
        .attr("id", "legend")
        .attr("width", 300)
        .attr("height", 450)

    svgLabel
        .selectAll("rect")
        .data(LABEL)
        .enter()
        .append("rect")
        .attr("width", 25)
        .attr("height", 25)
        .attr("y", (_d, i) => i * 30)
        .style("fill", (d) => color(d))
        .attr("class", "legend-item");

    svgLabel.selectAll("mylabels")
        .data(LABEL)
        .enter()
        .append("text")
        .attr("x", 35)
        .attr("y", function (d, i) { return 15 + i * 30 })
        .text(function (d) { return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

});

