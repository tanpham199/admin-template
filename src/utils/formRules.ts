import { Rule } from 'antd/es/form';

export const getEmailRules = (required: boolean = true): Rule[] => [
  {
    validator(_, value) {
      if (required && (!value || !/\S+@\S+\.\S+/.test(value))) {
        return Promise.reject('Please enter a valid email address.');
      }
      return Promise.resolve();
    },
  },
];

export const getPasswordRules = (required: boolean = true): Rule[] => [
  {
    validator(_, value) {
      if (required && (!value || value.length < 6)) {
        return Promise.reject('Password must be at least 6 characters.');
      }
      return Promise.resolve();
    },
  },
];
