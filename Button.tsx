'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  href?: string;
}

const Button = (props: ButtonProps) => {
  return <MuiButton {...props} />;
};

export default Button; 