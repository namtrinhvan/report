import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import styles from './GenericPieChart.module.scss'; // Import CSS Module

/**
 * GenericPieChart
 * - Tự động sinh value ngẫu nhiên dựa trên labels.
 * - Hỗ trợ chuyển đổi giữa Pie và Donut.
 * - Style đã được externalize sang .module.scss.
 */
const GenericPieChart = ({
                             labels,
                             title = '',
                             isDonut = false, // True: Biểu đồ vành khuyên, False: Tròn đặc
                             colors = [
                                 '#5470C6', '#91CC75', '#FAC858', '#EE6666',
                                 '#73C0DE', '#3BA272', '#FC8452', '#9A60B4'
                             ],
                             height = '400px',
                             children,
                         }) => {

    // 1. Logic sinh dữ liệu Random
    const chartData = useMemo(() => {
        return labels.map((label) => ({
            name: label,
            // Random giá trị từ 10 đến 100
            value: Math.floor(Math.random() * 91) + 10,
        }));
    }, [labels]);

    // 2. Cấu hình ECharts Option
    const option = useMemo(() => {
        return {
            color: colors,

            title: {
                text: title,
                left: 'center',
                top: 0,
                textStyle: {
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    color: '#1F2937',
                },
            },

            tooltip: {
                trigger: 'item',
                formatter: '{b}: <b>{c}</b> ({d}%)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                textStyle: { color: '#374151' },
            },

            legend: {
                bottom: '0%',
                left: 'center',
                type: 'scroll',
                icon: 'circle',
                itemGap: 15,
                textStyle: { color: '#666' },
            },

            series: [
                {
                    name: 'Distribution',
                    type: 'pie',
                    radius: isDonut ? ['40%', '65%'] : '65%',
                    center: ['50%', '55%'],

                    data: chartData,

                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },

                    label: {
                        show: true,
                        formatter: '{b}\n{d}%',
                        color: '#4B5563',
                        fontSize: 12,
                    },

                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 10,
                        smooth: true,
                    },

                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 14,
                            fontWeight: 'bold',
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                        },
                    },
                },
            ],
        };
    }, [chartData, title, isDonut, colors]);

    return (
        <div className={styles.wrapper}>
            {/* Khu vực Controls */}
            {children && (
                <div className={styles.controls}>
                    {children}
                </div>
            )}

            {/* Khu vực Biểu đồ */}
            <div
                className={styles.chartContainer}
                style={{ height: height }} // Height dynamic vẫn dùng inline style
            >
                <ReactECharts
                    option={option}
                    className={styles.echartsInstance}
                    style={{ height: '100%', width: '100%' }}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        </div>
    );
};

GenericPieChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    isDonut: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.string,
    children: PropTypes.node,
};

export default GenericPieChart;