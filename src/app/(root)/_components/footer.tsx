import {
  Anchor,
  Badge,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from '@mantine/core';
import {
  type Icon,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCode,
  IconMail,
  type IconProps,
} from '@tabler/icons-react';
import React from 'react';
import Copy from '~/app/(root)/_components/copy';
import classes from '~/app/(root)/_components/footer.module.css';
import { syne } from '~/lib/font';

type Link = {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
} & ({ color: string } | { color: [string, string, number] });

const links: Link[] = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconBrandX,
    color: '#010101',
  },
  {
    label: 'Facebook',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconBrandFacebook,
    color: ['#0062E0 2.99%', '#19AFFF 100%', 0],
  },
  {
    label: 'Github',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconBrandGithub,
    color: '#24292F',
  },
  {
    label: 'LinkedIn',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconBrandLinkedin,
    color: '#0077B5',
  },
  {
    label: 'Code',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconCode,
    color: '#010101',
  },
  {
    label: 'Mail',
    href: 'https://twitter.com/obifortunebleh',
    icon: IconMail,
    color: '#010101',
  },
];

function getColor(linkList: (typeof links)[number]) {
  const color = linkList.color;

  if (Array.isArray(color)) {
    const [from, to, deg] = color;

    return { variant: 'gradient', gradient: { from, to, deg } };
  }

  return { color };
}

export default function Footer() {
  return (
    <Container>
      <Stack component="footer" mx={{ sm: 'xl' }} className={syne.className}>
        <>
          <Paper withBorder py="xl" px={{ xs: rem(80) }} radius="md" className={classes.paper}>
            <Center>
              <Stack align="center" gap="xl">
                <Stack gap="xs" align="center">
                  <Badge variant="outline" size="lg" className={classes.badge}>
                    Get In Touch
                  </Badge>
                  <Text fz="h1" fw="bolder" ta="center" lh={1}>
                    Got a web project that needs a superhero?
                  </Text>
                </Stack>
                <Group gap="xs">
                  {links.map((link) => (
                    <Anchor
                      key={link.label}
                      className={classes.iconWrapper}
                      href={link.href}
                      target="_blank"
                    >
                      <ThemeIcon className={classes.icon} radius="xl" size="md" {...getColor(link)}>
                        <link.icon style={{ width: rem(18), height: rem(18) }} />
                      </ThemeIcon>
                    </Anchor>
                  ))}
                </Group>
              </Stack>
            </Center>
          </Paper>
        </>
        <Copy />
      </Stack>
    </Container>
  );
}
