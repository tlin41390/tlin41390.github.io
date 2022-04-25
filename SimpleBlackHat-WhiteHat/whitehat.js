function main() {
    var canvasWidth = 700;
    var canvasHeight = 700;
    var margin = 200;

    var svg = d3.select("#whitehat").append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)

    var width = svg.attr("width") - margin;
    var height = svg.attr("height") - margin;


    //add the text to the canvas for the title

    svg.append("text")
        .attr("transform", "translate(100, 0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "20px")
        .attr("font-family", "sans-serif")
        .text("Total Number of Delays in U.S Airports in 2016")

    var xScale = d3.scaleBand().range([0, width]).padding(0.3);
    var yScale = d3.scaleLinear().range([height, 0]);

    var container_g = svg.append("g")
        .attr("transform",
            "translate(100,100)");

    d3.csv("airlines.csv").then(data => {

        xScale.domain(data.map(function (d) {
            return d.Code;
        }));
        yScale.domain([0, 4000]);

        // Draw bars!
        container_g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xScale(d.Code); })
            .attr("y", function (d) { return yScale(+d.Delays); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(+d.Delays); })
            .attr("fill", "steelblue")

            container_g
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('font-family', 'sans-serif')
        .text(function (d) {
          return d.Delays;
        })
        .attr('y', function (d) {
          return yScale(d.Delays)-5;
        })
        .attr('x', function (d) {
            return xScale(d.Code)+20;
             });

        // Display the X-axis
        container_g.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 450)
            .attr("x", width - 250)
            .attr("font-size", "30px")
            .attr("stroke", "black")
            .attr("font-family", "sans-serif")
            .text("Airports");

        // Display the Y-axis
        container_g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d
            }).ticks(10))
            .append("text")
            .attr("font-size", "20px")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -190)
            .attr("dy", "-4.1em")
            .attr("stroke", "black")
            .text("Delays");
    })
}
main();