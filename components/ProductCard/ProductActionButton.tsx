import React from "react";
import { Button } from "@mui/material";

interface ProductActionButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: "primary" | "secondary" | "light";
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: object;
}

const ProductActionButton: React.FC<ProductActionButtonProps> = ({
  label,
  onClick,
  color = "primary",
  disabled = false,
  fullWidth = true,
  sx = {},
}) => (
  <Button
    variant="contained"
    color={color === "light" ? "primary" : color}
    fullWidth={fullWidth}
    disabled={disabled}
    onClick={onClick}
    sx={{
      borderRadius: 2,
      fontWeight: 500,
      py: 0.7,
      px: 2,
      minHeight: 36,
      textTransform: "none",
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
      border: "none",
      zIndex: 2,
      letterSpacing: 0.2,
      fontSize: { xs: "0.95rem", md: "1rem" },
      lineHeight: 1.1,
      transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
      mb: 2,
      ...sx,
    }}
  >
    {label}
  </Button>
);

export default ProductActionButton;
