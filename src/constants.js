const lang = ['Загрузка', 'Карточки', 'Список'];

const langData = { load: 0, cards: 1, list: 2 };

const viewMode = {
  load: lang[langData.load],
  cards: lang[langData.cards],
  list: lang[langData.list],
};

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

export { preview, lang, langData, viewMode };
