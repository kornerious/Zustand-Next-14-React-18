import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import '@testing-library/jest-dom';

// Mock next/dynamic to return the correct specific mock based on the loader
jest.mock('next/dynamic', () => (loader: () => Promise<{ default: React.ComponentType<any> }>) => {
  // Convert the loader function to string to inspect its content
  // This is a heuristic and might be fragile
  const loaderString = String(loader);

  // Adjust these conditions based on the console output from the test run
  if (loaderString.includes('Header')) { 
    // Return the Header mock if the loader seems to import Header
    return () => <div data-testid="mock-header">Mock Header</div>;
  }
  if (loaderString.includes('Footer')) { 
    // Return the Footer mock if the loader seems to import Footer
    return () => <div data-testid="mock-footer">Mock Footer</div>;
  }
  // Default fallback (optional, might not be needed if Layout only loads Header/Footer)
  return () => <div data-testid="generic-dynamic-mock">Generic Mock</div>;
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
        <div>Child Content</div>
      </Layout>
    );
    // Check for main element structure
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toContainHTML('<div>Child Content</div>');

    // Expect footer mock to be present
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
