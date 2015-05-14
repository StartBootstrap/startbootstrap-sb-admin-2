function seChart(){
var margin = {top: 1, left: 5, bottom: 5, right: 5}
  , width = parseInt(d3.select('.bubbleChart').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .5
  , height = width * mapRatio;

	var bubbleChart = new d3.svg.BubbleChart({
		supportResponsive: true,
    size: 900,
    innerRadius: 600 / 3,
    radiusMin: 30,

    data: {
      items: values,
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [{
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "19px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
            },
            attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
            }
        },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "16px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
            },
            attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
            }
        }
        ],
        centralFormat: [
            {// Line #0
              style: {"font-size": "60px"},
              attr: {}
          },
            {// Line #1
              style: {"font-size": "40px"},
              attr: {dy: "40px"}
          }
          ]
      }
  }]
});
}

$(document).ready(function () {
    seChart();

});