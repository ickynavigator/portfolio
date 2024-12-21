import type { BlockDecoratorDefinition } from "sanity";

export const Highlight = {
  title: "Mark",
  value: "mark",
  icon: () => <mark style={{ fontWeight: "bold" }}>H</mark>,
  component: (props) => <mark>{props.children}</mark>,
} satisfies BlockDecoratorDefinition;
