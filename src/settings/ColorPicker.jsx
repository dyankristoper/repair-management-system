function ColorPicker({ register, columnName, id, name }) {
  return (
    <input
      type="color"
      id={id}
      name={name}
      {...register(columnName, {
        required: true,
        pattern: {
          value: /^#[0-9A-Fa-f]{6}$/,
          message: "Invalid color format. Use #rrggbb",
        },
      })}
      defaultValue="#ffffff"
    />
  );
}

export default ColorPicker;
