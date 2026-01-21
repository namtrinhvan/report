// --- CẤU HÌNH DỮ LIỆU ---

// 1. Danh sách 36 thành phố (Đủ cho 12 khối x 3 lớp = 36 lớp)
const CITIES = [
    // Khối 1
    'Amsterdam', 'Berlin', 'Cairo',
    // Khối 2
    'Dublin', 'Edmonton', 'Florence',
    // Khối 3
    'Geneva', 'Havana', 'Istanbul',
    // Khối 4
    'Jakarta', 'Kyoto', 'Lisbon',
    // Khối 5
    'Madrid', 'Nairobi', 'Osaka',
    // Khối 6
    'Paris', 'Quebec', 'Rome',
    // Khối 7
    'Seoul', 'Tokyo', 'Utrecht',
    // Khối 8
    'Venice', 'Warsaw', 'Xiamen',
    // Khối 9
    'York', 'Zurich', 'Athens',
    // Khối 10
    'Boston', 'Chicago', 'Denver',
    // Khối 11
    'Sydney', 'Melbourne', 'Brisbane',
    // Khối 12
    'Toronto', 'Vancouver', 'Montreal'
];

// 2. Từ điển tên tiếng Việt
const HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const DEM = ['Văn', 'Thị', 'Đức', 'Ngọc', 'Minh', 'Thanh', 'Quang', 'Xuân', 'Thu', 'Hồng', 'Gia', 'Khánh', 'Hải', 'Mạnh', 'Thùy'];
const TEN = ['Minh', 'Lan', 'Hưng', 'Ngọc', 'Quang', 'Mai', 'Anh', 'Dũng', 'Hà', 'Linh', 'Tâm', 'Thảo', 'Tuấn', 'Hùng', 'Trang', 'Kiên', 'Vy', 'Sơn', 'Phúc', 'Nhi'];

// --- HÀM TIỆN ÍCH ---
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Hàm tạo tên học sinh
const generateName = () => `${getRandomItem(HO)} ${getRandomItem(DEM)} ${getRandomItem(TEN)}`;

// --- HÀM SINH DỮ LIỆU CHÍNH (GENERATOR) ---
const generateSchoolData = () => {
    const classes = [];
    const students = [];
    let studentCounter = 1;
    let cityIndex = 0;

    // Duyệt từ Khối 1 đến Khối 12
    for (let grade = 1; grade <= 12; grade++) {

        // Xác định cấp học (Level)
        let level = 'TIEU_HOC';
        if (grade >= 6 && grade <= 9) level = 'TRUNG_HOC';
        if (grade >= 10) level = 'TRUNG_HOC';

        // Mỗi khối tạo đúng 3 lớp
        for (let c = 1; c <= 3; c++) {
            // Lấy tên thành phố từ mảng, đảm bảo không lỗi nếu mảng thiếu (dù đã đủ 36)
            const cityName = CITIES[cityIndex % CITIES.length];
            const className = `${grade} ${cityName}`; // Ví dụ: 1 Amsterdam

            // Thêm lớp vào danh sách
            classes.push({
                value: className,
                label: className,
                grade: grade.toString(), // Ép sang String ở đây
                level: level,
                campus: 'THT'
            });

            // Sinh học sinh cho lớp (Ngẫu nhiên 5 - 10 em)
            const numStudents = getRandomInt(5, 10);

            for (let s = 0; s < numStudents; s++) {
                // Tạo ID dạng HS001, HS002...
                const studentId = `HS${studentCounter.toString().padStart(3, '0')}`;

                students.push({
                    value: studentId,
                    label: generateName(),
                    class: className,
                    grade: grade.toString(),
                    level: level,
                    campus: 'THT'
                });

                studentCounter++;
            }

            // Tăng index để lấy thành phố tiếp theo cho lớp sau
            cityIndex++;
        }
    }

    return { classes, students };
};

// --- KẾT QUẢ ---
const { classes, students } = generateSchoolData();

// Log ra console để kiểm tra số lượng (Bạn có thể xóa dòng này khi dùng thật)
console.log(`Đã tạo thành công: ${classes.length} lớp và ${students.length} học sinh.`);
console.log(classes)
// Export dữ liệu
export { classes, students };