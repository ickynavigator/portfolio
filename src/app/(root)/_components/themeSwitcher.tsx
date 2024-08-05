'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import classes from '~/app/(root)/_components/themeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ActionIcon onClick={toggleColorScheme} variant="subtle" aria-label="Toggle color scheme">
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
