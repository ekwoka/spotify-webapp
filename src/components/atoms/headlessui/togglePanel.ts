import { cloneElement, createElement, VNode } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { classNames } from '../../../utils/classNames';

export const TogglePanel = ({
  show,
  falseClass,
  trueClass,
  class: constantClass,
  children,
  as,
  ...props
}: TogglePanel): JSXInternal.Element => {
  if (!children) as = 'div';
  const className = classNames(
    show ? trueClass : falseClass,
    'transition-all',
    constantClass || '',
    !as && children ? children.props.class || children.props.className : ''
  );

  return as
    ? createElement(as, { class: className, ...props }, children)
    : cloneElement(children as VNode, { class: className, ...props });
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
type TogglePanel = {
  show: boolean;
  falseClass: string;
  trueClass: string;
  class?: string;
  children?: JSXInternal.Element;
  as?: string;
};
