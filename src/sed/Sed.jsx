import React from 'react';
import GenericBarChart from "../GenericBarChart.jsx";
import RadioDropdown from "../RadioDropdown.jsx";
import CheckboxDropdown from "../CheckboxDropdown.jsx";
import ScatterPlotChart from "../ScatterPlotChart.jsx";

const Sed = () => {
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
    const khoiLop = ["Khối 1", "Khối 2", "Khối 3", "Khối 4", "Khối 5", "Khối 6", "Khối 7", "Khối 8", "Khối 9", "Khối 10", "Khối 11", "Khối 12"];

    // Ví dụ dữ liệu thực tế
    const realData = [81, 82, 60, 95, 30, 90, 80, 45, 82, 60, 95, 30, 90, 80];
    const realData2 = [45, 82, 60, 95, 30, 90, 80, 45, 82, 60, 95, 30, 90, 80];
    return (
        <div>
            <div>
                <GenericBarChart
                    showDefaultInsight={true}
                    // title="Tiến độ hoàn thành KPI"
                    labels={subjects}
                    title={"Báo cáo hoàn thành mục tiêu KPI về tỉ lệ học sinh đạt từ 7 trở lên các môn học"}
                    data={realData}
                    referenceLineValue={80}
                >
                    <RadioDropdown placeholder={"KPI MOET: Tỉ lệ học sinh đạt từ 7 trở lên"}/>
                    <RadioDropdown placeholder={"Khối 11"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
                </GenericBarChart>
                <GenericBarChart
                    title={"Báo cáo hoàn thành mục tiêu KPI về tỉ lệ học sinh đạt từ 7 trở lên các khối học"}

                    // title="Tiến độ hoàn thành KPI"
                    labels={ khoiLop }
                    showDefaultInsight={true}
                    data={realData2}
                    subLabels={["Q1", "Q2"]}
                    referenceLineValue={80} // Đường KPI tại 80%
                >
                    <RadioDropdown placeholder={"VN TOÁN"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1 và Q2"}/>
                </GenericBarChart>
                <ScatterPlotChart/>
            </div>
        </div>
    );
};

export default Sed;