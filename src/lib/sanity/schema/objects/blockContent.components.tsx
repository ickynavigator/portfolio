import { Text } from "@sanity/ui";
import type { HTMLProps } from "react";
import type { BlockDecoratorDefinition, BlockStyleDefinition } from "sanity";
import { styled } from "styled-components";

export const Highlight = {
  title: "Mark",
  value: "mark",
  icon: () => <mark style={{ fontWeight: "bold" }}>H</mark>,
  component: (props) => <mark>{props.children}</mark>,
} satisfies BlockDecoratorDefinition;

export const Muted = {
  title: "Muted",
  value: "muted",
  icon: () => <Text muted>M</Text>,
  component: (props) => (
    <span style={{ color: "var(--card-muted-fg-color)" }}>
      {props.children}
    </span>
  ),
} satisfies BlockStyleDefinition | BlockDecoratorDefinition;

const _BlockQuoteBase = (status: string) => {
  type BlockQuoteStyleProps = Omit<HTMLProps<HTMLQuoteElement>, "as" | "ref">;

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

  const BlockQuote = ({ children, ...rest }: BlockQuoteStyleProps) => (
    <BlockQuoteRoot {...rest} data-status={`blockquote-${status}`}>
      <Text as="p">{children}</Text>
    </BlockQuoteRoot>
  );

  const BlockQuoteExample: BlockStyleDefinition = {
    title: `Quote - ${status}`,
    value: `blockquote-${status}`,
    component: ({ children }) => <BlockQuote>{children}</BlockQuote>,
  };

  return BlockQuoteExample;
};

export const BlockQuoteInfo = _BlockQuoteBase("info");
export const BlockQuoteSuccess = _BlockQuoteBase("success");
export const BlockQuoteWarning = _BlockQuoteBase("warning");
export const BlockQuoteDanger = _BlockQuoteBase("danger");
