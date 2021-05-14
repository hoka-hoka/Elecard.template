const lang = [
  'Загрузка',
  'Карточки',
  'Список',
  'Все',
  'По категориям',
  'По дате',
  'По имени',
  'По размеру',
  'Восстановить',
  'Карточка',
];

const langData = {
  load: 0,
  cards: 1,
  list: 2,
  all: 3,
  category: 4,
  timestamp: 5,
  imgname: 6,
  filesize: 7,
  recover: 8,
  card: 9,
};

const viewMode = {
  load: 'load',
  cards: 'cards',
  list: 'list',
};

const sorting = [
  // {
  //   id: 1,
  //   type: 'category',
  //   alias: lang[langData.category],
  //   names: [
  //     'animals',
  //     'business',
  //     'food',
  //     'health',
  //     'places',
  //     'science',
  //     'vehicle',
  //     'winter',
  //   ],
  // },
  {
    id: 2,
    type: 'timestamp',
    alias: lang[langData.timestamp],
    names: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
  },
  // {
  //   id: 3,
  //   type: 'imgname',
  //   alias: lang[langData.imgname],
  //   names: ['increase', 'decrease'],
  // },
  // {
  //   id: 4,
  //   type: 'filesize',
  //   names: ['increase', 'decrease'],
  // },
];

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

export { preview, sorting, lang, langData, viewMode };
