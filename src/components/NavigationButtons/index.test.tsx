import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationButtons from './index';
import { BrowserRouter } from 'react-router-dom';

describe('NavigationButtons Component', () => {
  it('renders all four buttons with correct labels', () => {
    render(
      <BrowserRouter>
        <NavigationButtons />
      </BrowserRouter>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Программа Курса')).toBeInTheDocument();
    expect(screen.getByText('Об Авторе')).toBeInTheDocument();
    expect(screen.getByText('Получить Консультацию')).toBeInTheDocument();
  });

  it('applies a custom CSS class when provided', () => {
    const { container } = render(
      <BrowserRouter>
        <NavigationButtons className="test-class" />
      </BrowserRouter>
    );
    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });
});
