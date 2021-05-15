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
  'Раздел',
  'Категория',
  'Размер',
  'Фотография',
  'Дата',
  'Сбросить',
  'По возрастанию',
  'По убыванию',
  'Не выбрано',
];

const langData = {
  load: 0,
  cards: 1,
  list: 2,
  all: 3,
  bycategory: 4,
  bytimestamp: 5,
  byimgname: 6,
  byfilesize: 7,
  recover: 8,
  card: 9,
  section: 10,
  category: 11,
  filesize: 12,
  image: 13,
  timestamp: 14,
  discount: 15,
  byincrease: 16,
  bydecrease: 17,
  notset: 18,
};

const dataURL = 'http://contest.elecard.ru/frontend_data/';

const viewMode = {
  load: 'load',
  cards: 'cards',
  list: 'list',
};

const sorting = [
  {
    id: 1,
    active: 0,
    type: 'category',
    alias: lang[langData.bycategory],
    names: [
      lang[langData.notset],
      'animals',
      'business',
      'food',
      'health',
      'places',
      'science',
      'vehicle',
      'winter',
    ],
  },
  {
    id: 2,
    active: 2,
    type: 'timestamp',
    alias: lang[langData.bytimestamp],
    names: [
      lang[langData.notset],
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
    ],
  },
  {
    id: 3,
    active: 0,
    type: 'imgname',
    alias: lang[langData.byimgname],
    names: [
      lang[langData.notset],
      lang[langData.byincrease],
      lang[langData.bydecrease],
    ],
    toggle: true,
  },
  {
    id: 4,
    active: 0,
    type: 'filesize',
    alias: lang[langData.byfilesize],
    names: [
      lang[langData.notset],
      lang[langData.byincrease],
      lang[langData.bydecrease],
    ],
    toggle: true,
  },
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
  treeInfo: [
    {
      type: 'category',
      name: lang[langData.category],
    },
    {
      type: 'filesize',
      name: lang[langData.filesize],
    },
    {
      type: 'image',
      name: lang[langData.image],
    },
    {
      type: 'timestamp',
      name: lang[langData.timestamp],
    },
  ],
};

export { preview, sorting, lang, langData, viewMode, dataURL };
