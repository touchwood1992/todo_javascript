export default class TaskModel {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  updateValues(name) {
    this.name = name;
  }
}
