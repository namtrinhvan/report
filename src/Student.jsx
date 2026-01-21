import React from 'react';
import GenericBarChart from "./GenericBarChart.jsx";
import RadioDropdown from "./RadioDropdown.jsx";
import {Scatter} from "recharts";
import ScatterPlotChart from "./ScatterPlotChart.jsx";
import CheckboxDropdown from "./CheckboxDropdown.jsx";

const Student = () => {
    const learningOutcomes = [
        "Học sinh áp dụng được các kiến thức, kỹ năng đã học để thực hiện dự án, hoạt động học tập có tính thực tiễn.",
        "Học sinh có thể nắm được các kiến thức về từ giác.",
        "Học sinh có thể nắm được các kiến thức về hằng đẳng thức đáng nhớ và ứng dụng.",
        "Học sinh có thể nắm được các kiến thức về đa thức nhiều biến.",
        "Học sinh có thể nắm được các kiến thức về phương trình và hàm số.",
        "Học sinh có thể nắm được các kiến thức về phân thức đại số.",
        "Học sinh có thể nắm được các kiến thức về xác suất và biến cố.",
        "Học sinh nắm được các kiến thức về dữ liệu và thống kê.",
        "Học sinh nắm được các kiến thức về một số hình khối trong thực tiễn.",
        "Học sinh có thể nắm được các kiến thức về tam giác đồng dạng và hình đồng dạng."
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
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                labels={['ĐẠI SỐ', "HÌNH HỌC VÀ ĐO LƯỜNG", "XÁC SUẤT THỐNG KÊ", "DỰ ÁN VÀ TRẢI NGHIỆM"]}
                referenceLineValue={3.2}
                system={true}
                subLabels={['Q2', 'Q3', 'Q4']}
            >
                {/*//Chọn học sinh, hiển thị tất cả fp của môn đó theo các kỳ và qarter. OK*/}
                <RadioDropdown options={[{label: "VN VẬT LÝ", value: '2'}, {label: "VN HÓA HỌC", value: '2'}]}
                               placeholder={"VN TOÁN"}/> <CheckboxDropdown placeholder={"Đã chọn Q2, Q3 và Q4"}/>
            </GenericBarChart>
            <GenericBarChart
                // title="Tiến độ hoàn thành KPI"
                labels={tieuChuanNangLuc}
                referenceLineValue={3.2}
                system={true}
                subLabels={['Q2', 'Q3', 'Q4']}
            >
                {/*//Chọn học sinh, chọn 1 hoặc nhiều FP, lọc và hiển thị tất cả ps của môn đó theo các kỳ và quarter*/}
                <RadioDropdown options={[{label: "VN VẬT LÝ", value: '2'}, {label: "VN HÓA HỌC", value: '2'}]}
                               placeholder={"VN TOÁN"}/> <CheckboxDropdown placeholder={"Đã chọn Q2, Q3 và Q4"}/>
            </GenericBarChart>
        </div>
    );
};

export default Student;