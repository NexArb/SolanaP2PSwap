import React, { ChangeEventHandler, useMemo } from 'react';

/** Props for the FormSwitch component */
export type FormSwitchPropsType = {
  /** If the toggle should be enabled */
  checked: boolean;
  /** Called toggle state is changed */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Renders a larger version of the switch */
  isLarge?: boolean;
  /** Element to render left of switch */
  left?: React.ReactElement;
  /** Element to render right of switch */
  right?: React.ReactElement;
};

/** Renders a toggle switch component */
export default function FormSwitch({
  checked,
  onChange,
  isLarge,
  left,
  right,
}: Readonly<FormSwitchPropsType>) {
  /** Classes for switch based on input props */
  const classNames = useMemo(() => {
    const classes = [];
    if (isLarge) classes.push('w-14 h-8 after:h-6 after:w-6');
    else classes.push('w-12 h-6 after:h-4 after:w-4');
    if (checked) {
      classes.push(
        'after:translate-x-6 rtl:peer-checked:after:-translate-x-6 dark:bg-primaryDark bg-primary border-primary after:bg-primaryDark dark:after:bg-primaryDark-contrast dark:border-primaryDark',
      );
    } else {
      classes.push(
        'after:opacity-40 after:bg-primary dark:after:bg-primaryDark border border-surface-dark',
      );
    }
    classes.push(
      `border peer-focus:outline-none rounded-xxl peer after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:rounded-xxl after:transition-all dark:border-surfaceDark-dark`,
    );
    return classes.join(' ');
  }, [isLarge, checked]);
  return (
    <div className="flex flex-col justify-center select-none">
      <label className="inline-flex gap-2 cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <span>{left}</span>
        <div className="relative inline-flex flex-col">
          <div className={classNames}></div>
        </div>
        <span>{right}</span>
      </label>
    </div>
  );
}
