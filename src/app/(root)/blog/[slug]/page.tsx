import {
  Alert,
  Anchor,
  BackgroundImage,
  Blockquote,
  Box,
  Button,
  Center,
  Code,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconAlertCircle, IconArrowUpRight, IconError404 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import CustomPortableText from '~/components/customPortableText';
import { dmSans, robotoMono, syne } from '~/lib/font';
import { sanityFetch } from '~/lib/sanity/client';
import { urlFor } from '~/lib/sanity/image';
import { POST_QUERY } from '~/lib/sanity/queries';
import type { POST_QUERYResult } from '~/t/sanity';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page(props: PageProps) {
  const post = await sanityFetch<POST_QUERYResult>({
    query: POST_QUERY,
    params: {
      slug: props.params.slug,
    },
  });

  if (!post) {
    return (
      <Container py="xl">
        <Center>
          <Alert
            w="50%"
            variant="light"
            color="yellow"
            title="Post Not Found"
            ff={syne.style.fontFamily}
            icon={<IconError404 />}
          >
            <Text ff={dmSans.style.fontFamily}>
              A post with the slug <Code>{props.params.slug}</Code> was not found. Are you sure it
              exists or has not been deleted?
            </Text>
          </Alert>
        </Center>
      </Container>
    );
  }

  return (
    <Box>
      <Container my="xl">
        <BackgroundImage
          h={400}
          radius="md"
          src={urlFor(post.image.asset?._ref)?.blur(100).url() ?? ''}
        >
          <Flex h="100%" p="xl" justify="flex-start" align="flex-end">
            <Stack p="xl" gap="xs">
              <Box>
                <Title order={2} ff={syne.style.fontFamily}>
                  {post.title}
                </Title>

                <Text ff={dmSans.style.fontFamily} fz="sm">
                  {dayjs(post.postedAt).format('DD/MMM/YYYY')}
                </Text>
              </Box>
            </Stack>
          </Flex>
        </BackgroundImage>

        <Container size="md" py="xl">
          <Stack gap="xs">
            {post.note && (
              <Blockquote color="yellow" py="xs" fs="italic" icon={<IconAlertCircle />}>
                <Text ff={dmSans.style.fontFamily}>{post.note}</Text>
              </Blockquote>
            )}

            <Text ff={dmSans.style.fontFamily}>{post.description}</Text>
          </Stack>

          <Divider my="md" />

          <Box>
            <CustomPortableText value={post.body} />
          </Box>
        </Container>
      </Container>

      <Box>
        <Container>
          <Group mb="xl" mx="xl" justify="space-between">
            <Title order={4} ff={syne.style.fontFamily}>
              More Posts
            </Title>

            <Anchor component={Link} href="/blog">
              <Button
                fz="xs"
                ff={robotoMono.style.fontFamily}
                size="compact-xs"
                variant="outline"
                justify="space-between"
                rightSection={<IconArrowUpRight style={{ width: rem(14), height: rem(16) }} />}
              >
                See all
              </Button>
            </Anchor>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
