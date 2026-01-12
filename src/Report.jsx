import React, { useState, useEffect, useMemo } from 'react';
import styles from './Report.module.scss';
import FilterDropdown from './FilterDropdown.jsx';

// Import các sub-component
import Superintendent from './Superintendent';
import Sed from './sed/Sed.jsx';
import HopDhop from './hop/HopDhop.jsx';
import LeadTeacher from './LeadTeacher';
import Teacher from './Teacher';
import Student from './Student';
import RadioDropdown from "./RadioDropdown.jsx";
import {classes, students} from "./mockData.js";

// --- MOCK DATA ---
const MOCK_DB = {
    years: [
        { value: '2025-2026', label: '2025-2026' },
        { value: '2024-2025', label: '2024-2025' },
    ],
    programs: [
        { value: 'DISCOVER', label: 'DISCOVER' },
        { value: 'EXPLORE', label: 'EXPLORE' }
    ],
    campuses: [
        { value: 'THT', label: 'TDS Tây Hồ Tây' },
        { value: 'OCP', label: 'TDS Ocean Park' },
        { value: 'CG', label: 'TDS Cầu Giấy' }
    ],
    levels: [
        { value: 'TIEU_HOC', label: 'ES' },
        { value: 'TRUNG_HOC', label: 'MHS' }
    ],
    grades: {
        'TIEU_HOC': [
            { value: '1', label: 'Khối 1' },
            { value: '2', label: 'Khối 2' },
            { value: '3', label: 'Khối 3' },
            { value: '4', label: 'Khối 4' },
            { value: '5', label: 'Khối 5' }
        ],
        'TRUNG_HOC': [
            { value: '6', label: 'Khối 6' },
            { value: '7', label: 'Khối 7' },
            { value: '8', label: 'Khối 8' },
            { value: '9', label: 'Khối 9' },
            { value: '10', label: 'Khối 10' },
            { value: '11', label: 'Khối 11' },
            { value: '12', label: 'Khối 12' }
        ]
    },
    classes,
    students
};

// --- DANH SÁCH ROLE ---
const ROLES = [
    { value: 'SUPERINTENDENT', label: 'Tổng Hiệu trưởng' },
    { value: 'SED', label: 'Giám đốc Điều hành' },
    { value: 'HOP', label: 'Giám đốc Chương trình' },
    { value: 'LEADER', label: 'Tổ trưởng' },
    { value: 'TEACHER', label: 'Giáo viên' }
];

