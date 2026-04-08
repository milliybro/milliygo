export type CardType = 'visa' | 'master-card' | 'humo' | 'uzcard' | 'unkown'

interface CardInfo {
  cardNumber?: string
  cardType?: CardType
}

const getCardType = ({ cardNumber, cardType }: CardInfo): { type: CardType; icon: string } => {
  const cardTypes = {
    visa: {
      regex: /^4/,
      icon: '/visa.png',
    },
    'master-card': {
      regex: /^(51|52|53|54|55)/,
      icon: '/master.png',
    },

    humo: {
      regex: /^9860/,

      icon: '/humo.png',
    },
    uzcard: {
      regex: /^(8600|5614)/,

      icon: '/uzcard.png',
    },
    unkown: {
      regex: /^/,
      icon: '',
    },
  }

  if (cardNumber) {
    for (const [key, value] of Object.entries(cardTypes)) {
      if (value.regex.test(cardNumber)) {
        return { type: key as CardType, icon: value.icon }
      }
    }
    return { type: 'unkown', icon: '' }
  }

  if (cardType && cardTypes[cardType]) {
    return { type: cardType, icon: cardTypes[cardType].icon }
  }

  return { type: 'unkown', icon: '' }
}

export default getCardType
