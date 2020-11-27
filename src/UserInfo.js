export class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this.name = document.querySelector(nameSelector);
    this.description = document.querySelector(descriptionSelector);
  }

  /* TODO: fill in form on open? */
  getUserInfo() {
    return {
      name: this.name,
      description: this.description,
    }
  }

  /**
   * @param name {string}
   * @param description {sring}
   */
  setUserInfo({name, description}) {
    this.name.textContent = name;
    this.description.textContent = description;
  }
}
