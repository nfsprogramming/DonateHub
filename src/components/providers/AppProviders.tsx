'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <CommandPalette />
    </AuthProvider>
  );
}
