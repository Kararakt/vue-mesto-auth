import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE } from '../utils/constants';

type FormFields = Record<string, string>;
type FormValidity = Record<string, boolean>;

interface FormAndValidation {
  values: FormFields;
  handleChange: (event: Event) => void;
  errors: FormFields;
  isFieldValid: FormValidity;
  isValid: Ref<boolean>;
  resetForm: () => void;
}

export const useFormAndValidation = (): FormAndValidation => {
  const values = reactive<FormFields>({});
  const errors = reactive<FormFields>({});
  const isFieldValid = reactive<FormValidity>({});
  const isValid = ref<boolean>(false);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    const { name, value, validity } = target;

    values[name] = value;
    errors[name] = target.validationMessage;
    isFieldValid[name] = validity.valid;
    isValid.value = (target.closest('form') as HTMLFormElement).checkValidity();

    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        errors[name] = INVALID_EMAIL_MESSAGE;
      }
    }
  };

  const resetForm = () => {
    Object.keys(values).forEach((key) => {
      values[key] = '';
    });
    Object.keys(errors).forEach((key) => {
      errors[key] = '';
    });
    Object.keys(isFieldValid).forEach((key) => {
      isFieldValid[key] = false;
    });
    isValid.value = false;
  };

  return {
    values,
    handleChange,
    errors,
    isFieldValid,
    isValid,
    resetForm,
  };
};
