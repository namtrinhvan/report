import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './ScatterPlotChart.module.scss';
import RadioDropdown from './RadioDropdown';

// --- CONSTANTS ---
const PROGRAMS = [
    { label: 'Discover', value: 'Discover' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Journey', value: 'Journey' }
];

const GRADE_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
    label: `Khối ${i + 1}`,
    value: i + 1
}));

// Chỉ những môn có mapping giữa MOET và TDS mới vẽ được biểu đồ này
const MAPPED_SUBJECTS = [
    { label: "TOÁN - VN TOÁN", value: "TOAN" },
    { label: "NGỮ VĂN - VN VĂN", value: "VAN" },
    { label: "TIẾNG ANH - ENGLISH", value: "ENGLISH" },
    { label: "KHTN - VN KHTN", value: "KHTN" },
    { label: "LỊCH SỬ - VN SỬ", value: "SU" },
    { label: "ĐỊA LÝ - VN ĐỊA", value: "DIA" },
    { label: "VẬT LÝ - VN LÝ", value: "LY" },
    { label: "HÓA HỌC - VN HÓA", value: "HOA" },
    { label: "SINH HỌC - VN SINH", value: "SINH" }
];

const ScatterPlotChart = ({
                              timeType,
                              setTimeType,
                              setSelectedProgram,
                              setSelectedTime,
                              selectedTime,
                              selectedProgram
                          }) => {
    // --- 1. LOCAL STATE ---
    const [selectedGrade, setSelectedGrade] = useState(10); // Mặc định Khối 10
    const [selectedSubject, setSelectedSubject] = useState('TOAN'); // Mặc định Toán

    // --- 2. DYNAMIC OPTIONS ---
    const timeOptions = useMemo(() => {
        switch (timeType) {
            case 'QUARTER':
                return [
                    { label: 'Giữa kỳ I (Q1)', value: 'Q1' }, { label: 'Cuối kỳ I (Q2)', value: 'Q2' },
                    { label: 'Giữa kỳ II (Q3)', value: 'Q3' }, { label: 'Cuối kỳ II (Q4)', value: 'Q4' }
                ];
            case 'SEMESTER':
                return [{ label: 'Học kỳ I', value: 'HK1' }, { label: 'Học kỳ II', value: 'HK2' }];
            case 'YEAR':
                return [{ label: 'Cả năm', value: 'YEAR' }];
            default:
                return [];
        }
    }, [timeType]);

    // Reset selectedTime khi đổi loại
    useEffect(() => {
        if (timeOptions.length > 0) setSelectedTime(timeOptions[0].value);
    }, [timeType, timeOptions]);

    // --- 3. MOCK DATA GENERATOR ---
    const chartData = useMemo(() => {
        const data = [];
        const count = 150; // Số lượng điểm mẫu

        for (let i = 0; i < count; i++) {
            const grade = selectedGrade;
            const program = selectedProgram;
            const subjectCode = selectedSubject;

            // Logic tạo MOET ngẫu nhiên (tập trung vào khoảng 4-9)
            var moet = parseFloat((Math.random() * 6 + 3).toFixed(1));
            if (moet > 10) moet = 10;

            // Logic TDS ~ MOET * 0.4 (Tỷ lệ chuyển đổi lý tưởng)
            let tdsBase = moet * 0.4;
            const variance = (Math.random() * 1.0) - 0.5; // Độ lệch ngẫu nhiên
            let tds = parseFloat((tdsBase + variance).toFixed(2));

            // Cap range TDS (0 - 4.0)
            if (tds < 0) tds = 0;
            if (tds > 4.0) tds = 4.0;

            // Tạo outlier (5% tỉ lệ lệch hẳn khỏi đường tương quan)
            if (Math.random() < 0.05) {
                if (Math.random() > 0.5) {
                    tds += 1.0;
                } else {
                    moet += 2.0;
                }
            }

            // Re-cap sau khi thêm outlier
            if (tds > 4.0) tds = 4.0;
            if (moet > 10) moet = 10;

            const subjectLabel = MAPPED_SUBJECTS.find(s => s.value === subjectCode)?.label || subjectCode;

            data.push({
                id: i,
                studentName: `Học sinh ${i + 1}`,
                grade,
                program,
                subject: subjectLabel,
                moet,
                tds,
                class: `${grade}${program ? program.substring(0, 1) : 'D'}1`
            });
        }
        return data;
    }, [selectedGrade, selectedProgram, selectedSubject, selectedTime]);

    // --- 4. CALCULATE REGRESSION LINE (Đường tương quan) ---
    const regressionLineData = useMemo(() => {
        if (chartData.length === 0) return [];

        let n = chartData.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

        chartData.forEach(item => {
            sumX += item.moet;
            sumY += item.tds;
            sumXY += item.moet * item.tds;
            sumXX += item.moet * item.moet;
        });

        // Tính Slope (m) và Intercept (b) cho phương trình y = mx + b
        // Tránh chia cho 0
        const denominator = (n * sumXX - sumX * sumX);
        if (denominator === 0) return [];

        const slope = (n * sumXY - sumX * sumY) / denominator;
        const intercept = (sumY - slope * sumX) / n;

        // Tính điểm đầu (x=0) và điểm cuối (x=10) để vẽ đường thẳng
        const y1 = intercept; // Tại MOET = 0
        const y2 = slope * 10 + intercept; // Tại MOET = 10

        // Format Echarts markLine data: [[{coord: start}, {coord: end}]]
        return [
            [
                { coord: [0, y1], symbol: 'none' },
                { coord: [10, y2], symbol: 'none' }
            ]
        ];
    }, [chartData]);


    // --- 5. ECHARTS OPTION CONFIGURATION ---
    const getOption = useMemo(() => {
        return {
            grid: {
                top: 40,
                right: 40,
                bottom: 50,
                left: 50,
                containLabel: false
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    // Bỏ qua tooltip nếu hover vào đường markLine
                    if (params.componentType === 'markLine') return null;

                    const data = params.data;
                    return `
                        <div class="${styles.customTooltip}" style="background: #fff; border: 1px solid #ccc; padding: 10px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div class="${styles.tooltipHeader}" style="font-weight: bold; margin-bottom: 5px;">${data.studentName}</div>
                            <div class="${styles.tooltipRow}" style="font-size: 12px; margin-bottom: 3px;">Lớp: <strong>${data.class}</strong></div>
                            <div class="${styles.tooltipRow}" style="font-size: 12px; margin-bottom: 5px;">Môn: <strong>${data.subject}</strong></div>
                            <div class="${styles.divider}" style="height: 1px; background: #eee; margin: 5px 0;"></div>
                            <div class="${styles.metricRow}" style="display: flex; gap: 10px; font-size: 12px;">
                                <span style="color: #0088FE">MOET: <strong>${data.moet}</strong></span>
                                <span style="color: #00C49F">TDS: <strong>${data.tds}</strong></span>
                            </div>
                        </div>
                    `;
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 0,
                borderWidth: 0,
                shadowBlur: 0,
                extraCssText: 'box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); border-radius: 6px;'
            },
            xAxis: {
                type: 'value',
                name: 'Điểm MOET',
                nameLocation: 'middle',
                nameGap: 25,
                min: 0,
                max: 10,
                interval: 1,
                splitLine: {
                    show: true,
                    lineStyle: { type: 'dashed', color: '#f2f4f7' }
                },
                axisLine: { show: true, lineStyle: { color: '#667085' } },
                axisTick: { show: true, lineStyle: { color: '#667085' } },
                axisLabel: { color: '#667085', fontSize: 12 }
            },
            yAxis: {
                type: 'value',
                name: 'Điểm TDS',
                nameLocation: 'middle',
                nameGap: 35,
                nameRotate: 90,
                min: 0,
                max: 4,
                interval: 1,
                splitLine: {
                    show: true,
                    lineStyle: { type: 'dashed', color: '#f2f4f7' }
                },
                axisLine: { show: true, lineStyle: { color: '#667085' } },
                axisTick: { show: true, lineStyle: { color: '#667085' } },
                axisLabel: { color: '#667085', fontSize: 12 }
            },
            series: [
                {
                    name: 'Học sinh',
                    type: 'scatter',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#0088FE',
                        opacity: 0.6 // Giảm opacity điểm để dễ nhìn đường tương quan
                    },
                    data: chartData.map(item => ({
                        value: [item.moet, item.tds],
                        ...item
                    })),
                    markLine: {
                        animation: false,
                        symbol: ['none', 'none'],
                        silent: true,
                        data: [
                            // 1. Đường tham chiếu Y (TDS Targets)
                            {
                                yAxis: 3.0,
                                name: 'PR',
                                lineStyle: { type: 'dashed', color: '#d0d5dd', width: 1 },
                                label: { position: 'insideStartTop', distance: [5, 5], color: '#98a2b3', formatter: '{b}' }
                            },
                            {
                                yAxis: 2.0,
                                name: 'EM',
                                lineStyle: { type: 'dashed', color: '#d0d5dd', width: 1 },
                                label: { position: 'insideStartTop', distance: [5, 5], color: '#98a2b3', formatter: '{b}' }
                            },

                            // 2. ĐƯỜNG TƯƠNG QUAN (Calculated Trend Line)

                        ]
                    }
                }
            ]
        };
    }, [chartData, regressionLineData]);

    return (
        <div className={styles.chartWrapper}>
            <div className={styles.chartContainer}>
                <h3>Hệ số tương quan: 0.85</h3>
                <ReactECharts
                    option={getOption}
                    style={{ height: '500px', width: '100%' }}
                    notMerge={true}
                    lazyUpdate={true}
                />

                {chartData.length === 0 && (
                    <div className={styles.noDataOverlay}>Không có dữ liệu phù hợp.</div>
                )}
            </div>
        </div>
    );
};

export default ScatterPlotChart;