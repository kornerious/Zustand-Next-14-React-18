import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a test theme to simulate real-world usage
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

describe('Button Integration Tests', () => {
  it('renders properly within ThemeProvider', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary">
          Themed Button
        </Button>
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button', { name: 'Themed Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-contained');
    expect(button).toHaveClass('MuiButton-colorPrimary');
  });

  it('handles user interactions correctly', () => {
    const handleClick = jest.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <Button onClick={handleClick}>
          Interactive Button
        </Button>
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button', { name: 'Interactive Button' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be used as part of a form', () => {
    render(
      <ThemeProvider theme={theme}>
        <form data-testid="test-form">
          <input type="text" placeholder="Enter your name" />
          <Button type="submit">Submit Form</Button>
        </form>
      </ThemeProvider>
    );
    
    const form = screen.getByTestId('test-form');
    const button = screen.getByRole('button', { name: 'Submit Form' });
    
    expect(form).toContainElement(button);
    expect(button).toHaveAttribute('type', 'submit');
  });
}); 