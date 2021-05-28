
function makeResponsive() {

    var svgArea = d3.select("body").select("svg");
  
    clear(svgArea)

    var svgWidth = 980;
    var svgHeight = 600;
  
    var margin = {
      top: 20,
      right: 40,
      bottom: 90,
      left: 100
    };
  
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
  
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";
  

    function xScale(acsData, chosenXAxis) {
      var xLinearScale = d3.scaleLinear()
        .domain([d3.min(acsData, d => d[chosenXAxis]) * 0.8,
          d3.max(acsData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
      return xLinearScale;
    }

    function yScale(acsData, chosenYAxis) {
      var yLinearScale = d3.scaleLinear()
        .domain([d3.min(acsData, d => d[chosenYAxis]) * 0.8,
          d3.max(acsData, d => d[chosenYAxis]) * 1.2
        ])
        .range([height, 0]);
      return yLinearScale;
    }

    d3.csv("assets/data/data.csv")
      .then(function(acsData) {

      acsData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
      });
  
      var xLinearScale = xScale(acsData, chosenXAxis);
      var yLinearScale = yScale(acsData, chosenYAxis);
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

      var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

     // console.log(acsData)
      var circlesGroup = chartGroup.selectAll(".stateCircle")
        .data(acsData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("class", "stateCircle")
        .attr("r", 25)
        .style("fill", "#69b3a2")
        .attr("opacity", ".75");

      var textGroup = chartGroup.selectAll(".stateText")
        .data(acsData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]*.98))
        .text(d => (d.abbr))
        .attr("class", "stateText")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .style("fill", "#000000");

      var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

      var povertyLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") 
        .classed("inactive", true)
        .text("Poverty (%)");
  
      var ageLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age")
        .classed("inactive", true)
        .text("Age (Median)");
  
      var incomeLabel = xLabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Household Income (Median)");
  
      var yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(-25, ${height / 2})`);

      var healthcareLabel = yLabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("x", 0)
        .attr("value", "healthcare")
        .attr("dy", "1em")
        .classed("axis-text", true)
        .classed("inactive", true)
        .text("Lacks Healthcare (%)");
  
      var smokesLabel = yLabelsGroup.append("text") 
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", 0)
        .attr("value", "smokes")
        .attr("dy", "1em")
        .classed("axis-text", true)
        .classed("inactive", true)
        .text("Smokes (%)");
  
      var obesityLabel = yLabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -70)
        .attr("x", 0)
        .attr("value", "obesity")
        .attr("dy", "1em")
        .classed("axis-text", true)
        .classed("inactive", true)
        .text("Obese (%)");
  
      var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

      xLabelsGroup.selectAll("text")
        .on("click", function() {
          var value = d3.select(this).attr("value");
          if (value !== chosenXAxis) {
            chosenXAxis = value;
            xLinearScale = xScale(acsData, chosenXAxis);
            xAxis = renderXAxes(xLinearScale, xAxis);
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
            textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

          }
        });
      
      yLabelsGroup.selectAll("text")
        .on("click", function() {
          var value = d3.select(this).attr("value");
          if (value !== chosenYAxis) {
            chosenYAxis = value;
            yLinearScale = yScale(acsData, chosenYAxis);
            yAxis = renderYAxes(yLinearScale, yAxis);
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
            textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
            circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

 
          }
        });
    });
  }
  makeResponsive();
  
  d3.select(window).on("resize", makeResponsive);