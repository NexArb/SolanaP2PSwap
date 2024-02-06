import { ReactElement } from 'react';
import { ButtonVariantType } from '@/components/Button';

/** Possible values for a form field. */
export type FormFieldValueTypes = string | Date | boolean;

/** Base type for FormField component types. */
type FormFieldBaseType<V = string> = {
  /** ID of the field. Used to identify the field. Should be unique. */
  id: string;
  /** Label of the field. Shown to the user with the field. Indicates what the field is for. */
  label: string;
  /** Value of the field. */
  value: V;
  /** If the field should be disabled. */
  disabled?: boolean;
  /** Tooltip shown when a field is hovered. */
  tooltip?: string;
  /** Type of the field. */
  type?: 'text' | 'password' | 'switch' | 'select' | 'date';
};

/** Type for fields that need validation. */
type FormFieldValidatableType<V = string> = FormFieldBaseType<V> & {
  /** Validator method for the field
   * @param value Value of the field
   * @returns error as a string, or false if field is valid
   */
  validator?: (value: V) => string | false;
};

/** Text field type. */
export type FormTextFieldType = FormFieldValidatableType<string> & {
  /** Type of the field. Must be text or password. */
  type: 'text' | 'password';
};

/** Date field type. */
export type FormDateFieldType = FormFieldValidatableType<Date> & {
  /** Type of the field. Must be date. */
  type: 'date';
  /** Minimum date */
  min?: Date;
  /** Maximum date */
  max?: Date;
};

/** Switch field type. */
export type FormSwitchFieldType = FormFieldBaseType<boolean> & {
  /** Type of the field. Must be switch. */
  type: 'switch';
};

/** Select (dropdown) field type. */
export type FormSelectFieldType = FormFieldValidatableType<string> & {
  /** Type of the field. Must be select. */
  type: 'select';
};

/** Union of form field types. */
export type FormFieldType =
  | FormTextFieldType
  | FormDateFieldType
  | FormSwitchFieldType
  | FormSelectFieldType;

export type FormButtonType = {
  /** If the button should be disabled */
  disabled?: boolean;
  /** If the button should show loading state */
  loading?: boolean;
  isLoginOrRegister?: boolean;
  /** Tooltip shown on hover */
  tooltip?: string;
  /** Text on the button */
  text: string;
  /** If the button is the primary action of the form */
  isSubmit?: boolean;
  /** Action to perform on click of the button */
  onClick?: () => void;
  /** Variant of the button */
  variant?: ButtonVariantType;
};

/** Type for form link elements. */
export type FormLinkType = {
  /** Text to show on the link. */
  text: string;
  /** URL the link should navigate to. */
  link: string;
};

/** Type for rendering a custom form element. */
export type FormCustomElementType = () => ReactElement;

/** Union type for form elements. */
export type FormElementType =
  | FormFieldType
  | FormButtonType
  | FormLinkType
  | FormCustomElementType;
