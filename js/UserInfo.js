'use strict';

export default class UserInfo {
  static _profileSection = document.querySelector('.profile');
  static _editButton = this._profileSection.querySelector('.profile__editbutton');
  static _addButton = this._profileSection.querySelector('.profile__addbutton');

  constructor (profileFilds) {
    this._profileName = UserInfo._profileSection.querySelector(profileFilds.name);
    this._profileDesc = UserInfo._profileSection.querySelector(profileFilds.description);

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

  setAddCardHandler(handler) {
    UserInfo._addButton.addEventListener('click', (event) => {handler(event)});
  }

  setEditProfileHandler(handler) {
    UserInfo._editButton.addEventListener('click', (event) => {handler(event)});
  }

}

