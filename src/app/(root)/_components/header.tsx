import { Avatar, Group, Paper, Title } from '@mantine/core';
import clsx from 'clsx';
import classes from '~/app/(root)/_components/header.module.css';
import Menu from '~/app/(root)/_components/menu';
import { syne } from '~/lib/font';

export default function Header() {
  return (
    <Paper
      component="header"
      withBorder
      radius={0}
      className={clsx(classes.wrapper, syne.className)}
      p="md"
      px="xl"
    >
      <Group justify="space-between">
        <Group>
          <Avatar color="initials" name="Obi Fortune" />

          <Title className={syne.className}>Obi Fortune</Title>
        </Group>

        <Menu />
      </Group>
    </Paper>
  );
}
