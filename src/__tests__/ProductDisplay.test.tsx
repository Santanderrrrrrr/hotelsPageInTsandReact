import React from 'react';
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProductDisplay from '../components/ProductDisplay'
import * as theTypes from '../componentTypes/productDisplay.types'
import { theData, theRooms } from '../dataSource/testingData'

describe('suite of tests for the Hotel Display components',() => {
    test('it renders to begin with', () => {
        const hotels:theTypes.hotel[] = theData
        let filteredHotelRoomSets: theTypes.actHotel[] = theRooms
        render(<ProductDisplay hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)

        expect(screen.getByText('Hotels')).toBeInTheDocument()
        expect(screen.getByText('Hotels w/ Rooms')).toBeInTheDocument()
    })

    test('the view is different depending on the view picked', async ()=>{
        const hotels:theTypes.hotel[] = theData
        let filteredHotelRoomSets: theTypes.actHotel[] = theRooms
        render(<ProductDisplay hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)

        const justHotels = screen.getByRole('tab', {
            name: 'Hotels'
        })
        fireEvent.click(justHotels)
        await waitFor(()=>{
            expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument()
        })
        const hnrs = screen.getByRole('tab', {
            name: 'Hotels w/ Rooms'
        })
        userEvent.click(hnrs)
        await waitFor(()=>{
            expect(screen.getByTestId('batch #0')).toBeInTheDocument()
        })
    })
})