const Report = () => {
    // 1. Giả lập Role hiện tại
    const [currentRole, setCurrentRole] = useState('SUPERINTENDENT');

    // 2. State bộ lọc
    const [filters, setFilters] = useState({
        year: MOCK_DB.years[0].value,
        program: MOCK_DB.programs[0].value,
        campus: null,
        level: null,
        grade: null,
        class: null,
        student: null
    });

    // 3. Logic: Khi đổi Role, tự động set các giá trị Mặc định & Reset
    useEffect(() => {
        const newFilters = {
            year: MOCK_DB.years[0].value,
            program: MOCK_DB.programs[0].value,
            campus: null,
            level: null,
            grade: null,
            class: null,
            student: null
        };

        switch (currentRole) {
            case 'SUPERINTENDENT':
                break;
            case 'SED':
                newFilters.campus = 'THT';
                break;
            case 'HOP':
                newFilters.campus = 'THT';
                newFilters.level = 'TIEU_HOC';
                break;
            case 'LEADER':
                newFilters.campus = 'THT';
                newFilters.level = null; // Tổ trưởng span nhiều cấp -> Level null
                break;
            case 'TEACHER':
                newFilters.campus = 'THT';
                newFilters.level = null; // GV span nhiều cấp/khối -> Level null
                newFilters.grade = null; // GV span nhiều khối -> Grade null
                break;
            default:
                break;
        }
        setFilters(newFilters);
    }, [currentRole]);


    // 4. Handler thay đổi bộ lọc
    const handleFilterChange = (key, value) => {

        // FIX: Khi chọn học sinh, CHỈ cập nhật học sinh, KHÔNG thay đổi các filter khác (tránh auto-fill)
        if (key === 'student') {
            setFilters(prev => ({
                ...prev,
                student: value
            }));
            return;
        }

        setFilters(prev => {
            const next = { ...prev, [key]: value };

            // Logic Reset Cascading: Khi thay đổi filter cha, reset filter con
            if (key === 'campus') { next.level = null; next.grade = null; next.class = null; next.student = null; }
            if (key === 'level')  { next.grade = null; next.class = null; next.student = null; }
            if (key === 'grade')  { next.class = null; next.student = null; }
            if (key === 'class')  { next.student = null; }

            return next;
        });
    };

    // 5. Logic Khóa (Disabled) Dropdown
    const isFilterDisabled = (key) => {
        if (key === 'year' || key === 'program') return false;

        switch (currentRole) {
            case 'SUPERINTENDENT':
                return false;
            case 'SED':
                return key === 'campus';
            case 'HOP':
                return key === 'campus' || key === 'level';
            case 'LEADER':
                // Tổ trưởng bị khóa Cấp, chỉ chọn Khối/Lớp
                return key === 'campus' || key === 'level';
            case 'TEACHER':
                // GV bị khóa Cấp & Khối, chỉ chọn Lớp
                return key === 'campus' || key === 'level' || key === 'grade';
            default:
                return false;
        }
    };

    // 6. Data Dependencies (Dependent Dropdowns Logic)

    // A. Lọc danh sách KHỐI
    const availableGrades = useMemo(() => {
        // Nếu đã chọn Cấp -> Chỉ hiện khối của cấp đó
        if (filters.level) {
            return MOCK_DB.grades[filters.level] || [];
        }

        // Nếu chưa chọn Cấp (Trường hợp Leader/Teacher hoặc SED chưa chọn):
        // Ta gộp (flatten) tất cả khối lại để hiển thị
        return Object.values(MOCK_DB.grades).flat();
    }, [filters.level, currentRole]);

    // B. Lọc danh sách LỚP (Logic Filter tuần tự)
    const availableClasses = useMemo(() => {
        let filtered = MOCK_DB.classes;

        // 1. Lọc theo Cơ sở (luôn luôn nếu có)
        if (filters.campus) {
            filtered = filtered.filter(c => c.campus === filters.campus);
        }

        // 2. Lọc theo Cấp (nếu có)
        if (filters.level) {
            filtered = filtered.filter(c => c.level === filters.level);
        }

        // 3. Lọc theo Khối (nếu có)
        if (filters.grade) {
            filtered = filtered.filter(c => c.grade === filters.grade);
        }

        return filtered;
    }, [filters.campus, filters.level, filters.grade]);

    // C. Lọc danh sách HỌC SINH (Hỗ trợ Global Search & Context Search)
    const availableStudents = useMemo(() => {
        // Nếu đã chọn Lớp: Chỉ hiện HS lớp đó
        if (filters.class) {
            return MOCK_DB.students.filter(s => s.class === filters.class);
        }

        // Nếu chưa chọn Lớp: Lọc dần theo các cấp cha ĐANG ĐƯỢC CHỌN
        let filtered = MOCK_DB.students;

        if (filters.campus) filtered = filtered.filter(s => s.campus === filters.campus);
        if (filters.level) filtered = filtered.filter(s => s.level === filters.level);
        if (filters.grade) filtered = filtered.filter(s => s.grade === filters.grade);

        return filtered;
    }, [filters.class, filters.grade, filters.level, filters.campus]);


    // 7. Render Content Logic
    const renderContent = () => {
        const { campus, level, grade, class: selectedClass, student } = filters;

        // --- LAYER 0: VIEW CÁ NHÂN ---
        // Ưu tiên cao nhất. Có học sinh là hiển thị Student View ngay.
        if (student) {
            return <Student filters={filters} />;
        }

        // --- LAYER 1: VIEW LỚP ---
        if (selectedClass) {
            return <Teacher filters={filters} mode={currentRole === 'TEACHER' ? 'edit' : 'view'} />;
        }

        // --- LAYER 2: VIEW KHỐI ---
        if (grade) {
            if (currentRole === 'TEACHER') {
                return <div className={styles.emptyState}>Vui lòng chọn <b>Lớp</b> để bắt đầu báo cáo.</div>;
            }
            return <LeadTeacher filters={filters} />;
        }

        // --- LAYER 3: VIEW CẤP ---
        if (level) {
            if (currentRole === 'TEACHER') return <div className={styles.emptyState}>Vui lòng chọn <b>Lớp</b>.</div>;
            if (currentRole === 'LEADER') return <div className={styles.emptyState}>Vui lòng chọn <b>Khối</b>.</div>;
            return <HopDhop filters={filters} />;
        }

        // --- LAYER 4: VIEW CƠ SỞ ---
        if (campus) {
            // FIX: Hiển thị thông báo Empty State cho các Role thấp khi chưa chọn đủ Filter con
            if (currentRole === 'TEACHER') return <div className={styles.emptyState}>Vui lòng chọn <b>Lớp</b> để xem báo cáo.</div>;
            if (currentRole === 'LEADER') return <div className={styles.emptyState}>Vui lòng chọn <b>Khối</b> để xem báo cáo.</div>;
            if (currentRole === 'HOP') return <div className={styles.emptyState}>Vui lòng chọn <b>Cấp học</b> để xem báo cáo.</div>;

            return <Sed filters={filters} />;
        }

        // --- LAYER 5: VIEW TỔNG ---
        // FIX: Hiển thị thông báo cho Tổng hiệu trưởng khi chưa chọn cơ sở
        return <div className={styles.emptyState}>Vui lòng chọn <b>Cơ sở</b> để bắt đầu.</div>;
    };

    return (
        <div className={styles.dashboardContainer}>

            <div className={styles.filterBar}>
                <RadioDropdown options={[{label: "2025 - 2026", value: '2'}]} placeholder={"2025 - 2026"}/>
                <RadioDropdown value={'2'} options={[{label: "EXPLORE", value: '1'}, {label: "DISCOVER", value: '2'}, {label: "JOURNEY", value: '3'}]}
                               placeholder={"DISCOVER"}/>

                <FilterDropdown
                    label="Cơ sở"
                    options={MOCK_DB.campuses}
                    value={filters.campus}
                    onChange={(v) => handleFilterChange('campus', v)}
                    disabled={isFilterDisabled('campus')}
                    placeholder={currentRole === 'SUPERINTENDENT' ? "Chọn cơ sở..." : "..."}
                />

                <FilterDropdown
                    label="Cấp học"
                    options={MOCK_DB.levels}
                    value={filters.level}
                    onChange={(v) => handleFilterChange('level', v)}
                    disabled={isFilterDisabled('level') || !filters.campus}
                />

                <FilterDropdown
                    label="Khối"
                    options={availableGrades}
                    value={filters.grade}
                    onChange={(v) => handleFilterChange('grade', v)}
                    // Disable nếu chưa chọn Level VÀ không phải là Leader
                    disabled={isFilterDisabled('grade') || (!filters.level && currentRole !== 'LEADER')}
                />

                <FilterDropdown
                    label="Lớp"
                    options={availableClasses}
                    value={filters.class}
                    onChange={(v) => handleFilterChange('class', v)}
                    // Disable nếu chưa chọn Grade VÀ không phải là Teacher
                    disabled={isFilterDisabled('class') || (!filters.grade && currentRole !== 'TEACHER')}
                />

                <FilterDropdown
                    label="Học sinh"
                    options={availableStudents}
                    value={filters.student}
                    onChange={(v) => handleFilterChange('student', v)}
                    placeholder="Tìm học sinh..."
                    isSearchable={true}
                />
                <div className={styles.roleSwitcher}>
                    <span>[DEV] Role: </span>
                    <RadioDropdown mw={200} value={currentRole} onChange={setCurrentRole} options={ROLES}/>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className={styles.contentArea}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Report;