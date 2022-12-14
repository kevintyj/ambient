import * as d3 from "d3"
import { Component, createEffect, createSignal } from "solid-js";
import { resolveConfig } from "vite";
import colors from 'tailwindcss/colors'
import { colorsArr } from "../../assets/color";
import chroma from "chroma-js";
import { darkMode } from "../shared/darkModeToggle";

type ILineChartProps<T = {}> = Component<T &{
  data?: any;
}>

const LineChart: ILineChartProps = (props) => {

  const dataVal = 'light'

  const data = colorsArr()[1].map((val, i) => {
    const lch = chroma(val).lch();
    return {'light': lch[0], 'chroma': lch[1], 'hue': lch[2], 'hex': val, 'index': i}
  })

  const heightValue = 300;
  const widthValue = 600;

  createEffect(() => {
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("viewBox", `-8 -8 ${widthValue} ${heightValue}`);
    const [svgRef, setSvgRef] = createSignal(null);
    const strokeWidth = 7;
    const margin = { top: 0, bottom: -22, left: 0, right: 0 };
    const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
    const width = 600 - margin.left - margin.right - (strokeWidth * 4);
    const height = 300 - margin.top - margin.bottom;
    const grp = chart
      .append("g")
      .attr("style", "outline: thin solid transparent;");

    // Create scales
    const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([-10, 100]);
    const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, d => d.index));

    const line = d3
    .line().curve(d3.curveNatural)
    .x(d => xScale(d.index))
    .y(d => yScale(d[dataVal]));
    
    var newline = d3.line()
    .curve(d3.curveNatural)
    .defined(d => !isNaN(d.index))
    .x(d => xScale(d.index))
    .y(d => yScale(d[dataVal]));

    var gradientColor = (d) => {
      console.log(d)
      return d3.interpolateHslLong("red", "blue")((d.index + 1)/10);
    };

    // Set the gradient
    svg.append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0)
    .selectAll("stop")
      .data(data.map((val) => {
        return {offset: val.index*10 + "%", color: val.hex}
      }))
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

    // Add line
    grp
    .datum(data)
    .append("path")
    .style("fill", "none")
    .attr("stroke", "url(#line-gradient)")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", strokeWidth)
    .attr("d", d => {return line(d)});

    // Add the circles
    grp.selectAll("color values")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(d.index))
      .attr("cy", d => yScale(d[dataVal]))
      .attr("style", d => {return `fill: none; stroke: ${darkMode() ?'#404040' : '#e5e5e5'}; stroke-width:4px`})
      .attr("r", strokeWidth - 1)

    // Add the circles
    grp.selectAll("color values")
    .data(data)
    .join("circle")
      .attr("cx", d => xScale(d.index))
      .attr("cy", d => yScale(d[dataVal]))
      .attr("style", d => {return `fill: ${d.hex}; stroke: ${darkMode() ?'#262626' : '#f5f5f5'}; stroke-width:2px`})
      .attr("r", strokeWidth - 1)
  })

  return (
    <div id="chart" class="bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 border"></div>
  )
}

export default LineChart;