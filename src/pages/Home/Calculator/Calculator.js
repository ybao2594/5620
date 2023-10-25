import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const Calculator = () => {
  const data = [
    {
      type: '1月',
      sales: 38,
    },
    {
      type: '2月',
      sales: 52,
    },
    {
      type: '3月',
      sales: 61,
    },
    {
      type: '4月',
      sales: 145,
    },
    {
      type: '5月',
      sales: 48,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '月份',
      },
      sales: {
        alias: '度',
      },
    },
  };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', marginTop: '100px' }}>
            <Column {...config} />
        </div>
    )
};


export default Calculator;

