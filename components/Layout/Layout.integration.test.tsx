import { render, screen } from '@testing-library/react';
import Layout from './Layout';

// Note: This is an integration test so we don't mock the Header component

describe('Layout Integration Tests', () => {
  it('renders the full layout with real header and content', () => {
    render(
      <Layout>
        <div data-testid="test-content">Integration Test Content</div>
      </Layout>
    );

    // Verify content is rendered
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Integration Test Content')).toBeInTheDocument();
    
    // In a real integration test, we'd verify header elements are rendered
    // This would depend on the actual Header implementation
  });

  it('should properly contain the application content', () => {
    render(
      <Layout>
        <div data-testid="app-content">
          <h1>Main Heading</h1>
          <p>Paragraph content</p>
        </div>
      </Layout>
    );

    // Verify content structure is maintained
    const content = screen.getByTestId('app-content');
    expect(content).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
  });
}); 