const lang = ['Карточки', 'Список'];

const langData = { cards: 0, list: 1 };

const preview = {
  radioBtns: [
    {
      id: 1,
      group: 'view',
      name: lang[langData.cards],
      active: true,
    },
    {
      id: 2,
      group: 'view',
      name: lang[langData.list],
      active: false,
    },
  ],
};

export { preview, lang, langData };
