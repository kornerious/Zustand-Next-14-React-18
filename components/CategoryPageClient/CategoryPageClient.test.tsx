import { render, screen } from '@testing-library/react';
import CategoryPageClient from './CategoryPageClient';

describe('CategoryPageClient', () => {
  it('renders without crashing', () => {
    render(<CategoryPageClient products={[]} categoryName="Test" />);
    expect(screen.getByTestId('category-page-client')).toBeInTheDocument();
  });
});
