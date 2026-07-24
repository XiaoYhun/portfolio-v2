export type View =
  | { kind: "home" }
  | { kind: "tech"; tech: string }
  | { kind: "project"; name: string }
  | { kind: "company"; name: string }
  | { kind: "personal" };

export function viewKey(v: View): string {
  switch (v.kind) {
    case "home":
      return "home";
    case "tech":
      return `tech:${v.tech}`;
    case "project":
      return `project:${v.name}`;
    case "company":
      return `company:${v.name}`;
    case "personal":
      return "personal";
  }
}
