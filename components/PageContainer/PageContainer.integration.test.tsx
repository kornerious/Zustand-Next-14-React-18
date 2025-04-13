import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

// Integration test with real theme
const theme = createTheme();

describe('PageContainer Integration Tests', () => {
  it('renders with theme correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageContainer title="Integration Test" subtitle="With Theme Provider">
          <Typography data-testid="test-content">
            This is theme-aware content
          </Typography>
        </PageContainer>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Integration Test')).toBeInTheDocument();
    expect(screen.getByText('With Theme Provider')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('integrates with custom header and footer', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageContainer 
          header={<header data-testid="custom-header">App Header</header>}
          footer={<footer data-testid="custom-footer">App Footer</footer>}
        >
          <div data-testid="main-area">Main Content Area</div>
        </PageContainer>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.getByTestId('main-area')).toBeInTheDocument();
  });

  it('works with different maxWidth values', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageContainer maxWidth="sm">
          <div data-testid="narrow-content">Narrow Container Content</div>
        </PageContainer>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('narrow-content')).toBeInTheDocument();
    expect(screen.getByText('Narrow Container Content')).toBeInTheDocument();
  });
}); 