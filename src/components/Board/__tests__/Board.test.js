import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Board from '..';

describe('Board component', () => {
  it('should render a canvas element', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    const canvasElement = screen.getByRole('graphics-document');
    expect(canvasElement).toBeInTheDocument();
  });
});
