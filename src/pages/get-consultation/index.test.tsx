// External imports
import { render, screen } from '@testing-library/react';

// Local imports
import GetConsultation from '.';

test('Render HomePage', () => {
  render(<GetConsultation />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
