import { ref, reactive } from 'vue';

import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE } from '../utils/constants';

export const useFormAndValidation = () => {
  const values = reactive({});
  const errors = reactive({});
  const isFieldValid = reactive({});
  const isValid = ref(false);

  const handleChange = (e) => {
    const { name, value, validity, validationMessage } = e.target;

    values[name] = value;
    errors[name] = validationMessage;
    isFieldValid[name] = validity.valid;
    isValid.value = e.target.closest('form').checkValidity();

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
