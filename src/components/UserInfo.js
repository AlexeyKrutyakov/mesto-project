export default class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.nameSelector);
    this._about = document.querySelector(selectors.aboutSelector);
    this._avatar = document.querySelector(selectors.avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this.id = userData._id;
  }

  setAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
