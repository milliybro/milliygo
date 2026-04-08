export const isValidEmail = (emailValue: any) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailValue)
}
