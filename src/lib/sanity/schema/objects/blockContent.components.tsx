import { BoltIcon } from "@sanity/icons";
import { Text } from "@sanity/ui";
import {
  defineField,
  type BlockAnnotationDefinition,
  type BlockDecoratorDefinition,
  type BlockStyleDefinition,
} from "sanity";
import { styled } from "styled-components";

const BlockQuoteRoot = styled.blockquote`
  --border-color: var(--card-border-color);

  position: relative;
  display: block;
  margin: 0;
  padding-left: ${({ theme }) => theme.sanity.v2?.space[3]}px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: -4px;
    bottom: -4px;
    width: 3px;
    background: var(--border-color);
  }

  &[data-status="blockquote-info"] {
    --border-color: var(--card-badge-suggest-fg-color);
  }

  &[data-status="blockquote-success"] {
    --border-color: var(--card-badge-positive-fg-color);
  }

  &[data-status="blockquote-warning"] {
    --border-color: var(--card-badge-caution-fg-color);
  }

  &[data-status="blockquote-danger"] {
    --border-color: var(--card-badge-critical-fg-color);
  }
`;

const BlockQuoteText = styled.span`
  font-size: ${({ theme }) =>
    theme.sanity.v2?.font.text.sizes[1]?.fontSize ?? 13}px;
`;

const BlockMarkText = styled.mark`
  font-size: ${({ theme }) =>
    theme.sanity.v2?.font.text.sizes[1]?.fontSize ?? 13}px;
  font-weight: bold;
`;

export const Highlight = {
  title: "Mark",
  value: "mark",
  icon: () => <BlockMarkText>H</BlockMarkText>,
  component: ({ children }) => <mark>{children}</mark>,
} satisfies BlockDecoratorDefinition;

export const MutedStyle = {
  title: "Muted",
  value: "muted",
  icon: () => <BlockQuoteText>M</BlockQuoteText>,
  component: ({ children }) => (
    <span style={{ color: "var(--card-muted-fg-color)" }}>{children}</span>
  ),
} satisfies BlockStyleDefinition;

export const MutedDecorator = {
  title: "Muted",
  value: "muted",
  icon: () => <BlockQuoteText>M</BlockQuoteText>,
  component: ({ children }) => (
    <span style={{ color: "var(--card-muted-fg-color)" }}>{children}</span>
  ),
} satisfies BlockDecoratorDefinition;

const _BlockQuoteBase = (status: string) => {
  return {
    title: `Quote - ${status}`,
    value: `blockquote-${status}`,
    component: ({ children, ...rest }) => (
      <BlockQuoteRoot {...rest} data-status={`blockquote-${status}`}>
        <Text as="p">{children}</Text>
      </BlockQuoteRoot>
    ),
  } satisfies BlockStyleDefinition;
};

export const BlockQuoteInfo = _BlockQuoteBase("info");
export const BlockQuoteSuccess = _BlockQuoteBase("success");
export const BlockQuoteWarning = _BlockQuoteBase("warning");
export const BlockQuoteDanger = _BlockQuoteBase("danger");

export const BlockLink = {
  type: "object",
  name: "link",
  title: "Link",
  options: {
    modal: { type: "popover" },
  },
  fields: [
    defineField({
      name: "href",
      type: "url",
      title: "Link",
      description: "A valid web, email, phone, or relative link.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "tel", "mailto"],
          allowRelative: true,
        }),
    }),
  ],
};

export const BlockReferenceLink = {
  type: "object",
  name: "referencelink",
  title: "Reference Link",
  icon: () => <BoltIcon />,
  options: {
    modal: { type: "popover" },
  },
  fields: [
    {
      name: "ref",
      type: "reference",
      title: "Link",
      description: "A reference to a document in Sanity.",
      to: [{ type: "post" }, { type: "project" }],
      validation: (Rule) =>
        Rule.required().error("You must select a document to link to."),
    },
  ],
} satisfies BlockAnnotationDefinition;
