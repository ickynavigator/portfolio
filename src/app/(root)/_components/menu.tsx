'use client';

import { Anchor, Box, Burger, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import ThemeSwitcher from '~/app/(root)/_components/themeSwitcher';

const links = [
  { title: 'About', href: '/about' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
  { title: 'Resume', href: '/cv' },
  { title: 'Contact', href: '/contact' },
];

export default function Menu() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <>
      <Group visibleFrom="md">
        {links.map(({ title, href }) => (
          <Anchor key={title} component={Link} href={href}>
            {title}
          </Anchor>
        ))}

        <ThemeSwitcher />
      </Group>

      <Box hiddenFrom="md">
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size="sm" />

        <Drawer opened={opened} onClose={close}>
          <Stack gap="xl" mx="-sm" my="-sm" p="xl" align="center">
            {links.map(({ title, href }) => (
              <Anchor key={title} component={Link} href={href}>
                {title}
              </Anchor>
            ))}
          </Stack>
        </Drawer>
      </Box>
    </>
  );
}
