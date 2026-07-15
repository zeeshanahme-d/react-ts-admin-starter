import { ComponentProps } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

import twc from 'tw-classnames';

// Accepts every prop of `react-phone-number-input/input` (value, onChange,
// country, defaultCountry, international, withCountryCallingCode, className…).
type PhoneNumberInputProps = ComponentProps<typeof PhoneInput>;

// Shared styling for every phone input in the app (theme tokens + focus/hover).
const baseClass =
  'h-10 w-full rounded-lg border bg-forground border-card-border px-3 outline-none! transition-colors hover:border-success focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(11,24,63,0.08)] [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-text-primary';

function PhoneNumberInput({ className, ...rest }: PhoneNumberInputProps) {
  return <PhoneInput className={twc(baseClass, className)} {...rest} />;
}

export default PhoneNumberInput;
