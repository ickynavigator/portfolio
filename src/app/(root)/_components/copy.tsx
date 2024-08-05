import { Anchor, Group, Text } from '@mantine/core';

interface AttributionProps {
  name: string;
  link: string;
}

const designer: AttributionProps = {
  name: 'Tawakkalt',
  link: 'https://twitter.com/obifortunebleh',
};
const developer: AttributionProps = {
  name: 'Obi Fortune',
  link: 'https://twitter.com/obifortunebleh',
};

export default function Copy() {
  const year = new Date().getFullYear();

  return (
    <Group justify="space-between">
      <Text>&copy; {year} Obi Fortune</Text>

      <Text>
        Designed by <Attribution {...designer} />; Developed by <Attribution {...developer} />
      </Text>
    </Group>
  );
}

function Attribution(props: AttributionProps) {
  return <Anchor href={props.link}>{props.name}</Anchor>;
}
