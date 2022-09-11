import React from 'react';
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Sidebar from '../components/Sidebar'
import * as theTypes from '../componentTypes/sidebarTypes.types'
import { theData } from '../dataSource/testingData'

describe('sidebar testing', ()=>{
    //does the sidebar appear at all?
    it('renders sidebar correctly', ()=>{
        
        const setHotels = jest.fn()
        const setANK = jest.fn()
        const memHotels: theTypes.hotel[] = theData
        const ank: theTypes.Properties['adultsKids'] = {
            adults: 1,
            kids: 2
        }

        render(<Sidebar setHotels={setHotels} memHotels={memHotels} adultsKids={ank} setAdultsKids={setANK}/>)

        const starRatingFilter = screen.getByTestId('StarsIcon')
        expect(starRatingFilter).toBeInTheDocument()

    })

    //does the collapse function of the starRating expandMore and expandLess? 
    test('the dropdown with star rating works', async ()=>{
        const setHotels = jest.fn()
        const setANK = jest.fn()
        const memHotels: theTypes.hotel[] = theData
        const ank: theTypes.Properties['adultsKids'] = {
            adults: 1,
            kids: 2
        }
        render(<Sidebar setHotels={setHotels} memHotels={memHotels} adultsKids={ank} setAdultsKids={setANK}/>)
        
        userEvent.click(screen.getByTestId('starDropdown'))
        
        const rating = screen.getByRole('radio',{
            checked: true, 
        })
        expect(rating).toBeInTheDocument()
        userEvent.click(screen.getByTestId('starDropdown'))
        const ratingAgain = screen.queryByRole('radio',{
            checked: true, 
        })
        await waitFor(()=>{
            expect(ratingAgain).not.toBeVisible()
        })       
    })

    //does the collapse function of the RoomCapacity expandMore and expandLess? 
    test('the dropdown with room capacity settings works', async ()=>{
        const setHotels = jest.fn()
        const setANK = jest.fn()
        const memHotels: theTypes.hotel[] = theData
        const ank: theTypes.Properties['adultsKids'] = {
            adults: 1,
            kids: 2
        }
        render(<Sidebar setHotels={setHotels} memHotels={memHotels} adultsKids={ank} setAdultsKids={setANK}/>)
        
        userEvent.click(screen.getByTestId('roomDropdown'))
        
        const theSlider = screen.getByRole('slider',{
            name: 'adults', 
        })
        expect(theSlider).toBeInTheDocument()
        userEvent.click(screen.getByTestId('roomDropdown'))
        const theSliderAgain = screen.queryByRole('slider',{
            name: 'adults', 
        })
        await waitFor(()=>{
            expect(theSliderAgain).not.toBeVisible()
        })       
    }) 

    //does a slider in the roomCapacity expandMore work?
    test('testing the slider in the room capacity settings', async ()=>{
        const setHotels = jest.fn()
        const setANK = jest.fn()
        const memHotels: theTypes.hotel[] = theData
        const ank: theTypes.Properties['adultsKids'] = {
            adults: 1,
            kids: 2
        }
        render(<Sidebar setHotels={setHotels} memHotels={memHotels} adultsKids={ank} setAdultsKids={setANK}/>)
        
        userEvent.click(screen.getByTestId('roomDropdown'))
        const theSlider = screen.getByRole('slider',{
            name: 'adults', 
        })
        fireEvent.change(theSlider, {target: {value: '4'}})
        expect(theSlider.value).toBe("4")
    })

    //does the star rating actually have value
    test('seeing if clicking on a star works in rating', async ()=>{
        const setHotels = jest.fn()
        const setANK = jest.fn()
        const memHotels: theTypes.hotel[] = theData
        const ank: theTypes.Properties['adultsKids'] = {
            adults: 1,
            kids: 2
        }
        render(<Sidebar setHotels={setHotels} memHotels={memHotels} adultsKids={ank} setAdultsKids={setANK}/>)
        userEvent.click(screen.getByTestId('starDropdown'))
        
        const theRating = screen.getByRole('radio', {
            name: '3 Stars'
        })
        fireEvent.click(theRating)
        await waitFor(()=>{
            expect(theRating).toBeChecked()
        })
    })
})
