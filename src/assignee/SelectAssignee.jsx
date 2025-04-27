function SelectAssignee({ options, selectedValue, onSelect, ...props }) {
  return (
    <div {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)} // 🔹 Correct event handling
          style={{
            backgroundColor: selectedValue === option.value ? "#ccc" : "#fff",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SelectAssignee;
