'use client';

import { createTheme } from '@mantine/core';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const theme = createTheme({
  fontFamily: `Inter, ${inter.className}`,
});
