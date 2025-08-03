// External imports
import { render, screen } from '@testing-library/react';

// Local imports
import CourseProgram from '.';

test('Render HomePage', () => {
  render(<CourseProgram />);
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
