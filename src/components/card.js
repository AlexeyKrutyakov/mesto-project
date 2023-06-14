export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    cardSelectors,
    imageClickHandler,
    likeClickHandler,
    deleteClickHandler
  ) {
    this.userId = userId;
    this.id = data._id;
    this.likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._cardSelectors = cardSelectors;
    this._imageClickHandler = imageClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._deleteClickHandler = deleteClickHandler;
  }

  _getElement() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelectors.cardSelector)
      .cloneNode(true);
    return this._cardElement;
  }

  // set listeners
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._imageClickHandler(this._name, this._link);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._likeClickHandler(this);
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteClickHandler(this);
    });
  }

  // check my like in this card
  hasMyLike() {
    return this.likes.some((like) => like._id === this.userId);
  }

  // render like counter and like sybmol
  renderLikesData() {
    if (this.hasMyLike()) {
      this._likeButtonElement.classList.add(this._cardSelectors.likeBtnActiveClass);
    } else {
      this._likeButtonElement.classList.remove(
        this._cardSelectors.likeBtnActiveClass
      );
    }
    this._likesCounter.textContent = this.likes.length;
  }

  // create card
  create() {
    this._cardElement = this._getElement();
    this._nameElement = this._cardElement.querySelector(
      this._cardSelectors.nameSelector
    );
    this._imageElement = this._cardElement.querySelector(
      this._cardSelectors.imageSelector
    );
    this._likeButtonElement = this._cardElement.querySelector(
      this._cardSelectors.likeBtnSelector
    );
    this._deleteButtonElement = this._cardElement.querySelector(
      this._cardSelectors.removeBtnSelector
    );
    this._likesCounter = this._cardElement.querySelector(
      this._cardSelectors.likeNumSelector
    );

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    if (this._ownerId !== this.userId) this._deleteButtonElement.remove();
    this.renderLikesData();
    this._setEventListeners();

    return this._cardElement;
  }

  // delete card
  delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
