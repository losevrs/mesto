import onErrorImage  from '../images/placesphotos/onerror.jpg';

export default class UserInfo {

  static profileSection = document.querySelector('.profile');

  constructor ({name, description, avatar}) {
    this._profileName = UserInfo.profileSection.querySelector(name);
    this._profileDesc = UserInfo.profileSection.querySelector(description);
    this._profileAvatar = UserInfo.profileSection.querySelector(avatar);
    this._profileAvatar.onerror = this._onErrorLoadImage;
    this._userInfo = { name: '', description: '', avatar: ''};
  }

  getUserInfo() {
    this._userInfo.name = this._profileName.textContent;
    this._userInfo.description = this._profileDesc.textContent;
    this._userInfo.avatar = this._profileAvatar.src;
    return this._userInfo;
  }

  setAvatarEditor(action) {
    if (action) {
      this._profileAvatar.addEventListener('click', action.bind(this));
    }
  }

  setUserInfo(userInfo) {
    const {name, description, avatar} = userInfo;
    if (name) {
      this._profileName.textContent = userInfo.name;
    }
    if (description) {
      this._profileDesc.textContent = userInfo.description;
    }
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
  }

  _onErrorLoadImage (event) {
    event.target.src = onErrorImage;
  }

}

