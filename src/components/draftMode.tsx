import { ActionIcon, Affix, Anchor, Tooltip, rem } from '@mantine/core';
import { IconPencilOff } from '@tabler/icons-react';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export default function DraftMode() {
  const isDraftMode = draftMode().isEnabled;

  if (!isDraftMode) {
    return null;
  }

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Anchor href="/api/draft-mode/disable">
          <Tooltip label="Disable Preview mode" withArrow>
            <ActionIcon variant="filled" aria-label="Disable Preview mode" color="red">
              <IconPencilOff style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Tooltip>
        </Anchor>
      </Affix>

      <VisualEditing />
    </>
  );
}
