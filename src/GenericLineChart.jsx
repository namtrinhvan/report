import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts'; // Import để dùng hàm graphic linear gradient nếu cần
import styles from './GenericBarChart.module.scss'; // Giữ nguyên file style của bạn

const GenericLineChart = ({
                              labels = [],
                              data = [], // Array of objects: { name, values, color, area? }
                              height = '350px',
                              title = '',
                              yMin = 0,
                              yMax = null, // Để null để Echarts tự tính toán max phù hợp
                              smooth = false, // True: đường cong mềm, False: đường gấp khúc
                              showLegend = true,
                              showSymbol = true, // Hiển thị các chấm tròn trên đường
                              yAxisName = '', // Đơn vị tính (vd: "Triệu đồng", "%")
                          }) => {

    const option = useMemo(() => {
        // 1. Xử lý series data từ props đầu vào
        const chartSeries = data.map((item) => {
            const seriesColor = item.color || '#3B82F6'; // Mặc định màu xanh nếu không truyền

            return {
                name: item.name,
                data: item.values,
                type: 'line',
                smooth: false, // Props làm mềm đường
                showSymbol: showSymbol,
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    color: seriesColor,
                    borderWidth: 2,
                    borderColor: '#fff'
                },
                lineStyle: {
                    width: 2,
                    shadowColor: 'rgba(0,0,0,0.1)',
                    shadowBlur: 10
                },
                // Cấu hình vùng phủ màu (Gradient) bên dưới đường
                areaStyle: item.area ? {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: seriesColor },       // Đậm ở trên
                        { offset: 1, color: 'rgba(255,255,255,0)' } // Trong suốt ở dưới
                    ]),
                    opacity: 0.25
                } : undefined // Nếu không set area=true thì không hiện
            };
        });

        // 2. Cấu hình biểu đồ hoàn chỉnh
        return {
            title: {
                show: false // Ẩn title mặc định của Echarts để dùng thẻ HTML bên ngoài
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                textStyle: {
                    color: '#374151',
                    fontSize: 12
                },
                padding: [10, 12],
                extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 8px;'
            },
            legend: {
                show: showLegend,
                bottom: '0%',
                icon: 'roundRect',
                itemGap: 20,
                textStyle: {
                    color: '#6B7280',
                    fontSize: 12
                }
            },
            grid: {
                left: '2%',
                right: '3%',
                bottom: showLegend ? '12%' : '5%', // Nhường chỗ cho legend nếu có
                top: yAxisName ? '12%' : '8%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false, // Đường bắt đầu từ mép trái
                data: labels,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: '#6B7280',
                    margin: 14,
                    fontSize: 12,
                    interval: 'auto' // Tự động ẩn bớt label nếu quá dài
                }
            },
            yAxis: {
                type: 'value',
                name: yAxisName,
                nameTextStyle: {
                    color: '#9CA3AF',
                    align: 'right',
                    padding: [0, 10, 0, 0]
                },
                min: yMin,
                max: yMax,
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#F3F4F6'
                    }
                },
                axisLabel: {
                    color: '#9CA3AF',
                    formatter: (value) => value >= 1000 ? `${value / 1000}k` : value // Format số lớn
                }
            },
            series: chartSeries
        };
    }, [labels, data, smooth, showLegend, showSymbol, yMin, yMax, yAxisName]);

    // Kiểm tra an toàn: Nếu không có data
    if (!data || data.length === 0) {
        return (
            <div className={styles.wrapper} style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                Không có dữ liệu biểu đồ
            </div>
        );
    }

    return (
        <div className={styles.wrapper} style={{ marginBottom: 0 }}>
            {title && <h3 className={styles.title} style={{ marginBottom: '16px' }}>{title}</h3>}

            <div style={{ height: height, width: '100%' }}>
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    notMerge={true} // Quan trọng: Đảm bảo update mới hoàn toàn khi props đổi
                    lazyUpdate={true}
                />
            </div>
        </div>
    );
};

GenericLineChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Cấu trúc Data mới: Array các object series
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            values: PropTypes.arrayOf(PropTypes.number).isRequired,
            color: PropTypes.string, // Optional: Hex color
            area: PropTypes.bool     // Optional: True để hiện vùng màu bên dưới
        })
    ).isRequired,
    height: PropTypes.string,
    title: PropTypes.string,
    yMin: PropTypes.number,
    yMax: PropTypes.number,
    smooth: PropTypes.bool,
    showLegend: PropTypes.bool,
    showSymbol: PropTypes.bool,
    yAxisName: PropTypes.string,
};

export default GenericLineChart;