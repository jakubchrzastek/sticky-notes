import { NOTE_COLORS, type Note } from "../types";
import "./ColorPicker.scss";

type ColorPickerProps = {
  color: Note["color"];
  onChange: (color: Note["color"]) => void;
};

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <span className="color-picker">
      {NOTE_COLORS.map((item) => (
        <button
          key={item}
          type="button"
          className={`
            color-picker__button
            color-picker__button--${item}
            ${color === item ? "active" : ""}
          `}
          onPointerDown={(event) => {
            event.stopPropagation();
            onChange(item);
          }}
        />
      ))}
    </span>
  );
};
