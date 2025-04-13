import { render, screen } from '@testing-library/react';
import Layout from './Layout';

// Mock the Header component
jest.mock('@/components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header Mock</div>;
  };
});

describe('Layout Component', () => {
  it('renders the header and children', () => {
    render(
      <Layout>
        <div data-testid="test-children">Test Children Content</div>
      </Layout>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Children Content')).toBeInTheDocument();
  });

  it('maintains correct structure with main content area', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    // Main content should be inside a main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent('Content');
  });
});
