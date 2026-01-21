import React from 'react';
import GenericBarChart from "./GenericBarChart.jsx";
import RadioDropdown from "./RadioDropdown.jsx";
import GenericPieChart from "./GenericPieChart.jsx";
import CheckboxDropdown from "./CheckboxDropdown.jsx";

const Teacher = () => {
    const semesters = ["Giữa HKI", "Cúối HKI", "Giữa HKII", "Cúối HKII", 'HK1', "HK2"]
    const students = [
        "8D VN MATH 2B",
        "Trần Bảo Minh",
        "Vũ Tú Mai",
        "Bùi Hải Phong",
        "Nguyễn Quỳnh Anh",
        "Nguyễn Nhật Huy",
        "Kang Younggun",
        "Nguyễn Phúc Minh Đăng",
        "Nguyễn Dương Thùy Anh",
        "Nguyễn Công Bảo Khánh",
        "Nguyễn Hoàng Bảo Minh",
        "Hồ Hoàng Minh Sương",
        "Lã Đăng Dũng"
    ];
    const tieuChuanNangLuc = [
        "Học sinh áp dụng được các kiến thức, kỹ năng đã học để thực hiện dự án, hoạt động học tập có tính thực tiễn.",
        "Học sinh có thể nắm được các kiến thức về từ giác.",
        "Học sinh có thể nắm được các kiến thức về hằng đẳng thức đáng nhớ và ứng dụng.",
        "Học sinh có thể nắm được các kiến thức về đa thức, phép biến hình.",
        "Học sinh có thể nắm được các kiến thức về phương trình và hàm số.",
        "Học sinh có thể nắm được các kiến thức về giải tích đại số.",
        "Học sinh có thể nắm được các kiến thức về xác suất và biến cố.",
        "Học sinh có thể nắm được các kiến thức về dữ liệu và thống kê.",
        "Học sinh có thể nắm được các kiến thức về tam giác đồng dạng và hình đồng dạng."
    ];

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                backgroundColor: 'white',
                marginBottom: '16px', // bạn có thể điều chỉnh
                padding: '8px' // thêm padding nếu muốn dropdown không dính sát viền
            }}>
                <RadioDropdown options={[{label: "2025 - 2026", value: '2'}]} placeholder={"2025 - 2026"}/>
                <RadioDropdown options={[{label: "EXPLORE", value: '2'}, {label: "DISCOVER", value: '2'}]}
                               placeholder={"DISCOVER"}/>
                <RadioDropdown options={[{label: "VN VẬT LÝ", value: '2'}, {label: "VN HÓA HỌC", value: '2'}]}
                               placeholder={"VN TOÁN"}/>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                }}
            >
                <GenericBarChart
                    labels={semesters}
                    title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt từ 7 trở lên môn VN TOÁN"}
                    referenceLineValue={80}
                    fluctuate={true}
                >
                    <RadioDropdown value={'2'} placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}
                                   options={[
                                       {label: 'Tỉ lệ học sinh đạt từ 7 trở lên', value: '2'},
                                       {label: 'Tỉ lệ học sinh đạt dưới 5', value: '1'},
                                       {label: 'Tỉ lệ học sinh đạt từ PR trở lên', value: '1'},
                                       {label: 'Tỉ lệ học sinh đạt dưới EM', value: '1'},
                                   ]}
                    />
                </GenericBarChart>

                <GenericPieChart title={"Báo cáo tỷ lệ kết quả học tập theo thang điểm TDS"} labels={['PR', 'EM', 'NOV']}/>

                <div style={{gridColumn: "1 / -1"}}>
                    <GenericBarChart
                        labels={['ĐẠI SỐ', "HÌNH HỌC VÀ ĐO LƯỜNG", "XÁC SUẤT THỐNG KÊ", "DỰ ÁN VÀ TRẢI NGHIỆM"]}
                        referenceLineValue={80}
                        title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt Từ PR trở lên các trọng tâm"}
                        subLabels={['Q1', 'Q2', 'Q3']}
                    >
                        <RadioDropdown value={'2'} placeholder={"Tỉ lệ học sinh đạt từ 7 trở lên"}
                                       options={[
                                           {label: 'Tỉ lệ học sinh đạt từ 7 trở lên', value: '2'},
                                           {label: 'Tỉ lệ học sinh đạt dưới 5', value: '1'},
                                           {label: 'Tỉ lệ học sinh đạt từ PR trở lên', value: '1'},
                                           {label: 'Tỉ lệ học sinh đạt dưới EM', value: '1'},
                                       ]}
                        />
                        <CheckboxDropdown placeholder={"Đã chọn Q1, Q2 và Q4"}/>
                    </GenericBarChart>
                </div>
            </div>

            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                title={"Báo cáo kết quả trọng tâm HÌNH HỌC VÀ ĐO LƯỜNG của tất cả học sinh theo kì"}
                labels={students}
                system={true}
                referenceLineValue={3.2}
                subLabels={['Q1', 'Q2']}
            >
                {/*//Chọn FP và hiển thị điểm cho từng học sinh (mỗi học sinh là 1 cột).OK*/}
                <RadioDropdown placeholder={"HÌNH HỌC VÀ ĐO LƯỜNG"}/>
                <CheckboxDropdown placeholder={"Đã chọn Q1 và Q2"}/>
            </GenericBarChart>
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                labels={tieuChuanNangLuc}
                referenceLineValue={80}
                title={"Báo cáo hoàn thành mục tiêu cơ sở về tỉ lệ học sinh đạt từ PR trở lên các tiêu chuẩn năng lực"}
                subLabels={['Q1', 'Q2', 'Q3', 'Q4']}
            >
                {/*//Chọn 1 hoặc nhiều FP và hiển thị điểm cả lớp cho từng PS theo các kỳ và quarter. OK*/}
                <CheckboxDropdown placeholder={"Đã chọn HÌNH HỌC VÀ ĐO LƯỜNG"}/>
            </GenericBarChart>
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                labels={students}
                title={"Báo cáo kết quả tiêu chuẩn năng lực môn học của tất cả học sinh theo kì"}
                referenceLineValue={3.2}
                system={true}
                subLabels={['Q2', 'Q3', 'Q4']}
            >
                {/*//Chọn PS và hiển thị điểm cho từng học sinh (mỗi học sinh là 1 cột). OK*/}
                <RadioDropdown placeholder={"Học sinh có thể nắm được các kiến thức về giải tích đại số."}/>
                <CheckboxDropdown placeholder={"Đã chọn Q2, Q3 và Q4"}/>
            </GenericBarChart>

        </div>
    );
};

export default Teacher;