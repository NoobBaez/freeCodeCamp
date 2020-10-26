const COUNTY = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const EDUCATION = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

axios.get(COUNTY)
    .then(response => {
        const counti = response.data;
        return axios.get(EDUCATION).then(response => {
            drawMap({ usa: counti, edu: response.data });
        });
    });

function drawMap({ usa, edu }) {

    const counties = topojson.feature(usa, usa.objects.counties).features;
    const states = topojson.feature(usa, usa.objects.states).features;

    const width = 1050;
    const height = 700;

    let path = d3.geoPath()

    let body = d3.select("body");

    //title
    body.append("h1").text("United States Educational Attainment 👩‍🎓🧑‍🎓").attr("id", "title");
    //description
    body.append("p").text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)").attr("id", "description");

    //legen
    const wL = 630;
    const hL = 28;
    const paddingL = 5;

    const legendData = [8, 16, 24, 32, 40, 48, 62, 70, 78];
    let svgLegend = body.append("svg").attr("width", wL).attr("height", hL);

    var setColor = d3.scaleLinear().domain([2.6, 75.5]).range(["white", "blue"]);

    svgLegend
        .append("g")
        .attr("id", "legend")
        .selectAll("rect")
        .data(legendData)
        .enter()
        .append("rect")
        .attr("width", 60)
        .attr("height", 8)
        .attr("x", (_d, i) => i * 60 + 10)
        .attr("fill", (d) => setColor(d))

    let xScale = d3.scaleLinear().range([10, 60 * 9]).domain([3, 66]);

    let xAxis = d3.axisBottom(xScale)
        .tickSize(16)
        .tickValues([3, 12, 21, 30, 39, 48, 57, 66])
        .tickFormat(x => `${x}%`);

    svgLegend.append("g")
        .call(xAxis).select(".domain").remove();

    //tooltip
    let toolTip = body
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", 0);

    function onMouseOver(mouse, data) {
        toolTip
            .transition()
            .duration(200)
            .style("opacity", 0.8);

        const result = edu.find(e => e.fips === data.id);

        toolTip
            .attr("data-education", result.bachelorsOrHigher)
            .html(`
      <div>
         <p>${result.area_name}, ${result.state}: ${result.bachelorsOrHigher}%</p>
      </div>
      `)
            .style("left", mouse.x + "px")
            .style("top", mouse.y + 20 + "px")
    };

    function onMouseOut() {
        toolTip
            .transition()
            .duration(500)
            .style("opacity", 0);
    };

    //map
    let svg = body.append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .selectAll("path")
        .data(counties)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", path)
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("data-fips", (d) => {
            const result = edu.find((e) => {
                return e.fips === d.id;
            });
            return result.fips;
        })
        .attr("data-education", (d) => {
            const result = edu.find((e) => {
                return e.fips === d.id;
            });
            return result.bachelorsOrHigher;
        })
        .attr("fill", (d) => {
            //console.log(d);
            const result = edu.filter(obj => obj.fips === d.id);
            return setColor(result[0].bachelorsOrHigher);
        });

    states
    svg.append("g")
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "white")
        .style("fill", "none")
        .style("strokeLinejoin", "round")
};


