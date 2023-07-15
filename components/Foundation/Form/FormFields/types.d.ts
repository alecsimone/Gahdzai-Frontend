import { ChangeEventHandler } from 'react';

interface BasicFieldProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

// eslint-disable-next-line import/prefer-default-export
export type { BasicFieldProps };
