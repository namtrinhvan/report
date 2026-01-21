import React, {useState} from 'react';
import GenericBarChart from "../GenericBarChart.jsx";
import RadioDropdown from "../RadioDropdown.jsx";
import CheckboxDropdown from "../CheckboxDropdown.jsx";
import ScatterPlotChart from "../ScatterPlotChart.jsx";
import styles from './SedDashboard.module.scss';

const kpiStatic = {
    totalStudents: 3542,
    avgGPA: {value: 3.24, trend: 0.02, history: [3.1, 3.12, 3.15, 3.18, 3.20, 3.22, 3.24]},
    proficiency: {value: 76.5, trend: 1.5, history: [70, 72, 71, 73, 74, 75, 76.5]},
    risk: {value: 12.3, trend: -0.5, history: [15, 14.5, 14, 13.5, 13, 12.5, 12.3]}
};

const SedDashboard = () => {
    // State quản lý tab hiện tại. Mặc định là 'kpi' để bạn thấy ngay biểu đồ cũ.
    // Có thể đổi thành 'overview' nếu muốn mặc định vào trang tổng quan.
    const [activeTab, setActiveTab] = useState('overview');

    const categories = ['Từ vựng', 'Cú pháp'];
    const subjects = [
        "TIẾNG VIỆT", "VN TOÁN", "ENGLISH", "EN MATH", "EN SCIENCE",
        "VN KHTN", "VN LỊCH SỬ", "VN ĐỊA LÝ", "VN GDCD", "VN TIN HỌC"
    ];
    const khoiLop = [
        "Khối 1", "Khối 2", "Khối 3", "Khối 4", "Khối 5", "Khối 6",
        "Khối 7", "Khối 8", "Khối 9", "Khối 10", "Khối 11", "Khối 12"
    ];

    // Dữ liệu thực tế (Giữ nguyên từ code cũ)
    const realData = [81, 82, 60, 95, 30, 90, 80, 45, 82, 60, 95, 30, 90, 80];
    const realData2 = [45, 82, 60, 95, 30, 90, 80, 45, 82, 60, 95, 30, 90, 80];

    // Cấu hình danh sách các tabs
    const tabs = [
        {id: 'kpi', label: 'Báo cáo theo mục tiêu cơ sở'},
        {id: 'overview', label: 'Báo cáo khác'},
    ];

    // Render nội dung cho Tab Tổng quan (Placeholder demo)
    const renderOverviewTab = () => (
        <div className={styles.overviewContainer}>
            {/*<div className={styles.statsGrid}>*/}
            {/*    <KPICard*/}
            {/*        title="Điểm GPA trung bình"*/}
            {/*        icon={FaChartLine}*/}
            {/*        value={kpiStatic.avgGPA.value}*/}
            {/*        unit="/ 4.0"*/}
            {/*        trend={kpiStatic.avgGPA.trend}*/}
            {/*        trendLabel="vs kỳ trước"*/}
            {/*        historyData={kpiStatic.avgGPA.history}*/}
            {/*        color="#10B981"*/}
            {/*        popupContent={*/}
            {/*            <>*/}
            {/*                <div className={styles.controlGroup}>*/}
            {/*                    <label>Cách tính</label>*/}
            {/*                    <select className={styles.popupSelect}>*/}
            {/*                        <option>Trung bình cộng</option>*/}
            {/*                        <option>Trung bình trọng số</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}
            {/*                <div className={styles.checkboxWrapper} style={{marginTop: 8}}>*/}
            {/*                    <input type="checkbox" defaultChecked/> <label>Trừ môn năng khiếu</label>*/}
            {/*                </div>*/}
            {/*            </>*/}
            {/*        }*/}
            {/*    />*/}
            {/*    <KPICard*/}
            {/*        title="Tỉ lệ học sinh đạt từ PR trở lên"*/}
            {/*        icon={FaUserGraduate}*/}
            {/*        value={kpiStatic.proficiency.value}*/}
            {/*        unit="%"*/}
            {/*        trend={kpiStatic.proficiency.trend}*/}
            {/*        trendLabel="vs kỳ trước"*/}
            {/*        historyData={kpiStatic.proficiency.history}*/}
            {/*        color="#3B82F6"*/}
            {/*        popupContent={*/}
            {/*            <RadioDropdown placeholder={"PR"}*/}
            {/*                           options={[{label: 'PR', value: ''}, {label: 'EM/PR', value: ''}, {*/}
            {/*                               label: 'NV',*/}
            {/*                               value: ''*/}
            {/*                           }]}/>}*/}
            {/*    />*/}
            {/*    <KPICard*/}
            {/*        title="Tỉ lệ học sinh đạt dưới EM"*/}
            {/*        icon={FaExclamationTriangle}*/}
            {/*        value={kpiStatic.risk.value}*/}
            {/*        unit="%"*/}
            {/*        trend={kpiStatic.risk.trend}*/}
            {/*        trendLabel="Mức: IE, NV"*/}
            {/*        historyData={kpiStatic.risk.history}*/}
            {/*        color="#EF4444"*/}
            {/*        popupContent={*/}
            {/*            <RadioDropdown placeholder={"EM"}*/}
            {/*                           options={[{label: 'PR', value: ''}, {label: 'EM/PR', value: ''}, {*/}
            {/*                               label: 'NV',*/}
            {/*                               value: ''*/}
            {/*                           }]}/>*/}
            {/*        }*/}
            {/*    /></div>*/}

        </div>
    );

    // Render nội dung cho Tab KPI (Nội dung cũ của bạn)
    const renderKpiTab = () => (
        <div className={styles.kpiContainer}>

        </div>
    );

    return (
        <div className={styles.sedDashboard}>
            <div className={styles.contentBody}>
                <div className={styles.chartWrapper}>
                    <GenericBarChart
                        subLabels={["Q1"]}
                        fluctuate={true}
                        showDefaultInsight={true}
                        labels={subjects}
                        title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt từ 7 trở lên các môn học"}
                        referenceLineValue={80}
                    >
                        <div className={styles.filterGroup}>
                            <RadioDropdown  value={'2'} placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}
                                           options={[
                                               {label: 'Tỉ lệ học sinh đạt từ 7 trở lên', value: '2'},
                                               {label: 'Tỉ lệ học sinh đạt dưới 5', value: '1'},
                                               {label: 'Tỉ lệ học sinh đạt từ PR trở lên', value: '1'},
                                               {label: 'Tỉ lệ học sinh đạt dưới EM', value: '1'},
                                           ]}
                            />
                            <RadioDropdown
                                value={'12'}
                                options={[
                                    { label: 'Khối 12', value: '12' },
                                    { label: 'Khối 11', value: '11' },
                                    { label: 'Khối 10', value: '10' },
                                    { label: 'Khối 9', value: '9' },
                                    { label: 'Khối 8', value: '8' },
                                    { label: 'Khối 7', value: '7' },
                                    { label: 'Khối 6', value: '6' },
                                    { label: 'Khối 5', value: '5' },
                                    { label: 'Khối 4', value: '4' },
                                    { label: 'Khối 3', value: '3' },
                                    { label: 'Khối 2', value: '2' },
                                    { label: 'Khối 1', value: '1' },
                                ]}
                                placeholder="Khối 12"
                            />
                            <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
                        </div>
                    </GenericBarChart>
                </div>

                <div className={styles.chartWrapper}>
                    <GenericBarChart
                        fluctuate={true}
                        title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt từ 7 trở lên các khối học"}
                        labels={khoiLop}
                        showDefaultInsight={true}
                        data={realData2}
                        subLabels={["Q1", "Q2"]}
                        referenceLineValue={80} // Đường KPI tại 80%
                    >
                        <div className={styles.filterGroup}>
                            <RadioDropdown  value={'2'} placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}
                                            options={[
                                                {label: 'Tỉ lệ học sinh đạt từ 7 trở lên', value: '2'},
                                                {label: 'Tỉ lệ học sinh đạt dưới 5', value: '1'},
                                                {label: 'Tỉ lệ học sinh đạt từ PR trở lên', value: '1'},
                                                {label: 'Tỉ lệ học sinh đạt dưới EM', value: '1'},
                                            ]}
                            />                            <RadioDropdown placeholder={"VN TOÁN"}/>
                            <CheckboxDropdown placeholder={"Đã chọn Q1 và Q2"}/>
                        </div>
                    </GenericBarChart>
                </div>
                <ScatterPlotChart/>

            </div>
        </div>
    );
};

export default SedDashboard;