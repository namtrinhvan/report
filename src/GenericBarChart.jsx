import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import styles from './GenericBarChart.module.scss';

// Nội dung Insight mặc định (Hardcoded)
const DEFAULT_INSIGHT_TEXT = `KẾT QUẢ Q1, KHỐI 2 CHO THẤY:
+ Kết quả tỉ lệ HS đạt điểm Từ PR trở lên môn VN TIN HỌC, VN TOÁN, VN GIÁO DỤC LỐI SỐNG (ĐẠO ĐỨC), VN KHOA HỌC TỰ NHIÊN đã Đạt mục tiêu môn học của cơ sở;
+ Kết quả tỉ lệ HS đạt điểm Từ PR trở lên môn VN NGHỆ THUẬT TRÌNH DIỄN - SÂN KHẤU, TIẾNG VIỆT, VN VĂN đã KHÔNG ĐẠT mục tiêu môn học của cơ sở.
+ Môn có tỉ lệ HS đạt PR trở lên cao nhất là VN KHOA HỌC TỰ NHIÊN;
+ Môn có tỉ lệ HS đạt PR trở lên thấp nhất là VN VĂN.
`;

const GenericBarChart = ({
                             labels,
                             subLabels = [],
                             referenceLineValue = null,
                             referenceLineColor = '#FF4D4F',
                             colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'],
                             height = '400px',
                             title = '',
                             insights = null,          // Nội dung Insight tuỳ chỉnh (ưu tiên cao nhất)
                             showDefaultInsight = false, // True: Hiển thị đoạn text mặc định ở trên
                             children,
                         }) => {

    // 1. Logic xác định nội dung Insight cần hiển thị
    // Nếu có 'insights' truyền vào -> dùng nó.
    // Nếu không, kiểm tra 'showDefaultInsight' -> dùng DEFAULT_INSIGHT_TEXT.
    const displayInsightContent = useMemo(() => {
        if (insights) return insights;
        if (showDefaultInsight) return DEFAULT_INSIGHT_TEXT;
        return null;
    }, [insights, showDefaultInsight]);

    // 2. Logic dữ liệu biểu đồ (giữ nguyên)
    const effectiveSubLabels = useMemo(() => {
        return (subLabels && subLabels.length > 0) ? subLabels : ['Value'];
    }, [subLabels]);

    const seriesList = useMemo(() => {
        return effectiveSubLabels.map((subLabel, index) => {
            const data = labels.map(() => Math.floor(Math.random() * 81) + 10);
            return {
                name: subLabel,
                type: 'bar',
                data: data,
                markLine: (index === 0 && referenceLineValue !== null) ? {
                    symbol: ['none', 'none'],
                    silent: true,
                    label: {
                        position: 'end',
                        formatter: `{c}%`,
                        color: referenceLineColor,
                        fontWeight: 'bold',
                    },
                    lineStyle: {
                        color: referenceLineColor,
                        type: 'dashed',
                        width: 2,
                    },
                    data: [{ yAxis: referenceLineValue }],
                } : undefined,
            };
        });
    }, [labels, effectiveSubLabels, referenceLineValue, referenceLineColor]);

    // 3. Cấu hình ECharts Option (giữ nguyên)
    const option = useMemo(() => {
        const hasMultipleSeries = effectiveSubLabels.length > 1;
        return {
            color: colors,
            title: { show: false }, // Tắt title mặc định của ECharts
            legend: {
                show: true,
                data: effectiveSubLabels,
                bottom: 0,
                left: 'center',
                icon: 'roundRect',
                itemGap: 20,
                textStyle: { color: '#4B5563', fontSize: 12 }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#E5E7EB',
                textStyle: { color: '#374151' },
            },
            grid: {
                left: '1%',
                right: '2%',
                bottom: hasMultipleSeries ? '12%' : '8%',
                top: '5%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: labels,
                    axisTick: { alignWithLabel: true },
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
                    max: 100,
                    axisLabel: { formatter: '{value}%', color: '#9CA3AF' },
                    splitLine: {
                        show: true,
                        lineStyle: { type: 'dashed', color: '#F3F4F6' },
                    },
                },
            ],
            series: seriesList,
        };
    }, [labels, effectiveSubLabels, seriesList, colors]);

    return (
        <div className={styles.wrapper}>
            {/* Header Area */}
            <div className={styles.header}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {children && <div className={styles.controls}>{children}</div>}
            </div>

            {/* Chart Area */}
            <div className={styles.chartContainer} style={{ height: height }}>
                <ReactECharts
                    option={option}
                    className={styles.echartsInstance}
                    style={{ height: '100%', width: '100%' }}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </div>

            {/* Insights Area */}
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
    referenceLineValue: PropTypes.number,
    referenceLineColor: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.string,
    title: PropTypes.string,

    // Props cho Insights
    insights: PropTypes.node,         // Nội dung tuỳ chỉnh
    showDefaultInsight: PropTypes.bool, // Toggle nội dung mặc định

    children: PropTypes.node,
};

export default GenericBarChart;