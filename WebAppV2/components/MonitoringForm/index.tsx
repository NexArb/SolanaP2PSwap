import React, { useEffect, useState } from 'react';
import NexarbInputField from '../CustomTextField';
import InputDropdown, { SuggestionData } from '../CustomInputDropdown';
import Button from '@/components/Button';
import Surface from '../Surface';

export type FormFieldConfig = {
  type: 'textfield' | 'checkbox' | 'select' | 'button'; // Add more types as needed
  tooltip: string;
  key: string;
  name: string;
  value?: string;
  placeholder: string;
  label: string;
  validator: (value: string) => string | false;
  options?: SuggestionData[]; // For select type
};
interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
  onClose: () => void;
}
const MonitoringForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmit, setIsSubmit] = useState<boolean>();

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  useEffect(() => {
    const isAllValid = () => {
      return fields.every((field: any) => {
        return !field.validator(formData[field.key]);
      });
    };

    if (fields.length === Object.keys(formData).length) {
      isAllValid() ? setIsSubmit(true) : setIsSubmit(false);
    }
  }, [formData, fields, isSubmit, setIsSubmit]);

  return (
    <Surface className="max-h-96 px-2 items-center justify-center space-y-4 w-full">
      {fields.map((field, index) => (
        <Surface key={`div-${field.key}`} className="w-full">
          {field.type === 'textfield' && (
            <NexarbInputField
              value={field.value ?? ''}
              key={`textfield-${field.key}`}
              className="w-full"
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              onChange={(value) => {
                handleChange(field.key, value);
              }}
              validator={field.validator}
              tooltip={field.tooltip}
            />
          )}
          {field.type === 'select' && field.options && (
            <InputDropdown
              key={`select-${field.key}`}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              suggestionData={field.options}
              onChange={(obj) => {
                handleChange(field.key, obj.key);
              }}
              value={field.value ?? ''}
              validator={field.validator}
              tooltip={field.tooltip}
            />
          )}
        </Surface>
      ))}
      <Surface className="flex flex-wrap md:flex-nowrap justify-center space-y-1 md:space-y-0 md:space-x-1 w-full pb-4">
        <Button isLarge text="Cancel" variant="outlined" onClick={onClose} />
        <Button
          isLarge
          text={'Add'}
          variant="contained"
          disabled={!isSubmit}
          onClick={() => handleSubmit()}
        />
      </Surface>
    </Surface>
  );
};

export default MonitoringForm;
