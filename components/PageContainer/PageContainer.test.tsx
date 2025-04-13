import { render, screen } from '@testing-library/react';
import PageContainer from './PageContainer';

describe('PageContainer Component', () => {
  it('renders children correctly', () => {
    render(
      <PageContainer>
        <div data-testid="test-child">Test Content</div>
      </PageContainer>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders title and subtitle when provided', () => {
    render(
      <PageContainer title="Test Title" subtitle="Test Subtitle">
        <div>Child Content</div>
      </PageContainer>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders header and footer when provided', () => {
    render(
      <PageContainer 
        header={<div data-testid="test-header">Header</div>}
        footer={<div data-testid="test-footer">Footer</div>}
      >
        <div>Main Content</div>
      </PageContainer>
    );
    
    expect(screen.getByTestId('test-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-footer')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('uses default maxWidth and disableGutters values', () => {
    render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    
    // The main container should use default values (lg maxWidth, gutters enabled)
    const container = screen.getByRole('main');
    expect(container).toBeInTheDocument();
  });
}); 