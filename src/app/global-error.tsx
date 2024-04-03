'use client';

import { Box, Button, Center, Container, Group, Text, Title, rem } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classes from './error.module.css';

export default function GlobalErrorPage() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <Container h="100%">
      <Center h="100%">
        <Box>
          <Text fw="900" lh="1" ta="center" mb="xl" className={classes.label}>
            500
          </Text>
          <Title fw="900" ta="center" mb="xl" className={classes.title}>
            Bummer!
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={rem(500)} mx="auto" mt="xl" mb="xl">
            Unfortunately, an error has occured on the server. Please try again
          </Text>
          <Group justify="center">
            <Button variant="subtle" size="md" color="yellow" onClick={handleRefresh}>
              Refresh Page
            </Button>
            <Button variant="outline" size="md" component={Link} href="/">
              Take me back to home page
            </Button>
          </Group>
        </Box>
      </Center>
    </Container>
  );
}
