const lang = [
  'Загрузка',
  'Карточки',
  'Список',
  'Все',
  'По категориям',
  'По дате',
];

const langData = { load: 0, cards: 1, list: 2, all: 3, categories: 4, date: 5 };

const viewMode = {
  load: lang[langData.load],
  cards: lang[langData.cards],
  list: lang[langData.list],
};

const sroting = {
  categories: [
    'animals',
    'business',
    'food',
    'health',
    'places',
    'science',
    'vehicle',
    'winter',
  ],
  date: [''],
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

export { preview, sroting, lang, langData, viewMode };
