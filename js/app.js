function load2dVisual() {
  d3.json('../queries/queries.json', function(error, data) {
    var qid = $('#2DqidNumber>option:selected').text()
      data = data["queries"][qid].output["cooccurrence"];
      var cells, colorScale, colors, corXscale, corYscale, corZscale, corr, corrplot, drawScatter, h, i, innerPad, j, nGroup, nind, nvar, pad, scatterplot, svg, totalh, totalw, w;
      h = 550;
      w = h;
      pad = {
          left: 20,
          top: 5,
          right: 5,
          bottom: 70
      };
      innerPad = 5;
      totalh = h + pad.top + pad.bottom;
      totalw = (w + pad.left + pad.right) * 2;
      // remove previous content
      d3.select("svg").remove();
      //add an svg to the div
      svg = d3.select("#heatmap").append("svg").attr("height", totalh).attr("width", totalw);
      //add one group for correlation matrix
      corrplot = svg.append("g").attr("id", "corrplot").attr("transform", "translate(" + pad.left + "," + pad.top + ")");
      //add another group for scatter plot
      scatterplot = svg.append("g").attr("id", "scatterplot").attr("transform", "translate(" + (pad.left * 2 + pad.right + w) + "," + pad.top + ")");
      nind = data.length;
      nvar = data[0].length;

      corXscale = d3.scale.ordinal().domain(d3.range(nvar)).rangeBands([0, w]);
      corYscale = d3.scale.ordinal().domain(d3.range(nvar)).rangeBands([h, 0]);
      corZscale = d3.scale.linear().domain([0, 1]).range([0, 1]);

      corr = [];
      var pixelvalues = [];
      var index = 0;

      for (i in data) {
          for (j in data[i]) {
              pixelvalues[index] = data[i][j];
              index++;
              corr.push({
                  row: i,
                  col: j,
                  value: data[i][j]
              });
          }
      }

      ///////////Heatmap Colors /////////////////////////////////////////////////////////
      /*var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
                     "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
                     "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"]; */
      var colours = ["#FFFFCC", "#FFFF99", "#FFFF66", "#FFFF33", "#FFFF00", "#FFE066",
          "#FFCC00", "#FFCC66", "#FF9900", "#FF9933", "#FF9966",
          "#FF6600", "#FF3300", "#CC3300"
      ]; 

      var heatmapColour = d3.scale.linear()
          .domain(d3.range(0, 1, 1.0 / (colours.length -1)))
          .range(colours);
      //var c = d3.scale.linear().domain(d3.extent(pixelvalues)).range([0,1]);
      var c = d3.scale.linear().domain(d3.extent([0, 1])).range([0, 1]);
      ///////////////////////////////////////////////////////////////////////////////////

      cells = corrplot.selectAll("empty").data(corr).enter().append("rect").attr("class", "cell").attr("x", function(d) {
          return corXscale(d.col);
      }).attr("y", function(d) {
          return corYscale(d.row);
      }).attr("width", corXscale.rangeBand()).attr("height", corYscale.rangeBand()).attr("fill", function(d) {
          return heatmapColour(c(d.value)); //instead of corZscale(d.value)
      }).attr("stroke", "none").attr("stroke-width", 1).on("mouseover", function(d) {
          d3.select(this).attr("stroke", "black");
          corrplot.append("text").attr("id", "corrtext").text(d3.format(".3f")(d.value)).attr("x", function() {
              var mult;
              mult = -1;
              if (d.col < nvar / 2) {
                  mult = +1;
              }
              return corXscale(d.col) + corXscale.rangeBand();
              //return corXscale(d.col) + mult * corXscale.rangeBand() * 5;
          }).attr("y", function() {
              var mult;
              mult = +1;
              if (d.row < nvar / 2) {
                  mult = -1;
              }
              return corYscale(d.row) + 0.5 * corYscale.rangeBand();
              //return corYscale(d.row) + (mult + 0.5) * corYscale.rangeBand() * 2;
          }).attr("fill", "black").attr("dominant-baseline", "middle").attr("text-anchor", "middle").style("font-weight", "bold");
          corrplot.append("text").attr("class", "corrlabel").attr("x", corXscale(d.col)+12).attr("y", h + pad.bottom * 0.2).text(d.col).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("font-size", "13px");
          return corrplot.append("text").attr("class", "corrlabel").attr("y", corYscale(d.row)+12).attr("x", -pad.left * 0.7).text(d.row).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("font-size", "13px");
      }).on("mouseout", function() {
          d3.selectAll("text.corrlabel").remove();
          d3.selectAll("text#corrtext").remove();
          return d3.select(this).attr("stroke", "none");
      });

      corrplot.append("rect").attr("height", h).attr("width", w).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1).attr("pointer-events", "none");
      return d3.select("#legend").style("opacity", 1);
  });
}