import { HTMLAttributes, ReactNode } from 'react';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card heading — pass a string for a plain <h2>, or a ReactNode for custom layout */
  heading?: string | ReactNode;
  headingClassName?: string;
  children?: ReactNode;
  className?: string;
}
