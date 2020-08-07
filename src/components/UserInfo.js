import onErrorImage  from '../images/placesphotos/onerror.jpg';

export default class UserInfo {

  static profileSection = document.querySelector('.profile');

  constructor ({name, description, avaurl}) {
    this._profileName = UserInfo.profileSection.querySelector(name);
    this._profileDesc = UserInfo.profileSection.querySelector(description);
    this._profileAvatar = UserInfo.profileSection.querySelector(avaurl);
    this._profileAvatar.onerror = this._onErrorLoadImage;
    this._userInfo = { name: '', description: '', avaurl: ''};
  }

  getUserInfo() {
    this._userInfo.name = this._profileName.textContent;
    this._userInfo.description = this._profileDesc.textContent;
    this._userInfo.avaurl = this._profileAvatar.src;
    return this._userInfo;
  }

  setAvatarEditor(action) {
    if (action) {
      this._profileAvatar.addEventListener('click', action.bind(this));
    }
  }

  setUserInfo(userInfo) {
    const {name, description, avaurl} = userInfo;
    if (name) {
      this._profileName.textContent = userInfo.name;
    }
    if (description) {
      this._profileDesc.textContent = userInfo.description;
    }
    if (avaurl) {
      this._profileAvatar.src = avaurl;
    }
  }

  _onErrorLoadImage (event) {
    event.target.src = onErrorImage;
  }

}

