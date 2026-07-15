import twc from 'tw-classnames';

import { ICardProps } from './ICard';

function Card({ className, heading, children, headingClassName, ...rest }: ICardProps) {
  return (
    <div className={twc('bg-white shadow-nonw border rounded-sm border-card-border w-full p-5', className)} {...rest}>
      {heading && (
        <div className={twc('px-6 py-6', headingClassName)}>
          {typeof heading === 'string' ? <h2 className={`text-xl ${headingClassName}`}>{heading}</h2> : heading}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
