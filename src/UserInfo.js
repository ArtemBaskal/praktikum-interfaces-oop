export class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._getName(),
      description: this._getDescription(),
    }
  }

  _setName(name){
    this._name.textContent = name;
  }

  _setDescription(description){
    this._description.textContent = description;
  }

  _getName(){
    return this._name.textContent;
  }

  _getDescription(){
    return this._description.textContent;
  }

  /**
   * @param name {string}
   * @param description {sring}
   */
  setUserInfo({name, description}) {
    this._setName(name);
    this._setDescription(description);
  }
}
