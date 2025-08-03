/**
 * Testing file for the HelloWorld component.
 */
import { render, screen } from '@testing-library/react';
import HelloWorld from '.';

test('Render HelloWorld Component', () => {
  const element = screen.getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
