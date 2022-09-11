import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProductDisplayGrid from '../components/moduleOrList/ProductDisplayGrid'
import { theData } from '../dataSource/testingData'


describe('testing the module display', () => {
    test('does it render to begin with?',() => {
        const setOpenIt = jest.fn()
        const setModalHotel = jest.fn()
        render(<ProductDisplayGrid hotels={theData} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>)
        expect(screen.getByTestId('image for hotel #0')).toBeInTheDocument()
    })


    ///come back to this
    // test('does the modal pop up', async () => {
    //     const setOpenIt = jest.fn()
    //     const setModalHotel = jest.fn()
    //     render(<ProductDisplayGrid hotels={theData} setOpenIt={setOpenIt} setModalHotel={setModalHotel}/>)
        
    //     const viewButton = screen.getByTestId('viewButton-2')

    //     fireEvent.click(viewButton)

    //     return screen.findByRole('img', {name:`${theData[2].rating}`})
    //     .then((returnValue)=>expect(returnValue).toBeInTheDocument())
    
    // })

    
})