import twc from 'tw-classnames';

import { IButtonProps } from './IButton';

const classNames = {
  primary: 'text-white bg-primary px-4 py-3',
  secondary: 'text-white bg-none py-3 px-6 border border-black rounded-lg',
  text: '',
  rounded: 'rounded-full w-12 h-12 bg-gray-300 flex-centered',
};

function Button({ variant = 'primary', suffixElement, prefixElement, className, children, ...rest }: IButtonProps) {
  return (
    <button
      type='button'
      className={twc('inline-flex cursor-pointer items-center gap-6', classNames[variant], className)}
      {...rest}
    >
      {prefixElement}
      {children}
      {suffixElement}
    </button>
  );
}

export default Button;
