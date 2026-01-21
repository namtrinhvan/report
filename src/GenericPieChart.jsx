import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import styles from './GenericPieChart.module.scss';

// 1. Cố định thứ tự Level từ Thấp -> Cao
const ORDERED_LABELS = ['IE', 'NV', 'NV/EM', 'EM', 'EM/PR', 'PR', 'PR/AD', 'AD'];

// 2. Định nghĩa dải màu tương ứng (Semantic Colors)
// Dải màu đi từ Màu nóng (Cảnh báo/Thấp) -> Màu lạnh/Đậm (Thành thục/Cao)
const LEVEL_COLORS = [
    '#FF6B6B', // IE    : Đỏ nhạt (Nhập môn)
    '#FF9F43', // NV    : Cam (Tiến bộ)
    '#FDCB6E', // NV/EM : Vàng cam
    '#55EFC4', // EM    : Xanh ngọc nhạt (Bắt đầu ổn định)
    '#00B894', // EM/PR : Xanh ngọc đậm
    '#00CEC9', // PR    : Xanh dương sáng
    '#0984E3', // PR/AD : Xanh dương đậm
    '#13c00c'  // AD    : Màu than/Đen (Master/Cao nhất - tạo điểm nhấn mạnh mẽ)
    // Hoặc nếu muốn AD là màu nổi bật nhất của sự thành công, dùng màu Tím đậm: '#6C5CE7'
];

/**
 * GenericPieChart
 * - Tự động map dữ liệu vào đúng thứ tự level (IE -> AD).
 * - Sử dụng dải màu cố định để thể hiện trình độ từ thấp đến cao.
 */
const GenericPieChart = ({
                             title = '',
                             isDonut = false,
                             height = '400px',
                             inputData = {}, // { 'IE': 10, 'AD': 50 ... }
                             children,
                         }) => {

    // 3. Logic Map dữ liệu
    const chartData = useMemo(() => {
        return ORDERED_LABELS.map((label, index) => {
            const hasRealValue = inputData.hasOwnProperty(label);
            return {
                name: label,
                // Nếu có data thì dùng, không thì random 10-50 để demo
                value: hasRealValue ? inputData[label] : Math.floor(Math.random() * 41) + 10,

                // Gán trực tiếp màu vào từng item data để đảm bảo màu không bị lệch
                // dù có filter hay ẩn hiện legend
                itemStyle: {
                    color: LEVEL_COLORS[index]
                }
            };
        });
    }, [inputData]);

    // 4. Cấu hình ECharts
    const option = useMemo(() => {
        return {
            title: {
                text: title,
                left: 'center',
                top: 0,
                textStyle: {
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                    color: '#1F2937',
                },
            },

            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return `
                        <div style="margin-bottom: 4px; font-weight: bold; color: ${params.color}">
                            ${params.name}
                        </div>
                        <div>Số lượng: <b>${params.value}</b></div>
                        <div>Tỷ lệ: <b>${params.percent}%</b></div>
                    `;
                },
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                textStyle: { color: '#374151', fontSize: 13 },
            },

            legend: {
                bottom: '-20px',
                left: 'center',
                type: 'scroll',
                icon: 'circle',
                itemGap: 15,
                data: ORDERED_LABELS, // Legend giữ đúng thứ tự
                textStyle: {
                    color: '#4B5563',
                    fontSize: 12
                },
            },

            series: [
                {
                    name: 'Level Distribution',
                    type: 'pie',
                    radius: isDonut ? ['40%', '65%'] : '65%',
                    center: ['50%', '55%'],

                    // startAngle 90: Bắt đầu vẽ từ hướng 12h
                    // clockwise true: Vẽ theo chiều kim đồng hồ (IE -> AD)
                    startAngle: 90,
                    clockwise: true,

                    data: chartData,

                    // Quan trọng: Tắt sort để ECharts vẽ đúng thứ tự mảng data
                    sort: null,

                    itemStyle: {
                        borderRadius: 5,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },

                    label: {
                        show: true,
                        position: 'outside',
                        formatter: '{b}\n{d}%',
                        color: '#374151',
                        fontSize: 12,
                        lineHeight: 16,
                    },

                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 15,
                        smooth: true,
                        lineStyle: {
                            color: '#9CA3AF'
                        }
                    },

                    emphasis: {
                        scale: true,
                        scaleSize: 8,
                        label: {
                            show: true,
                            fontWeight: 'bold',
                            fontSize: 14,
                        },
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                        }
                    },
                },
            ],
        };
    }, [chartData, title, isDonut]);

    return (
        <div className={styles.wrapper}>
            {children && (
                <div className={styles.controls}>
                    {children}
                </div>
            )}

            <div
                className={styles.chartContainer}
                style={{ height: height }}
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
    title: PropTypes.string,
    isDonut: PropTypes.bool,
    height: PropTypes.string,
    inputData: PropTypes.objectOf(PropTypes.number),
    children: PropTypes.node,
};

export default GenericPieChart;