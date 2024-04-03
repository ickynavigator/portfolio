import { Box, Button, Center, Container, Group, Text, Title, rem } from '@mantine/core';
import Link from 'next/link';
import classes from './error.module.css';

export default function NotFoundPage() {
  return (
    <Container h="100%">
      <Center h="100%">
        <Box>
          <Text fw="900" ta="center" mb="xl" className={classes.label}>
            404
          </Text>
          <Title fw="900" ta="center" mb="xl" className={classes.title}>
            You have found a secret place.
          </Title>
          <Text c="dimmed" size="lg" ta="center" maw={rem(500)} mx="auto" mt="xl" mb="xl">
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page
            has been moved to another URL.
          </Text>
          <Group justify="center">
            <Button variant="outline" size="md" component={Link} href="/">
              Take me back to home page
            </Button>
          </Group>
        </Box>
      </Center>
    </Container>
  );
}
