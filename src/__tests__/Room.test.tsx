import React from 'react';
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Room from '../components/roomsList/roomRender/Room'
import * as theTypes from '../componentTypes/productDisplay.types'
import { theData, theRooms } from '../dataSource/testingData'

describe('the room test suite', () => {
    test('should render', () => {
        const hotels = theData
        const filteredHotelRoomSets = theRooms
        render(<Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)
    })

    test('does each hotel display have a dropdown?', ()=>{
        const hotels = theData
        const filteredHotelRoomSets = theRooms
        render(<Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)
    
        const theDropdown = screen.getByTestId('batch #1')
        
        expect(theDropdown).toBeInTheDocument()
    })

    test('expect the dropdown to open on clicking', async ()=>{
        const hotels = theData
        const filteredHotelRoomSets = theRooms
        const {container} = render(<Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)
    
        const theDropdown = screen.getByTestId('batch #1')

        userEvent.click(theDropdown)

        await waitFor( async()=>{
            expect(screen.getByTestId(`room 1 of hotel 1`)).toBeInTheDocument()
        })
    })

    test('expect the dropdown not to be there on second click', async ()=>{
        const hotels = theData
        const filteredHotelRoomSets = theRooms
        render(<Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>)
    
        const theDropdown = screen.getByTestId('batch #1')

        userEvent.click(theDropdown)

        
        expect(screen.getByTestId(`room 1 of hotel 1`)).toBeInTheDocument()
        

        fireEvent.click(theDropdown)
        // expect(theDropdown).toHaveBeenCalledTimes(2)
        const missingElement = screen.queryByTestId(`will be hidden 1`)
        await waitFor(()=>{
            expect(missingElement).not.toBeVisible()
        })
        
        

    })
})