import { FC, ChangeEvent, memo } from 'react';

// Move interface to a separate types file if used across multiple components
interface CheckOptionProps {
  /** Unique identifier for the checkbox */
  name: string;
  /** Current checked state */
  checked: boolean;
  /** Label text displayed next to checkbox */
  label: string;
  /** Additional descriptive content shown below the checkbox */
  content: string;
  /** Handler function for checkbox change events */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Move to a separate constants file if these styles are reused
const STYLES = {
  wrapper: 'w-full',
  checkboxGroup: 'flex gap-2 items-center',
  checkbox: {
    dimensions: 'w-[19px] h-[19px]',
    border: 'border-2 border-black',
    container: 'flex items-center rounded-md',
    input: 'accent-[#FFCE01] w-full h-full border-none',
  },
  text: {
    label: 'text-[14px] sm:text-[18px] font-bold',
    content: 'text-[14px] sm:text-[18px] font-medium leading-6 opacity-60 ms-7',
  },
} as const;

/**
 * CheckOption Component
 * 
 * A reusable checkbox component with a label and description.
 * Follows accessibility best practices and provides consistent styling.
 * 
 * @example
 * ```tsx
 * <CheckOption
 *   name="terms"
 *   checked={isChecked}
 *   label="Accept Terms"
 *   content="I agree to the terms and conditions"
 *   onChange={handleChange}
 * />
 * ```
 */
const CheckOption: FC<CheckOptionProps> = memo(({
  name,
  checked,
  label,
  content,
  onChange,
}) => {
  const checkboxId = `checkbox-${name}`;
  const descriptionId = `${name}-description`;

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.checkboxGroup}>
        <div
          className={`${STYLES.checkbox.dimensions} ${STYLES.checkbox.border} ${STYLES.checkbox.container}`}
        >
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            className={STYLES.checkbox.input}
            onChange={onChange}
            aria-label={label}
            aria-describedby={descriptionId}
          />
        </div>

        <label
          htmlFor={checkboxId}
          className={STYLES.text.label}
        >
          {label}
        </label>
      </div>

      <div
        className={STYLES.text.content}
        role="note"
      >
        <p id={descriptionId}>
          {content}
        </p>
      </div>
    </div>
  );
});

// Add display name for better debugging
CheckOption.displayName = 'CheckOption';

export default CheckOption;
