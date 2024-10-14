const latinLettersRegex = /^[a-zA-Z]+$/;
const latinAndCyrillicLettersRegex = /^[a-zA-Zа-яА-Я]+$/;

export const usernameRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    if (!latinAndCyrillicLettersRegex.test(value))
      return 'Использовать можно только Русские и Латинские буквы';

    if (value?.length >= 1 && value?.length <= 60) return true;

    return 'Имя пользователя должно быть от 1 до 60  символов.';
  },
];

export const loginRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    if (!latinLettersRegex.test(value)) return 'Использовать можно только Латинские буквы';

    if (value?.length >= 2 && value?.length <= 60) return true;

    return 'Имя пользователя должно быть от 2 до 60 символов латинского алфавита.';
  },
];

export const passwordRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    if (value?.length >= 6 && value?.length <= 60) return true;

    return 'Пароль должнен быть от 6 до 60  символов.';
  },
];

export const emailRules = [
  (value: string) => {
    if (!value) return 'Поле не должно быть пустым';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(value)) return true;

    return 'Неправильная почта';
  },
];

export const phoneNumberRules = [
  (value: string) => {
    const phoneRegex = /^(?:\+7|8)?\s?\(?(\d{3})\)?\s?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;

    if (value) {
      return phoneRegex.test(value) ? true : 'Неправильный номер телефона';
    }

    return true;
  },
];
