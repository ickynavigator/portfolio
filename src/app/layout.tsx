import '@mantine/core/styles.css';

import '~/app/globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';
import { theme } from '~/lib/mantine/theme';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
