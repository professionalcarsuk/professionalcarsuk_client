import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`custom-select-wrapper ${className}`}
      onClick={handleToggle}
    >
      <div
        className={`custom-select ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        <span className="custom-select__value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="custom-select__arrow"></span>
      </div>
      {isOpen && (
        <div className="custom-select__dropdown">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${
                option.value === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
