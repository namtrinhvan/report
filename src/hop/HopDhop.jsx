import React from 'react';
import GenericBarChart from "../GenericBarChart.jsx";
import RadioDropdown from "../RadioDropdown.jsx";
import CheckboxDropdown from "../CheckboxDropdown.jsx";
import ScatterPlotChart from "../ScatterPlotChart.jsx";

const HopDhop = () => {
    const categories = ['Từ vựng', 'Cú pháp'];
    const subjects = [
        "TIẾNG VIỆT",
        "VN TOÁN",
        "ENGLISH",
        "EN MATH",
        "EN SCIENCE",
        "VN KHTN",
        "VN LỊCH SỬ",
        "VN ĐỊA LÝ",
        "VN GDCD",
        "VN TIN HỌC"
    ];
    const khoiLop = ["Khối 6", "Khối 7", "Khối 8", "Khối 9", "Khối 10", "Khối 11", "Khối 12"];

    // Ví dụ dữ liệu thực tế
    const realData = [45, 82, 60, 95, 30, 90, 80];
    return (
        <div>
            <div>
                <GenericBarChart
                    // title="Tiến độ hoàn thành KPI"
                    title={"Báo cáo hoàn thành mục tiêu KPI về tỉ lệ học sinh đạt từ 7 trở lên các môn học"}
                    labels={subjects}

                    data={realData}
                    referenceLineValue={80} // Đường KPI tại 80%
                >
                    <RadioDropdown placeholder={"KPI MOET: Tỉ lệ học sinh đạt từ 7 trở lên"}/>
                    <RadioDropdown placeholder={"Khối 11"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
                </GenericBarChart>
                <GenericBarChart
                    title={"Báo cáo hoàn thành mục tiêu KPI về tỉ lệ học sinh đạt từ 7 trở lên các khối học"}
                    labels={khoiLop}

                    // title="Tiến độ hoàn thành KPI"
                    data={realData}
                    referenceLineValue={80} // Đường KPI tại 80%
                >
                    <RadioDropdown placeholder={"KPI MOET: Tỉ lệ học sinh đạt từ 7 trở lên"}/>
                    <RadioDropdown placeholder={"VN TOÁN"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1 và Q2"}/>
                </GenericBarChart>
                <GenericBarChart
                    title={"Báo cáo hoàn kết quả trọng tâm môn Tiếng Việt khối 3 theo kỳ"}
                    // title="Tiến độ hoàn thành KPI"
                    labels={categories}
                    data={realData}
                    referenceLineValue={80} // Đường KPI tại 80%
                    subLabels={['Q2', 'Q3']}

                >
                    <RadioDropdown placeholder={"KPI MOET: Tỉ lệ học sinh đạt từ PR trở lên"}/>
                    <RadioDropdown placeholder={"Khối 3"}/>
                    <RadioDropdown placeholder={"TIẾNG VIỆT"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q2 và Q3"}/>
                </GenericBarChart>
                <GenericBarChart
                    title={"Báo cáo kết quả trọng tâm CÚ PHÁP của tất cả các lớp Khối 3"}
                    // title="Tiến độ hoàn thành KPI"
                    labels={['Khối 3','3 Miami', '3 Washington', '3 Caracas', '3 Beijing']}
                    data={realData}
                >
                    <RadioDropdown placeholder={"Khối 3"}/>
                    <RadioDropdown placeholder={"CÚ PHÁP"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
                </GenericBarChart>
                <ScatterPlotChart/>
            </div>
        </div>
    );
};

export default HopDhop;