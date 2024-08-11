import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Anchor, Blockquote, Box, Code, List, ListItem, Text, Title } from '@mantine/core';
import { PortableText, type PortableTextReactComponents } from '@portabletext/react';
import { getFileIcon } from '~/lib/fileIcon';

const defaultPortableTextComponents: PortableTextReactComponents = {
  types: {
    code: ({ value }) => {
      const FileIcon = getFileIcon(value?.language);

      return (
        <CodeHighlightTabs
          code={[
            {
              code: value?.code,
              language: value?.language,
              fileName: value?.filename ?? 'Snippet',
              icon: <FileIcon size={14} />,
            },
          ]}
          styles={{
            code: {
              lineHeight: 'calc(var(--mantine-scale) * 1rem)',
            },
          }}
        />
      );
    },
  },

  block: {
    normal: ({ children }) => <Text>{children}</Text>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
    h1: ({ children }) => <Title order={1}>{children}</Title>,
    h2: ({ children }) => <Title order={2}>{children}</Title>,
    h3: ({ children }) => <Title order={3}>{children}</Title>,
    h4: ({ children }) => <Title order={4}>{children}</Title>,
    h5: ({ children }) => <Title order={5}>{children}</Title>,
    h6: ({ children }) => <Title order={6}>{children}</Title>,
  },

  marks: {
    em: ({ children }) => <Text component="em">{children}</Text>,
    strong: ({ children }) => <Text component="strong">{children}</Text>,
    code: ({ children }) => <Code color="var(--mantine-primary-color-light)">{children}</Code>,
    underline: ({ children }) => <Text td="underline">{children}</Text>,
    'strike-through': ({ children }) => <Text td="line-through">{children}</Text>,
    link: ({ children, value }) => <Anchor href={value?.href}>{children}</Anchor>,
  },

  list: {
    bullet: ({ children }) => <List type="unordered">{children}</List>,
    number: ({ children }) => <List type="ordered">{children}</List>,
  },

  listItem: ({ children }) => <ListItem>{children}</ListItem>,

  hardBreak: () => <Box component="br" />,

  unknownBlockStyle: ({ children }) => <Text>{children}</Text>,
  unknownList: ({ children }) => <List>{children}</List>,
  unknownListItem: ({ children }) => <ListItem>{children}</ListItem>,
  unknownMark: ({ children }) => <Text>{children}</Text>,
  unknownType: ({ children }) => <Text>{children}</Text>,
};

interface IEnhancedPortableText {
  value: any;
}
export default function CustomPortableText({ value }: IEnhancedPortableText) {
  return <PortableText value={value} components={defaultPortableTextComponents} />;
}
