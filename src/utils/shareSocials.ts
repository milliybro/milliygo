export const shareSocials = (social: string, link: string) => {
  switch (social) {
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`, '_blank')
      break
    case 'telegram':
      window.open(`https://t.me/share/url?url=${link}`, '_blank')
      break
    case 'whatsapp':
      window.open(`https://api.whatsapp.com/send?text=${link}`, '_blank')
      break
    default:
      break
  }
}
