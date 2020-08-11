import onErrorImage  from '../images/placesphotos/onerror.jpg';

export default class UserInfo {

  static profileSection = document.querySelector('.profile');

  constructor ({name, about, avatar}) {
    this._profileName = UserInfo.profileSection.querySelector(name);
    this._profileDesc = UserInfo.profileSection.querySelector(about);
    this._profileAvatar = UserInfo.profileSection.querySelector(avatar);
    this._profileAvatar.onerror = this._onErrorLoadImage;
    this._userInfo = {};
  }

  getUserInfo() {
    return this._userInfo;
  }

  setAvatarEditor(action) {
    if (action) {
      this._profileAvatar.addEventListener('click', action.bind(this));
    }
  }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;

    if (userInfo.name) {
      this._profileName.textContent = userInfo.name;
    }
    if (userInfo.about) {
      this._profileDesc.textContent = userInfo.about;
    }
    if (userInfo.avatar) {
      this._profileAvatar.src = userInfo.avatar;
    }
  }

  _onErrorLoadImage (event) {
    event.target.src = onErrorImage;
  }

}

