import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';

/**
 * GenericBarChartGPA
 * - Trục Y cố định 0.0 -> 4.0 (Thang điểm 4).
 * - Hỗ trợ Children (Controls).
 * - Tự động đổi màu cột dựa trên GPA Target (Reference Line).
 */
const GenericBarChartGPA = ({
                                labels,
                                data,
                                referenceLineValue,
                                barColor = '#3B82F6',   // Blue-500 (Màu khi Đạt)
                                failColor = '#EF4444',  // Red-500 (Màu khi Không Đạt)
                                referenceLineColor = '#F59E0B', // Amber-500 (Màu Target)
                                comparisonType = 'gte', // 'gte': >= Target là tốt (Mặc định cho GPA)
                                height = '400px',
                                title = '',
                                children,
                            }) => {

    // 1. Logic xử lý dữ liệu và màu sắc (Pass/Fail)
    const seriesData = useMemo(() => {
        // Nếu không có data, tạo data random (0.00 -> 4.00)
        const rawData = (data && data.length > 0)
            ? data
            : labels.map(() => parseFloat((Math.random() * 4).toFixed(2)));

        return rawData.map((val) => {
            let isPass = true;

            if (referenceLineValue !== null && referenceLineValue !== undefined) {
                if (comparisonType === 'gte') {
                    isPass = val >= referenceLineValue;
                } else {
                    isPass = val <= referenceLineValue;
                }
            }

            return {
                value: val,
                itemStyle: {
                    color: isPass ? barColor : failColor,
                    borderRadius: [4, 4, 0, 0],
                },
            };
        });
    }, [data, labels, referenceLineValue, barColor, failColor, comparisonType]);

    // 2. Cấu hình ECharts Option
    const option = useMemo(() => {
        return {
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
                trigger: 'axis',
                formatter: (params) => {
                    const item = params[0];
                    // Format hiển thị tooltip: 3.55
                    return `
            <div style="font-weight: bold; margin-bottom: 4px;">${item.name}</div>
            <div>GPA: <b>${Number(item.value).toFixed(2)}</b></div>
          `;
                },
                axisPointer: { type: 'shadow' },
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                textStyle: { color: '#374151' },
            },
            grid: {
                left: '2%',
                right: '4%',
                bottom: '2%',
                top: title ? 45 : 30,
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: labels,
                    axisTick: { alignWithLabel: true, show: false },
                    axisLine: { lineStyle: { color: '#D1D5DB' } },
                    axisLabel: {
                        interval: 0,
                        overflow: 'break',
                        width: 100,
                        color: '#4B5563',
                        margin: 12,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 4.0, // Cố định thang 4
                    interval: 1, // Chia vạch: 0, 1, 2, 3, 4
                    axisLabel: {
                        formatter: '{value}.0', // Hiển thị 1.0, 2.0...
                        color: '#9CA3AF'
                    },
                    splitLine: {
                        show: true,
                        lineStyle: { type: 'dashed', color: '#F3F4F6' },
                    },
                },
            ],
            series: [
                {
                    name: 'GPA',
                    type: 'bar',
                    barWidth: '40%',
                    data: seriesData,

                    markLine: referenceLineValue !== null ? {
                        symbol: ['none', 'none'],
                        silent: true,
                        label: {
                            position: 'insideEndTop',
                            formatter: `Target: {c}`, // Không có dấu %
                            color: referenceLineColor,
                            fontWeight: 'bold',
                            fontSize: 12,
                            padding: [4, 8],
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 4,
                        },
                        lineStyle: {
                            color: referenceLineColor,
                            type: 'dashed',
                            width: 2,
                        },
                        data: [{ yAxis: referenceLineValue }],
                    } : undefined,
                },
            ],
        };
    }, [labels, seriesData, referenceLineValue, referenceLineColor, title]);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Khu vực Controls */}
            {children && (
                <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {children}
                </div>
            )}

            {/* Khu vực Biểu đồ */}
            <div style={{ height: height, width: '100%' }}>
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>
        </div>
    );
};

GenericBarChartGPA.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number),
    referenceLineValue: PropTypes.number,

    barColor: PropTypes.string,
    failColor: PropTypes.string,
    referenceLineColor: PropTypes.string,

    comparisonType: PropTypes.oneOf(['gte', 'lte']),

    height: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
};

export default GenericBarChartGPA;