export const Priorities = {
  LOW: "LOW",
  MED: "MEDIUM",
  HIGH: "HIGH"
}

export class TodoModel {
  constructor(id, title, description, priority, status, parent) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.parent = parent;
  }
}
