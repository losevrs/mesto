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

  getMyId() {
    return this._userInfo._id;
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
    this._profileName.textContent = this._userInfo.name;
    this._profileDesc.textContent = this._userInfo.about;
    this._profileAvatar.src = this._userInfo.avatar;
}

  editUserInfo(info) {
    const {name, about, avatar} = info;
    if (name) {
      this._userInfo.name = name;
      this._profileName.textContent = this._userInfo.name;
    }
    if (about) {
      this._userInfo.about = about;
      this._profileDesc.textContent = this._userInfo.about;
    }
    if (avatar) {
      this._userInfo.avatar = avatar;
      this._profileAvatar.src = this._userInfo.avatar;
    }
  }

  _onErrorLoadImage (event) {
    event.target.src = onErrorImage;
  }

}

