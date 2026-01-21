// import React, {useState, useMemo, useRef, useEffect} from 'react';
// import styles from './Superintendent.module.scss';
// import GenericBarChart from "./GenericBarChart.jsx";
// import GenericLineChart from "./GenericLineChart.jsx";
// import CheckboxDropdown from "./CheckboxDropdown.jsx";
// import RadioDropdown from "./RadioDropdown.jsx";
// import {
//     FaUserGraduate, FaChartLine, FaExclamationTriangle,
//     FaUsers, FaTimes, FaCog, FaPlus, FaArrowRight
// } from 'react-icons/fa';
// import {AreaChart, Area, ResponsiveContainer} from 'recharts';
//
// const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
//
// // Dữ liệu các đường
// const chartData = [
//     {
//         name: 'TDS Tây Hồ Tây',
//         values: [3.4, 3.1, 3.6, 3.6, 3.8],
//         color: '#2563EB', // Blue đậm
//         area: false
//     },
//     {
//         name: 'TDS Ocean Park',
//         values: [3.1, 3.2, 3.3, 3.4, 3.5],
//         color: '#16A34A', // Green
//         area: false
//     },
//     {
//         name: 'TDS Cầu Giấy',
//         values: [2.7, 2.8, 2.9, 2.7, 3.1],
//         color: '#F59E0B', // Amber
//         area: false
//     },
//     {
//         name: 'TDS Dương Kinh',
//         values: [3.0, 3.1, 3.2, 3.3, 3],
//         color: '#6366F1', // Indigo
//         area: false
//     },
//     {
//         name: 'Toàn Hệ Thống',
//         values: [2.9, 3.05, 3.2, 3.35, 3.5],
//         color: '#EF4444', // Red
//         area: true
//     }
// ];
//
//
// // --- HELPER: SPARKLINE ---
// const Sparkline = React.memo(({data, color}) => {
//     const chartData = useMemo(() => data.map((val, index) => ({index, value: val})), [data]);
//     return (
//         <div style={{width: '80px', height: '40px'}}>
//             <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={chartData}>
//                     <defs>
//                         <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
//                             <stop offset="95%" stopColor={color} stopOpacity={0}/>
//                         </linearGradient>
//                     </defs>
//                     <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1}
//                           fill={`url(#gradient-${color})`} isAnimationActive={false}/>
//                 </AreaChart>
//             </ResponsiveContainer>
//         </div>
//     );
// });
//
// // --- COMPONENT: KPI CARD ---
// export const KPICard = ({title, icon: Icon, value, unit, trend, trendLabel, historyData, color, popupContent}) => {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const popupRef = useRef(null);
//
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (popupRef.current && !popupRef.current.contains(event.target)) {
//                 setIsPopupOpen(false);
//             }
//         };
//         if (isPopupOpen) document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [isPopupOpen]);
//
//     return (
//         <div className={styles.kpiCard}>
//             <div className={styles.cardActionWrapper}>
//                 <button
//                     className={`${styles.cardMenuBtn} ${isPopupOpen ? styles.active : ''}`}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         setIsPopupOpen(!isPopupOpen);
//                     }}
//                 >
//                     <FaCog/>
//                 </button>
//                 {isPopupOpen && (
//                     <div className={styles.popupWrapper} ref={popupRef} onClick={(e) => e.stopPropagation()}>
//                         <div className={styles.popupMenu}>
//                             <div className={styles.popupHeader}>
//                                 <span>Cài đặt nâng cao</span>
//                                 <button onClick={() => setIsPopupOpen(false)} className={styles.closeBtn}><FaTimes/>
//                                 </button>
//                             </div>
//                             <div className={styles.popupBody}>{popupContent}</div>
//                             <div className={styles.popupFooter}>
//                                 <button className={styles.applyBtn} onClick={() => setIsPopupOpen(false)}>Áp dụng
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className={styles.kpiHeader}>
//                 <div className={styles.kpiLabelRow}>
//                     <Icon className={styles.kpiIcon}/>
//                     <span className={styles.kpiLabel}>{title}</span>
//                 </div>
//             </div>
//             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
//                 <div>
//                     <div className={styles.kpiValue}>{value} {unit && <span className={styles.unit}>{unit}</span>}</div>
//                     <div
//                         className={`${styles.kpiTrend} ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}`}>
//                         <span>{trend > 0 ? '▲' : '▼'} {Math.abs(trend)}</span>
//                         <span className={styles.trendLabel}>{trendLabel}</span>
//                     </div>
//                 </div>
//                 <Sparkline data={historyData} color={color}/>
//             </div>
//         </div>
//     );
// };
//
// // --- COMPONENT: CHART WRAPPER ---
// const ChartSection = ({title, controls, extraFilterContent, children, fullHeight = false}) => {
//     const [isExtraFilterOpen, setIsExtraFilterOpen] = useState(false);
//     const filterRef = useRef(null);
//
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (filterRef.current && !filterRef.current.contains(event.target)) {
//                 setIsExtraFilterOpen(false);
//             }
//         };
//         if (isExtraFilterOpen) document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [isExtraFilterOpen]);
//
//     return (
//         <div className={styles.chartSectionWrapper} style={fullHeight ? {height: '100%'} : {}}>
//             <div className={styles.chartHeader}>
//                 <h3 className={styles.chartTitle}>{title}</h3>
//                 <div className={styles.chartControls}>
//                     {controls}
//                     <div className={styles.relativeContainer}>
//                         <button
//                             className={`${styles.iconBtn} ${isExtraFilterOpen ? styles.active : ''}`}
//                             onClick={() => setIsExtraFilterOpen(!isExtraFilterOpen)}
//                             title="Bộ lọc nâng cao"
//                         >
//                             <FaPlus/>
//                         </button>
//                         {isExtraFilterOpen && (
//                             <div className={styles.filterPopupWrapper} ref={filterRef}>
//                                 <div className={styles.popupMenu}>
//                                     <div className={styles.popupHeader}>
//                                         <span>Bộ lọc nâng cao</span>
//                                         <button onClick={() => setIsExtraFilterOpen(false)} className={styles.closeBtn}>
//                                             <FaTimes/></button>
//                                     </div>
//                                     <div className={styles.popupBody}>
//                                         {extraFilterContent ||
//                                             <p style={{color: '#999', fontSize: '13px'}}>Không có tùy chọn thêm.</p>}
//                                     </div>
//                                     <div className={styles.popupFooter}>
//                                         <button className={styles.applyBtn}
//                                                 onClick={() => setIsExtraFilterOpen(false)}>Lọc dữ liệu
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.chartBody}>
//                 {children}
//             </div>
//         </div>
//     );
// };
//
// // --- MAIN SUPERINTENDENT COMPONENT ---
// const Superintendent = () => {
//     // 1. KPI Data
//     const kpiStatic = {
//         totalStudents: 3542,
//         avgGPA: {value: 3.24, trend: 0.02, history: [3.1, 3.12, 3.15, 3.18, 3.20, 3.22, 3.24]},
//         proficiency: {value: 76.5, trend: 1.5, history: [70, 72, 71, 73, 74, 75, 76.5]},
//         risk: {value: 12.3, trend: -0.5, history: [15, 14.5, 14, 13.5, 13, 12.5, 12.3]}
//     };
//
//     // 2. Bar Chart 1 (GPA Comparison) State
//     const [barYears, setBarYears] = useState(['2025-2026']);
//     const barYearOptions = [
//         {label: '2025 - 2026', value: '2025-2026'},
//         {label: '2024 - 2025', value: '2024-2025'},
//         {label: '2023 - 2024', value: '2023-2024'},
//         {label: '2022 - 2023', value: '2022-2023'},
//     ];
//
//     const barChartData = useMemo(() => {
//         if (barYears.length === 0) return [[3.2, 3.1, 3.25]];
//         return barYears.map(year => {
//             if (year === '2025-2026') return [3.45, 3.28, 2.9, 3.3];
//             if (year === '2024-2025') return [3.45, 3.28, 2.9, 3.3];
//             if (year === '2023-2024') return [3.45, 3.28, 2.9, 3.3];
//             if (year === '2022-2023') return [3.40, 3.05, 3.20, 3.25];
//             return [3.35, 3.00, 3.15];
//         });
//     }, [barYears]);
//     const barSubLabels = useMemo(() => barYears.length > 0 ? barYears : ['Giá trị mặc định'], [barYears]);
//
//     // 3. Distribution Chart Data (Stacked Bar thay cho Pie)
//     // Các mức: IE, NV, EM, PR, AD
//     const distributionLabels = [ 'TDS Tây Hồ Tây', 'TDS Ocean Park', 'TDS Cầu Giấy', 'Toàn Hệ Thống'];
//     // Dữ liệu giả lập % cho từng mức (tổng mỗi cột ~ 100%)
//     const distributionData = [
//         [5, 4, 6, 5],   // IE (Incomplete/Emerging) - Đỏ đậm
//         [10, 8, 12, 9], // NV (Novice) - Cam
//         [25, 20, 30, 25], // EM (Emerging) - Vàng
//         [40, 45, 35, 40], // PR (Proficient) - Xanh lá
//         [20, 23, 17, 21]  // AD (Advanced) - Xanh dương
//     ];
//     const distributionSubLabels = ['IE', 'NV', 'EM', 'PR', 'AD'];
//     // Palette màu tương ứng: Đỏ -> Cam -> Vàng -> Xanh lá -> Xanh dương
//     const distributionColors = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6'];
//
//     // 4. Trend Chart Data (New Logic)
//     const trendLabels = [
//         '2021 - 2022',
//         '2022 - 2023',
//         '2023 - 2024',
//         '2024 - 2025',
//         '2025 - 2026'
//     ];
//     const trendData = [3.15, 3.18, 3.22, 3.16, 3.20, 3.24];
//
//     // 5. Watchlist Data
//     const watchlist = [
//         {
//             id: 1,
//             campus: 'TDS Cầu Giấy',
//             grade: 'Khối 8',
//             subject: 'Toán',
//             issue: 'Tỷ lệ NV cao (25%)',
//             status: 'danger'
//         },
//         {
//             id: 2,
//             campus: 'TDS Ocean Park',
//             grade: 'Khối 6',
//             subject: 'Văn',
//             issue: 'Giảm 0.5 điểm GPA',
//             status: 'warning'
//         },
//         {
//             id: 3,
//             campus: 'TDS Tây Hồ Tây',
//             grade: 'Khối 10',
//             subject: 'Hóa học',
//             issue: 'Tỷ lệ NV/EM tăng',
//             status: 'warning'
//         },
//         {
//             id: 4,
//             campus: 'TDS Cầu Giấy',
//             grade: 'Khối 7',
//             subject: 'Tiếng Anh',
//             issue: 'Chưa đạt KPI kỳ',
//             status: 'danger'
//         },
//     ];
//
//     return (
//         <div className={styles.container}>
//             <div className={styles.kpiGrid}>
//                 <KPICard
//                     title="Điểm GPA trung bình"
//                     icon={FaChartLine}
//                     value={kpiStatic.avgGPA.value}
//                     unit="/ 4.0"
//                     trend={kpiStatic.avgGPA.trend}
//                     trendLabel="vs kỳ trước"
//                     historyData={kpiStatic.avgGPA.history}
//                     color="#10B981"
//                     popupContent={
//                         <>
//                             <div className={styles.controlGroup}>
//                                 <label>Cách tính</label>
//                                 <select className={styles.popupSelect}>
//                                     <option>Trung bình cộng</option>
//                                     <option>Trung bình trọng số</option>
//                                 </select>
//                             </div>
//                             <div className={styles.checkboxWrapper} style={{marginTop: 8}}>
//                                 <input type="checkbox" defaultChecked/> <label>Trừ môn năng khiếu</label>
//                             </div>
//                         </>
//                     }
//                 />
//                 <KPICard
//                     title="Tỉ lệ học sinh đạt từ PR trở lên"
//                     icon={FaUserGraduate}
//                     value={kpiStatic.proficiency.value}
//                     unit="%"
//                     trend={kpiStatic.proficiency.trend}
//                     trendLabel="vs kỳ trước"
//                     historyData={kpiStatic.proficiency.history}
//                     color="#3B82F6"
//                     popupContent={
//                         <RadioDropdown placeholder={"PR"} options={[{label: 'PR', value: ''}, {label: 'EM/PR', value: ''}, {label: 'NV', value: ''}]}/>}
//                 />
//                 <KPICard
//                     title="Tỉ lệ học sinh đạt dưới EM"
//                     icon={FaExclamationTriangle}
//                     value={kpiStatic.risk.value}
//                     unit="%"
//                     trend={kpiStatic.risk.trend}
//                     trendLabel="Mức: IE, NV"
//                     historyData={kpiStatic.risk.history}
//                     color="#EF4444"
//                     popupContent={
//                         <RadioDropdown placeholder={"EM"} options={[{label: 'PR', value: ''}, {label: 'EM/PR', value: ''}, {label: 'NV', value: ''}]}/>
//                     }
//                 />
//             </div>
//
//             {/* --- MAIN CHARTS SECTION --- */}
//             <div className={styles.mainSection}>
//                 {/* 1. Bar Chart: So sánh GPA */}
//                 <ChartSection
//                     title="Điểm GPA trung bình theo cơ sở "
//                     controls={
//                         <div style={{display: 'flex', gap: '8px', minWidth: '200px'}}>
//                             <CheckboxDropdown
//                                 options={barYearOptions}
//                                 value={barYears}
//                                 onChange={setBarYears}
//                                 placeholder="Chọn năm so sánh"
//                                 maxDisplayTags={1}
//                             />
//                         </div>
//                     }
//                     extraFilterContent={
//                         <>
//                             <div className={styles.controlGroup}>
//                                 <label>Khối lớp</label>
//                                 <select className={styles.popupSelect}>
//                                     <option>Tất cả</option>
//                                     <option>THPT</option>
//                                     <option>THCS</option>
//                                 </select>
//                             </div>
//                             <div className={styles.controlGroup}>
//                                 <label>Môn học</label>
//                                 <select className={styles.popupSelect}>
//                                     <option>Tất cả</option>
//                                     <option>KHTN</option>
//                                 </select>
//                             </div>
//                         </>
//                     }
//                 >
//
//                     <GenericBarChart
//                         labels={['TDS Tây Hồ Tây', 'TDS Ocean Park', 'TDS Cầu Giấy', 'Toàn Hệ Thống']}
//                         subLabels={barSubLabels}
//                         dataset={barChartData}
//                         colors={['#3B82F6', '#10B981', '#F59E0B']}
//                         height="350px"
//                     />
//                 </ChartSection>
//                 {/* 2. Stacked Bar Chart: Phân bổ năng lực */}
//                 <ChartSection
//                     title="Biểu đồ phân bổ năng lực học sinh theo cơ sở "
//                     controls={<CheckboxDropdown
//                         options={barYearOptions}
//                         placeholder="Đã chọn 2025 - 2026"/>}
//                 >
//                     <GenericBarChart
//                         labels={distributionLabels} // [Toàn hệ thống, School A, School B...]
//                         subLabels={distributionSubLabels} // [IE, NV, EM, PR, AD]
//                         dataset={distributionData} // Dữ liệu % tương ứng
//                         stacked={true} // Kích hoạt chế độ Stack
//                         colors={distributionColors}
//                         height="350px"
//                         // Không dùng reference line ở đây
//                     />
//                 </ChartSection>
//             </div>
//
//             {/* --- SECONDARY SECTION --- */}
//             <div className={styles.secondarySection}>
//                 {/* 3. Trend Chart */}
//                 <ChartSection title="Xu hướng điểm GPA trung bình của cơ sở theo thời gian" controls={
//                     <div>
//                         <CheckboxDropdown  placeholder={"Đã chọn tất cả cơ sở"}  options={[{label: 'TDS Tây Hồ Tây', value: ''}, {label: 'TDS Cầu Giấy', value: ''}, {label: 'TDS Dương Kinh', value: ''}, {label: 'Toàn hệ thống', value: '1'}]}/>
//                     </div>
//                 }>
//                     <GenericLineChart
//                         labels={trendLabels}
//                         data={chartData}
//                         height="400px"
//                         smooth={true}         // Đường cong mềm mại
//                         yAxisName="Triệu VNĐ" // Đơn vị trục Y
//                         showLegend={true}     // Hiện chú thích bên dưới
//                         yMin={2.0} yMax={4.0}
//                     />
//
//                 </ChartSection>
//             </div>
//         </div>
//     );
// };
//
// export default Superintendent;

import React from 'react';

const SuperintendentDashboard = () => {
    return (
        <div>
            Chọn cơ sở để xem báo cáo
        </div>
    );
};

export default SuperintendentDashboard;