export class ErrorBadge {
  constructor(title, description, severity) {
    this.title = title;
    this.description = description;
    this.severity = severity;
  }
}

export const Severities = {
  MED: "MED",
  HIGH: "HIGH"
}