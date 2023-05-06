// profile data
const profile = {
  name: 'Жак-Ив Кусто',
  text: 'Исследователь океана',
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

export { profile, initialCards };
