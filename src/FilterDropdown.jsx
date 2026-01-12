import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import styles from './FilterDropdown.module.scss';

const FilterDropdown = ({
                            label,
                            options = [],
                            value,
                            onChange,
                            disabled = false,
                            placeholder = "Chọn..."
                        }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Logic Click Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logic Handle Select
    const handleSelect = (optionValue) => {
        if (!disabled) {
            if (value !== optionValue) {
                onChange(optionValue);
            }
            setIsOpen(false);
        }
    };

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
        <div
            className={`${styles.container} ${disabled ? styles.disabled : ''}`}
            ref={containerRef}
        >
            {label && <div className={styles.label}>{label}</div>}

            <div
                className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={`${styles.text} ${!selectedOption ? styles.placeholderText : ''}`}>
                    {displayValue}
                </span>
                <span className={`${styles.icon} ${isOpen ? styles.rotate : ''}`}>
                    <FaChevronDown size={12} />
                </span>
            </div>

            {isOpen && !disabled && (
                <div className={styles.dropdown}>
                    <ul className={styles.list}>
                        {/* Option Reset */}
                        <li
                            className={`${styles.option} ${!value ? styles.selected : ''}`}
                            onClick={() => handleSelect(null)}
                        >
                            <span className={styles.optionLabel}>{placeholder}</span>
                            {!value && <FaCheck className={styles.checkIcon} size={12} />}
                        </li>

                        {/* List Options */}
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <li
                                    key={option.value}
                                    className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <span className={styles.optionLabel}>{option.label}</span>
                                    {isSelected && <FaCheck className={styles.checkIcon} size={12} />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

FilterDropdown.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default FilterDropdown;