// data for server authorization
const serverUrl = 'https://nomoreparties.co/v1/plus-cohort-24/cards';
const token = '9e2d263a-3d5a-40f2-a16e-27e8711676de';

// profile data
const profile = {
  _id: 'd7fd7ac4dab38fe4557cfe28',
  name: 'Alex Krutyakov',
  text: 'Web-developer',
  avatar: '',
  cohort: 'plus-cohort-24',
};
// add links for images
const chagazUzunImage = new URL(
  '../images/mars-mountains.jpg',
  import.meta.url
);
const ruskealaImage = new URL(
  '../images/ruskeala-failure.jpg',
  import.meta.url
);
const magadanImage = new URL('../images/magadan.jpg', import.meta.url);
const yakutskImage = new URL('../images/yakutsk.jpg', import.meta.url);
const petropavlovskImage = new URL(
  '../images/petropavlovsk-kamchatskiy.jpg',
  import.meta.url
);
const mologaImage = new URL('../images/flooded-city.jpg', import.meta.url);

// initial cards data
const initialCards = [
  {
    name: 'Чагаз-Узун',
    link: chagazUzunImage,
    alt: 'Долина с рыжыми пейзажами на фоне голубых гор',
  },
  {
    name: 'Рускеала',
    link: ruskealaImage,
    alt: 'Провал в пещеру',
  },
  {
    name: 'Магадан',
    link: magadanImage,
    alt: 'Закат на море в Магадане',
  },
  {
    name: 'Якутск',
    link: yakutskImage,
    alt: 'Лошади в снегу',
  },
  {
    name: 'Петропавловск Камчатский',
    link: petropavlovskImage,
    alt: 'Город у подножия вулкана',
  },
  {
    name: 'Молога',
    link: mologaImage,
    alt: 'Затопленный монастырь в озере',
  },
];

export { serverUrl, token, profile, initialCards };
