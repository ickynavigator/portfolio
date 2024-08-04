'use client';

import { createTheme } from '@mantine/core';
import { robotoSlab } from '~/lib/font';

export const theme = createTheme({
  fontFamily: `${robotoSlab.style.fontFamily}, sans-serif`,
});
