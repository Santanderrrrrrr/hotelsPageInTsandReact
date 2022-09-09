import React from 'react';
import { render, screen } from '@testing-library/react';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import App from '../App';





describe('app tests',()=>{
  test('sidebar renders', async () => {
    render(<App />);

    const fbsr = screen.getByText('Filter By Star Rating')
    expect(fbsr).toBeInTheDocument();

    const fbrc = screen.getByText('Filter By Room Capacity')
    expect(fbrc).toBeInTheDocument();
}, 8000);

  test('hotels section renders', ()=>{
    render(<App />)
    
    const HWR = screen.getByText('Hotels w/ Rooms')
    expect(HWR).toBeInTheDocument()

    const hotels = screen.getByText('Hotels')
    expect(hotels).toBeInTheDocument()
  })

  test('the map section renders', ()=>{
    render(<App />)
    
    const loading = screen.getByText('Loading...')
    expect(loading).toBeInTheDocument()

  })
})


