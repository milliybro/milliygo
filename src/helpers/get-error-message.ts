type ErrorMessages = { server: string; general: string }

const ERROR_MESSAGES: Record<string, ErrorMessages> = {
  en: {
    server: 'Server error (500)',
    general: 'Something went wrong',
  },
  ru: {
    server: 'Ошибка сервера (500)',
    general: 'Что-то пошло не так',
  },
  uz: {
    server: 'Server xatosi (500)',
    general: "Nimadir noto'g'ri ketdi",
  },
}

export function getErrorMessage(locale: string): ErrorMessages {
  if (ERROR_MESSAGES[locale]) {
    return ERROR_MESSAGES[locale]
  }
  return ERROR_MESSAGES.ru
}
