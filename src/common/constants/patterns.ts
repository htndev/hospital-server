export default {
  PASSWORD: (): RegExp => /^[\S.]{6,}$/g,
  PHONE: (): RegExp => /^\d{12}$/g
};
