// External imports
import { render, screen } from '@testing-library/react';

// Local imports
import AboutAuthor from '.';

test('Render HomePage', () => {
  render(<AboutAuthor />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
