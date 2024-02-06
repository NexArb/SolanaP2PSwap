import React, { HTMLProps, useMemo } from 'react';

/** Props for the Stack component */
export type StackPropsType = HTMLProps<HTMLDivElement> & {
  /** Makes the stack horizontal */
  isRow?: boolean;
  /** Makes the stack direction reverse */
  isReverse?: boolean;
  /** Item spacing in configured tailwind spacing units */
  spacing?: number;
};

/** Renders a horizontal or vertical list */
export default function Stack({
  isRow,
  spacing,
  className,
  isReverse,
  ...props
}: StackPropsType) {
  const classes = useMemo(() => {
    const classes = ['flex'];
    let dirClass = 'flex-col';
    if (isRow) dirClass = 'flex-row';
    if (isReverse) dirClass += '-reverse';
    classes.push(dirClass);
    if (spacing) classes.push('gap-' + spacing);
    if (className) classes.push(className);
    return classes.join(' ');
  }, [isRow, spacing, className, isReverse]);

  return <div className={classes} {...props} />;
}
