        function renderYAxes(newYScale, yAxis) {
            var leftAxis = d3.axisLeft(newYScale);
            yAxis.transition()
              .duration(1000)
              .call(leftAxis);
            return yAxis;
          }
        function clear(svgArea){
        if (!svgArea.empty()) {
          svgArea.remove();
                }
        }
        function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  
            circlesGroup.transition()
              .duration(1000)
              .attr("cx", d => newXScale(d[chosenXAxis]))
              .attr("cy", d => newYScale(d[chosenYAxis]));
            return circlesGroup;
          }
        function renderXAxes(newXScale, xAxis) {
            var bottomAxis = d3.axisBottom(newXScale);
            xAxis.transition()
              .duration(1000)
              .call(bottomAxis);
            return xAxis;
          }
        function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
        if (chosenXAxis === "poverty") {
          var xLabel = "Poverty (%)";
        }
        else if (chosenXAxis === "age") {
          var xLabel = "Age (Median)";
        }
        else {
          var xLabel = "Household Income (Median)";
        }
        if (chosenYAxis === "healthcare") {
          var yLabel = "Lacks Healthcare (%)";
        }
        else if (chosenYAxis === "obesity") {
          var yLabel = "Obese (%)";
        }
        else {
          var yLabel = "Smokes (%)";
        }
        var toolTip = d3.tip()
          .attr("class", "tooltip d3-tip")
          .offset([180, 90])
          .html(function(d) {
            return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
          });
        circlesGroup.call(toolTip);
        circlesGroup.on("mouseover", function(data) {
          toolTip.show(data, this);
        })
          .on("mouseout", function(data) {
            toolTip.hide(data);
          });
        textGroup.call(toolTip);
        textGroup.on("mouseover", function(data) {
          toolTip.show(data, this);
        })
          .on("mouseout", function(data) {
            toolTip.hide(data);
          });
        return circlesGroup;
      }
        function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  
            textGroup.transition()
              .duration(1000)
              .attr("x", d => newXScale(d[chosenXAxis]))
              .attr("y", d => newYScale(d[chosenYAxis]))
              .attr("text-anchor", "middle");
        
            return textGroup;
          }
