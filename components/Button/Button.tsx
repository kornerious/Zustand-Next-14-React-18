'use client';

import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styled';

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button; 