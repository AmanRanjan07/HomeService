import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

// Define button variants using cva
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        gradient: 'bg-gradient-to-r from-red-500 to-pink-500',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define our custom button props
export interface ButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Button component that wraps MUI Button with our custom styling
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // Map our custom variants to MUI variants
    const getMuiVariant = (variant: string | null | undefined): MuiButtonProps['variant'] => {
      switch (variant) {
        case 'default':
          return 'contained';
        case 'outline':
          return 'outlined';
        case 'ghost':
        case 'link':
          return 'text';
        default:
          return 'contained';
      }
    };

    // Map our custom sizes to MUI sizes
    const getMuiSize = (size: string | null | undefined): MuiButtonProps['size'] => {
      switch (size) {
        case 'sm':
          return 'small';
        case 'lg':
          return 'large';
        default:
          return 'medium';
      }
    };

    // Style overrides for gradient and custom variants
    const getStyle = () => {
      let style: React.CSSProperties = {};
      
      if (variant === 'gradient') {
        style = {
          background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
          color: 'white',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        };
      }
      
      if (size === 'icon') {
        style = {
          ...style,
          minWidth: '40px',
          width: '40px',
          height: '40px',
          padding: '8px',
        };
      }
      
      return style;
    };

    return (
      <MuiButton
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        variant={getMuiVariant(variant)}
        size={getMuiSize(size)}
        style={getStyle()}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 