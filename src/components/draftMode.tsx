import { Affix, Anchor, Button, rem } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

function DraftModeDisableButton() {
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Anchor href="/api/draft-mode/disable">
        <Button leftSection={<IconPencil style={{ width: rem(16), height: rem(16) }} />}>
          Disable preview mode
        </Button>
      </Anchor>
    </Affix>
  );
}

export default function DraftMode() {
  const isDraftMode = draftMode().isEnabled;

  return (
    <>
      {isDraftMode && <DraftModeDisableButton />}

      {isDraftMode && <VisualEditing />}
    </>
  );
}
