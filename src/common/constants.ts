export default {
  PASSWORD_PATTERN: () => /^[\S.]{6,}$/g,
  DEFAULT_ERROR_KEY: '[default]',
  REJECTIONS: {
    'duplicate key': '{{ field }} already exists',
    'Not all data provided': 'Not all required data provided',
    '[default]': 'Error occurred'
  },
  REJECTIONS_TEMPlATE: {
    phone: 'User with this phone',
    password: 'Password should be at least 7 symbols'
  },
  ERROR_FIELDS: {
    PHONE: 'phone',
    PASSWORD: 'password',
    NAME: 'name'
  }
};

