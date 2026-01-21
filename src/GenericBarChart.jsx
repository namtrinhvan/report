import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import styles from './GenericBarChart.module.scss';

const DEFAULT_INSIGHT_TEXT = `DỮ LIỆU MẪU:
+ Các chỉ số đang có biến động nhẹ theo từng giai đoạn.
+ Cần đối chiếu dữ liệu thực tế với mục tiêu đề ra.
`;

const GenericBarChart = ({
                             labels,
                             subLabels = [],
                             dataset = [],
                             stacked = false,
                             referenceLineValue = null,
                             referenceLineColor = '#FF4D4F',
                             colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'],
                             height = '400px',
                             title = '',
                             insights = null,
                             showDefaultInsight = false,
                             fluctuate = false, // True: Reference line zigzag
                             system = false,    // True: Hệ 4.0 (GPA), False: Hệ 100 (%)
                             children,
                         }) => {

    const displayInsightContent = useMemo(() => {
        if (insights) return insights;
        if (showDefaultInsight) return DEFAULT_INSIGHT_TEXT;
        return null;
    }, [insights, showDefaultInsight]);

    const effectiveSubLabels = useMemo(() => {
        return (subLabels && subLabels.length > 0) ? subLabels : ['Value'];
    }, [subLabels]);

    // Helper: Định dạng giá trị hiển thị (Tooltip, Label)
    const formatValue = useMemo(() => (val) => {
        if (val === null || val === undefined) return '';
        if (system) {
            // Hệ 4.0: Giữ 2 số thập phân, không có %
            return Number(val).toFixed(2);
        }
        // Hệ 100: Làm tròn số nguyên, thêm %
        return `${Math.round(val)}%`;
    }, [system]);

    // 1. TÍNH TOÁN DỮ LIỆU REFERENCE (ZIGZAG DATA)
    const zigzagRefData = useMemo(() => {
        if (!fluctuate || referenceLineValue === null) return null;

        return labels.map(() => {
            // Biến động +- 5%
            const minRef = referenceLineValue * 0.95;
            const maxRef = referenceLineValue * 1.05;
            const val = Math.random() * (maxRef - minRef) + minRef;

            // Làm tròn tuỳ theo hệ số
            return system ? Math.round(val * 100) / 100 : Math.round(val * 10) / 10;
        });
    }, [fluctuate, referenceLineValue, labels, system]);

    // 2. XÂY DỰNG SERIES LIST
    const seriesList = useMemo(() => {
        // A. Tạo các Series dạng Cột (Bar)
        const bars = effectiveSubLabels.map((subLabel, index) => {
            let data;

            if (dataset && dataset[index]) {
                data = dataset[index];
            } else {
                // MOCK DATA GENERATOR
                data = labels.map((_, colIndex) => {
                    // Lấy giá trị cơ sở (từ zigzag hoặc static)
                    let baseValue = zigzagRefData
                        ? zigzagRefData[colIndex]
                        : (referenceLineValue !== null ? referenceLineValue : (system ? 3.0 : 50));
                    // Mặc định: 3.0 cho hệ 4, 50 cho hệ 100

                    // Random +- 10%
                    const minVal = baseValue * 0.9;
                    const maxVal = baseValue * 1.1;
                    const randomVal = Math.random() * (maxVal - minVal) + minVal;

                    if (system) {
                        // Hệ 4.0: Giới hạn max 4.0
                        let finalVal = Math.min(randomVal, 4.0);
                        return Number(finalVal.toFixed(2));
                    } else {
                        // Hệ 100: Giới hạn max 100
                        let finalVal = Math.min(randomVal, 100);
                        return Math.floor(finalVal);
                    }
                });
            }

            return {
                name: subLabel,
                type: 'bar',
                stack: stacked ? 'total' : undefined,
                data: data,
                // MarkLine tĩnh (Chỉ dùng khi KHÔNG fluctuate)
                markLine: (!fluctuate && index === 0 && referenceLineValue !== null) ? {
                    symbol: ['none', 'none'],
                    silent: true,
                    label: {
                        position: 'end',
                        formatter: (params) => formatValue(params.value), // Dùng formatter chung
                        color: referenceLineColor,
                        fontWeight: 'bold',
                    },
                    lineStyle: {
                        color: referenceLineColor,
                        type: 'solid', // YÊU CẦU: Đường liền
                        width: 2,
                    },
                    data: [{ yAxis: referenceLineValue }],
                } : undefined,
                emphasis: { focus: 'none' },
                itemStyle: { borderRadius: stacked ? 0 : [4, 4, 0, 0] }
            };
        });

        // B. Thêm Series dạng Line (Zigzag Reference)
        if (fluctuate && zigzagRefData) {
            bars.push({
                name: 'Mục tiêu',
                type: 'line',
                data: zigzagRefData,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    color: referenceLineColor,
                    type: 'solid', // YÊU CẦU: Đường liền
                    width: 2
                },
                itemStyle: {
                    color: referenceLineColor,
                    borderColor: '#fff',
                    borderWidth: 1
                },
                z: 10,
                tooltip: {
                    valueFormatter: (value) => formatValue(value)
                }
            });
        }

        return bars;
    }, [labels, effectiveSubLabels, dataset, stacked, referenceLineValue, referenceLineColor, fluctuate, zigzagRefData, system, formatValue]);

    const option = useMemo(() => {
        const hasMultipleSeries = effectiveSubLabels.length > 1;

        const legendData = [...effectiveSubLabels];
        if (fluctuate && zigzagRefData) {
            legendData.push('Mục tiêu');
        }

        return {
            color: colors,
            title: { show: false },
            legend: {
                show: true,
                data: legendData,
                bottom: 0,
                left: 'center',
                icon: 'circle',
                itemGap: 16,
                textStyle: { color: '#6B7280', fontSize: 12, fontFamily: 'sans-serif' }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderColor: '#E5E7EB',
                textStyle: { color: '#374151' },
                confine: true,
                // Formatter cho tooltip tổng (để xử lý đơn vị %)
                valueFormatter: (value) => formatValue(value),
            },
            grid: {
                left: '2%',
                right: '4%', // Tăng right margin một chút để số không bị cắt nếu dài
                bottom: hasMultipleSeries ? '12%' : '8%',
                top: '5%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: labels,
                    axisTick: { show: false },
                    axisLine: { lineStyle: { color: '#E5E7EB' } },
                    axisLabel: {
                        interval: 0,
                        overflow: 'break',
                        width: 100,
                        color: '#6B7280',
                        margin: 14,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    // Nếu hệ 4.0 thì max là 4, hệ 100 thì để tự động hoặc max 100
                    max: system ? 4.0 : undefined,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid', // YÊU CẦU: Đường liền cho lưới nền
                            color: '#F3F4F6'
                        },
                    },
                    axisLabel: {
                        color: '#6B7280',
                    }
                },
            ],
            series: seriesList,
        };
    }, [labels, effectiveSubLabels, seriesList, colors, fluctuate, zigzagRefData, system, formatValue]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {children && <div className={styles.controls}>{children}</div>}
            </div>

            <div className={styles.chartContainer} style={{ height: height }}>
                <ReactECharts
                    option={option}
                    className={styles.echartsInstance}
                    style={{ height: '100%', width: '100%' }}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>

            {displayInsightContent && (
                <div className={styles.insightBox}>
                    <span className={styles.insightIcon}></span>
                    <div className={styles.insightContent}>
                        {displayInsightContent}
                    </div>
                </div>
            )}
        </div>
    );
};

GenericBarChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    subLabels: PropTypes.arrayOf(PropTypes.string),
    dataset: PropTypes.arrayOf(PropTypes.array),
    stacked: PropTypes.bool,
    referenceLineValue: PropTypes.number,
    referenceLineColor: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.string,
    title: PropTypes.string,
    insights: PropTypes.node,
    showDefaultInsight: PropTypes.bool,
    fluctuate: PropTypes.bool,
    system: PropTypes.bool, // Prop mới
    children: PropTypes.node,
};

export default GenericBarChart;