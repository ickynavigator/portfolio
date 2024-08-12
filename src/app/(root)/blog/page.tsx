import {
  Alert,
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconArrowUpRight, IconError404 } from '@tabler/icons-react';
import Link from 'next/link';
import classes from '~/app/(root)/blog/_page.module.css';
import { dayjs } from '~/lib/date';
import { dmSans, robotoMono, syne } from '~/lib/font';
import { sanityFetch } from '~/lib/sanity/client';
import { urlFor } from '~/lib/sanity/image';
import { PAGINATED_POSTS_QUERY } from '~/lib/sanity/queries';
import type { PAGINATED_POSTS_QUERYResult } from '~/t/sanity';

export type PostProps = {
  post: PAGINATED_POSTS_QUERYResult['data'][number];
};
function PostItem(props: PostProps) {
  const { post } = props;

  return (
    <Stack>
      <Image
        src={urlFor(post.image?.asset?._ref)?.auto('format').url()}
        alt={post.title}
        radius="md"
      />

      <Group justify="space-between" align="flex-end" wrap="nowrap">
        <Box>
          <Text fw="bold" lineClamp={1} ff={syne.style.fontFamily}>
            {post.title}
          </Text>

          <Group gap={rem(4)} ff={dmSans.style.fontFamily} fz="sm" c="dimmed">
            <Text inherit>{dayjs(post.postedAt).format('DD/MMM/YYYY')}</Text>
            <Text inherit>&#x2022;</Text>
            <Text inherit>3 min read</Text>
          </Group>
        </Box>

        <Anchor component={Link} href={`/blog/${post.slug.current}`}>
          <Button
            fz="xs"
            ff={robotoMono.style.fontFamily}
            size="compact-xs"
            variant="outline"
            justify="space-between"
            rightSection={<IconArrowUpRight style={{ width: rem(14), height: rem(16) }} />}
            className={classes['bouncing-section']}
            __vars={{
              '--translate-size': '2px',
            }}
          >
            More
          </Button>
        </Anchor>
      </Group>
    </Stack>
  );
}

function HeroPost(props: PostProps) {
  const { post } = props;
  const image = urlFor(post.image?.asset?._ref);

  if (!image) {
    return null;
  }

  return (
    <BackgroundImage src={image.auto('format').blur(100).url()} radius="md" h={400}>
      <Flex h="100%" justify="flex-start" align="flex-end" p="xl">
        <Stack p="xl" gap="xs">
          <Box>
            <Title order={2} ff={syne.style.fontFamily}>
              {post.title}
            </Title>

            <Group gap={rem(4)} ff={dmSans.style.fontFamily} fz="sm">
              <Text inherit>{dayjs(post.postedAt).format('DD/MMM/YYYY')}</Text>
              <Text inherit>&#x2022;</Text>
              <Text inherit>3 min read</Text>
            </Group>
          </Box>

          <Box>
            <Anchor component={Link} href={`/blog/${post.slug.current}`}>
              <Button
                fz="xs"
                ff={robotoMono.style.fontFamily}
                size="compact-xs"
                variant="outline"
                justify="space-between"
                rightSection={<IconArrowUpRight style={{ width: rem(14), height: rem(16) }} />}
                className={classes['bouncing-section']}
                __vars={{
                  '--translate-size': '2px',
                }}
              >
                Read More
              </Button>
            </Anchor>
          </Box>
        </Stack>
      </Flex>
    </BackgroundImage>
  );
}

export default async function Page() {
  const posts = await sanityFetch<PAGINATED_POSTS_QUERYResult>({
    query: PAGINATED_POSTS_QUERY,
  });

  const [firstPost, ...restPosts] = posts.data;

  if (!firstPost) {
    return (
      <Container py="xl">
        <Center>
          <Alert variant="light" color="yellow" title="No Posts Found" icon={<IconError404 />}>
            Please check back later. We are working on new content.
          </Alert>
        </Center>
      </Container>
    );
  }

  return (
    <Container py="xl">
      <HeroPost post={firstPost} />

      <Grid my="xl">
        {restPosts.map((post) => (
          <GridCol span={{ base: 12, xs: 6 }} key={post._id}>
            <PostItem post={post} />
          </GridCol>
        ))}
      </Grid>
    </Container>
  );
}
