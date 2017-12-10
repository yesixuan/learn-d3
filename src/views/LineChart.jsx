import React, { Component } from 'react';
import * as d3 from 'd3';
import './LineChart.scss';

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [12, 3, 52, 7, 84, 4, 93, 7],
    }
    this.area = {
      width: 500,
      height: 250,
      margin: { left: 50, top: 30, right: 20, bottom: 20 },
    }
  }
  componentDidMount() {
    const g_width = this.area.width - this.area.margin.left - this.area.margin.right;
    const g_height = this.area.height - this.area.margin.top - this.area.margin.bottom;
    // 在容器中创建svg，设置svg的属性
    const svg = d3.select('#container').append('svg').attr('width', this.area.width).attr('height', this.area.height);
    // 在svg中创建g，设置偏移量
    const g = d3.select('svg').append('g').attr('transform', `translate(${this.area.margin.left}, ${this.area.margin.right})`);
    // 创建data到画布的映射（得到一个函数，将数据传入该函数就能拿到该数据的位置）
    const scale_x = d3.scaleLinear().domain([0, this.state.data.length - 1]).range([0, g_width]);
    const scale_y = d3.scaleLinear().domain([0, d3.max(this.state.data)]).range([g_height, 0]); // 这里的range顺序要注意

    // 画线函数，将数据传入生成线条（这里也是得到一个函数）
    const line_generator2 = d3.line()
      .x((d, i) => scale_x(i))
      .y(d => scale_y(d+30)) // 为让整个曲线往上偏移30数值
      .curve(d3.curveCardinal);

    //定义一个线性渐变
    var defs = svg.append("defs");
    var linearGradient = defs.append("linearGradient")
      .attr("id", "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    var stop1 = linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", '#f00');
    var stop2 = linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", '#0f0');

    /**
     * 如果想要由折线图变为面积图
     */
    const line_generator = d3.area()
      .x((d, i) => scale_x(i))
      .y0(g_height)
      .y1(d => scale_y(d+30)) // 为让整个曲线往上偏移30数值
      .curve(d3.curveCardinal);

    // 画线
    g.append('path').attr('d', line_generator(this.state.data))
      .style("fill","url(#" + linearGradient.attr("id") + ")");
    // 第二条线要有线宽
    g.append('path').attr('d', line_generator2(this.state.data))
      .style('stroke-width', '1');

    // 定义轴函数
    /* const x_axis = d3.axisBottom(scale_x);
    const y_axis = d3.axisLeft(scale_y); */

    // 画轴
    /* g.append('g').call(x_axis).attr('transform', `translate(0, ${g_height})`);
    g.append('g').call(y_axis).append('text').text('price($)').attr('transform', 'rotate(-90)').attr('text-anchor', 'end').attr('dy', '2em'); */

  }
  render() {
    return (
      <div id="container" styleName="container">

      </div>
    );
  }
}

