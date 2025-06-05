import { useState } from "react";

function ColorPicker({ register, columnName, id, name }) {
  const [color, setColor] = useState("");

  return (
    <input
      type="color"
      id={id}
      name={name}
      {...register(columnName)}
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );
}

export default ColorPicker;
