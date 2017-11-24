import React, { Component } from 'react';
import * as d3 from 'd3';
import './Histogram.scss';

export default class Histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,6,4,3,3,8,5,4,3,7],
    }
  }
  componentDidMount() {
    const bar_height = 50;
    const bar_padding = 10;
    const height = (bar_height + bar_padding) * this.state.data.length;
    const width = 600;
    // 定义范围映射函数
    const scale = d3.scaleLinear()
      .domain([0, d3.max(this.state.data)+1])
      .range([0, width]);
    // 创建svg
    const svg = d3.select('#container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'rotate(-90)');
    // 创建多个柱子，将柱子的y位置摆好
    const bar = svg.selectAll('g')
      .data(this.state.data)
      .enter()
      .append('g') // 将数据跟g元素关联起来，如果数量不对就补齐
      .attr('transform', (d, i) => `translate(0, ${i * (bar_height + bar_padding)})`)
    // 绘制矩形
    bar.append('rect')
      .attr('width', d => scale(d)) // 设置宽度，宽度是需要经过缩放函数的
      .attr('height', bar_height)
      .style('fill', '#cfc')
    // 添加文字
    bar.append('text')
      .text(d => d)
      .attr('x', d => scale(d + 0.1)) // 让文字高于柱子多一点点
      .attr('y', bar_height / 2)
      // .attr('transform', 'rotate(90)');
  }
  render() {
    return (
      <div id="container" styleName="container">
      </div>
    );
  }
}