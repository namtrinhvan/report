import React from 'react';
import GenericBarChart from "./GenericBarChart.jsx";
import RadioDropdown from "./RadioDropdown.jsx";
import CheckboxDropdown from "./CheckboxDropdown.jsx";

const LeadTeacher = () => {
    const classes = ['Khối 4','4 Miami', '4 Washington', '4 Caracas', '4 Beijing'];
    const realData = [81, 82, 60, 95, 30, 90, 80, 45, 82, 60, 95, 30, 90, 80];
    const categories = ['TỪ VỰNG', 'VĂN BẢN'];
    const transcription = [
        "Học sinh có thể tạo ra và dùng bài văn nghị luận.",
        "Học sinh có thể vận dụng các kĩ thuật để làm ra một đoạn văn nghị luận.",
        "Học sinh có thể tạo ra và dùng đoạn văn nghị luận theo cấu trúc năm câu."
    ];
    return (
        <div>
            <GenericBarChart

                fluctuate={true}
                // title="Tiến độ hoàn thành KPI"
                title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt từ 7 trở lên môn TIẾNG VIỆT các lớp học"}
                labels={classes}
                subLabels={['Q1']}
                referenceLineValue={80} // Đường KPI tại 80%
            >
                <RadioDropdown  value={'2'} placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}
                                options={[
                                    {label: 'Tỉ lệ học sinh đạt từ 7 trở lên', value: '2'},
                                    {label: 'Tỉ lệ học sinh đạt dưới 5', value: '1'},
                                    {label: 'Tỉ lệ học sinh đạt từ PR trở lên', value: '1'},
                                    {label: 'Tỉ lệ học sinh đạt dưới EM', value: '1'},
                                ]}
                />
                <RadioDropdown placeholder={"TIẾNG VIỆT"}/>
                <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
            </GenericBarChart>
                <GenericBarChart
                    title={"Báo cáo kết quả trọng tâm môn TIẾNG VIỆT Khối 4"}
                    fluctuate={true}
                    // title="Tiến độ hoàn thành KPI"
                    labels={categories}
                    data={realData}
                    subLabels={['Q1', 'Q2']}
                    referenceLineValue={80} // Đường KPI tại 80%
                >
                    <RadioDropdown placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}/>
                    <RadioDropdown placeholder={"TIẾNG VIỆT"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
                </GenericBarChart>
                <GenericBarChart
                    fluctuate={true}
                    // title="Tiến độ hoàn thành KPI"
                    labels={classes}
                    data={realData}                subLabels={['Q1', 'Q2']}

                >
                    <RadioDropdown placeholder={"VĂN BẢN"}/>
                    <CheckboxDropdown placeholder={"Đã chọn Q1 và Q2"}/>
                </GenericBarChart>
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                labels={transcription}
                data={realData}
                referenceLineValue={3.28}
                system={true}
                subLabels={['Q1']}
            >
                <RadioDropdown placeholder={"Đã chọn FP VĂN BẢN và TỪ VỰNG"}/>
                <CheckboxDropdown placeholder={"Đã chọn Q1"}/>
            </GenericBarChart>
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                fluctuate={true}
                labels={['4 Miami', '4 Washington', '4 Caracas', '4 Beijing']}
                subLabels={['Q1', 'Q2', 'Q3']}
                data={realData}
                referenceLineValue={80}
            >
                <RadioDropdown placeholder={"Học sinh có thể tạo ra và dùng bài văn nghị luận."}/>
                <CheckboxDropdown placeholder={"Đã chọn Q1, Q2 và Q3"}/>
            </GenericBarChart>
        </div>
    );
};

export default LeadTeacher;