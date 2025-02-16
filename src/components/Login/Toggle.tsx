import { ToggleProps } from "../../utils/types";

// Constants for styling classes to improve maintainability
const TOGGLE_BASE_CLASSES = [
  "relative",
  "w-[56px]",
  "sm:w-14",
  "h-7",
  "rounded-full",
  "peer",
  "dark:bg-gray-700",
  "transition-all",
].join(" ");

const TOGGLE_FOCUS_CLASSES = [
  "peer-focus:outline-none",
  "peer-focus:ring-4",
  "peer-focus:ring-blue-300",
  "dark:peer-focus:ring-blue-800",
].join(" ");

const TOGGLE_SLIDER_CLASSES = [
  "after:content-['']",
  "after:absolute",
  "after:top-0.5",
  "after:start-[4px]",
  "after:bg-white",
  "after:border-gray-300",
  "after:border",
  "after:rounded-full",
  "after:h-6",
  "after:w-6",
  "after:transition-all",
  "dark:border-gray-600",
  "peer-checked:after:translate-x-full",
  "rtl:peer-checked:after:-translate-x-full",
  "peer-checked:after:border-white",
].join(" ");

/**
 * Toggle component for boolean input
 * @param name - Input field name
 * @param value - Current toggle state
 * @param onChange - Change handler function
 */
const Toggle = ({ name, value, onChange }: ToggleProps) => {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="sr-only peer"
        aria-checked={value}
        role="switch"
        aria-label={name}
      />
      <div
        className={`${value ? "bg-orange-400" : "bg-blue-500"} ${TOGGLE_BASE_CLASSES} ${TOGGLE_FOCUS_CLASSES} ${TOGGLE_SLIDER_CLASSES}`}
      />
    </label>
  );
};

export default Toggle;
