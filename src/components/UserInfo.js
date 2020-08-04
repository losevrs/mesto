export default class UserInfo {

  static profileSection = document.querySelector('.profile');

  constructor ({name, description}) {
    this._profileName = UserInfo.profileSection.querySelector(name);
    this._profileDesc = UserInfo.profileSection.querySelector(description);
    this._userInfo = { name: '', description: ''};
  }

  getUserInfo() {
    this._userInfo.name = this._profileName.textContent;
    this._userInfo.description = this._profileDesc.textContent;
    return this._userInfo;
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileDesc.textContent = userInfo.description;
  }

}

