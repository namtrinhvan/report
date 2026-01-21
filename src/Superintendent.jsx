import React from 'react';
import styles from './Superintendent.module.scss';
import GenericBarChart from "./GenericBarChart.jsx";
import GenericLineChart from "./GenericLineChart.jsx";
import { FaUserGraduate, FaChartLine, FaExclamationTriangle, FaSchool } from 'react-icons/fa';
import RadioDropdown from "./RadioDropdown.jsx";

const Superintendent = ({ filters }) => {

    // --- MOCK DATA FOR DASHBOARD ---
    // Trong thực tế, bạn sẽ fetch data dựa trên `filters` (Year, Program)

    // 1. KPI Data
    const kpiData = {
        avgGPA: 3.24,
        totalStudents: 3542,
        proficiencyRate: 76.5,
        atRiskRate: 12.3
    };

    // 2. Proficiency Distribution Data (Stacked Bar)
    // Các mức: [Below Standard, Approaching, Meeting/Exceeding]
    // 8 mức gom lại:
    // - Below: IE, NV, NV/EM
    // - Approaching: EM, EM/PR
    // - Meeting: PR, PR/AD, AD
    const proficiencyLabels = ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4', 'Khối 5', 'Khối 6', 'Khối 7', 'Khối 8', 'Khối 9', 'Khối 10', 'Khối 11', 'Khối 12'];
    const proficiencyDataset = [
        [5, 4, 6, 8, 5, 12, 10, 15, 14, 10, 8, 5],   // Below (IE -> NV/EM) - Red
        [20, 18, 22, 25, 20, 30, 28, 35, 30, 25, 22, 15], // Approaching (EM -> EM/PR) - Yellow
        [75, 78, 72, 67, 75, 58, 62, 50, 56, 65, 70, 80]  // Meeting (PR -> AD) - Green/Blue
    ];

    // 3. Campus Comparison Data
    const campusLabels = ['TDS Tây Hồ Tây', 'TDS Ocean Park', 'TDS Cầu Giấy'];
    const campusGPA = [3.45, 3.12, 3.28];

    // 4. Trend Data (5 kỳ gần nhất)
    const trendLabels = ['Spring 23', 'Fall 23', 'Spring 24', 'Fall 24', 'Spring 25'];
    const trendData = [3.10, 3.15, 3.18, 3.22, 3.24];

    // 5. Watchlist Data
    const watchlist = [
        { id: 1, campus: 'TDS Cầu Giấy', grade: 'Khối 8', subject: 'Toán', issue: 'Tỷ lệ NV cao (25%)', status: 'danger' },
        { id: 2, campus: 'TDS Ocean Park', grade: 'Khối 6', subject: 'Văn', issue: 'Giảm 0.5 điểm GPA', status: 'warning' },
        { id: 3, campus: 'TDS Tây Hồ Tây', grade: 'Khối 10', subject: 'Hóa học', issue: 'Tỷ lệ NV/EM tăng', status: 'warning' },
        { id: 4, campus: 'TDS Cầu Giấy', grade: 'Khối 7', subject: 'Tiếng Anh', issue: 'Chưa đạt KPI kỳ', status: 'danger' },
    ];

    return (
        <div className={styles.container}>
            {/* --- 1. KPI CARDS SECTION --- */}
            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiLabel}>Điểm TB Hệ thống</span>
                        <FaChartLine className={styles.kpiIcon} />
                    </div>
                    <div className={styles.kpiValue}>{kpiData.avgGPA} <span style={{fontSize:'1rem', color:'#9ca3af'}}>/ 4.0</span></div>
                    <div className={`${styles.kpiTrend} positive`}>
                        <span>▲ 0.02</span>
                        <span className={styles.trendLabel}>so với kỳ trước</span>
                    </div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiLabel}>Tỷ lệ đạt chuẩn (PR+)</span>
                        <FaUserGraduate className={styles.kpiIcon} />
                    </div>
                    <div className={styles.kpiValue}>{kpiData.proficiencyRate}%</div>
                    <div className={`${styles.kpiTrend} positive`}>
                        <span>▲ 1.5%</span>
                        <span className={styles.trendLabel}>đạt mục tiêu >75%</span>
                    </div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiLabel}>Cần can thiệp (IE/NV)</span>
                        <FaExclamationTriangle className={styles.kpiIcon} />
                    </div>
                    <div className={styles.kpiValue} style={{color: '#EF4444'}}>{kpiData.atRiskRate}%</div>
                    <div className={`${styles.kpiTrend} negative`}>
                        <span>▼ 0.5%</span>
                        <span className={styles.trendLabel}>cải thiện nhẹ</span>
                    </div>
                </div>

                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <span className={styles.kpiLabel}>Tổng học sinh</span>
                        <FaSchool className={styles.kpiIcon} />
                    </div>
                    <div className={styles.kpiValue}>{kpiData.totalStudents}</div>
                    <div className={`${styles.kpiTrend} neutral`}>
                        <span>—</span>
                        <span className={styles.trendLabel}>Ổn định</span>
                    </div>
                </div>
            </div>

            {/* --- 2. MAIN CHARTS SECTION --- */}
            <div className={styles.mainSection}>
                {/* 2.1 Proficiency Distribution (Stacked Bar) */}
                <GenericBarChart
                    title="Phân bổ năng lực học tập theo Khối (Proficiency Distribution)"
                    labels={proficiencyLabels}
                    subLabels={['Below Standard (IE-NV)', 'Approaching (EM)', 'Meeting (PR-AD)']}
                    dataset={proficiencyDataset}
                    stacked={true}
                    colors={['#EF4444', '#F59E0B', '#10B981']} // Red, Yellow, Green
                    height="400px"
                    insights="Khối 6 và Khối 8 đang có tỷ lệ học sinh dưới chuẩn cao nhất (đều trên 10%). Cần có biện pháp can thiệp sớm cho giai đoạn chuyển cấp này."
                    showDefaultInsight={false}
                >
                    <div style={{display:'flex', gap: 10}}>
                        <RadioDropdown options={[{label: 'Tất cả môn', value: 'all'}]} placeholder="Tất cả môn" />
                    </div>
                </GenericBarChart>

                {/* 2.2 Campus Comparison */}
                <GenericBarChart
                    title="Điểm trung bình (GPA) theo Cơ sở"
                    labels={campusLabels}
                    dataset={[campusGPA]} // Single series
                    subLabels={['GPA']}
                    colors={['#3B82F6']}
                    height="400px"
                    referenceLineValue={3.2} // System Avg
                    referenceLineColor="#F59E0B"
                    showDefaultInsight={false}
                />
            </div>

            {/* --- 3. SECONDARY SECTION --- */}
            <div className={styles.secondarySection}>
                {/* 3.1 Trend Analysis */}
                <GenericLineChart
                    title="Xu hướng Học thuật (5 kỳ gần nhất)"
                    labels={trendLabels}
                    data={trendData}
                    height="350px"
                    yMin={3.0}
                    yMax={3.5}
                />

                {/* 3.2 Watchlist Table */}
                <div className={styles.warningTableWrapper}>
                    <h3 className={styles.tableTitle}>⚠️ Vùng Cần Quan Tâm (Watchlist)</h3>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead>
                            <tr>
                                <th>Cơ sở</th>
                                <th>Khối/Lớp</th>
                                <th>Môn học</th>
                                <th>Vấn đề</th>
                                <th>Mức độ</th>
                            </tr>
                            </thead>
                            <tbody>
                            {watchlist.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.campus}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.issue}</td>
                                    <td>
                                            <span className={`${styles.badge} ${item.status}`}>
                                                {item.status === 'danger' ? 'Nguy cấp' : 'Cảnh báo'}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Superintendent;