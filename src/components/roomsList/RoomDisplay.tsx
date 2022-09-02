import {  Stack } from '@mui/material';
import React from 'react'

import Room from './roomRender/Room';

type room = {
  id: string
  name: string
  bedConfiguration: string
  longDescription: string
  occupancy:{
      maxAdults: number,
      maxChildren: number,
  }
  disabledAccess: boolean
  facilities:{
      code: string,
      name: string
  }[]
  images: {
      url: string
  }[]

}

type actHotel = room[] //X

type hotel = {
    id: string
    name: string;
    imgs: {
      url: string
    }[] 
    contacts:{
      email: string
      telephone: number
    }
    location:{
        geoLocation:{
          latitude: number
          longitude: number
          timezone: string
        }
        country: string
        town: string
        countryCode: string
        postCode: string
        addresses: string[]
    }
    rating: number
    description: string
  }

 

  
  

  interface Properties{
    hotels:hotel[]
    filteredHotelRoomSets: actHotel[]
  }

const RoomDisplay: React.FC<Properties> = ({hotels, filteredHotelRoomSets}) => {

  

    

  return (
    
    
    <>
      <Stack sx={{width:"100%", display: 'flex', direction:"column", alignItems:'center'}} >
        <Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>
      </Stack>
    </>
  )
}

export default RoomDisplay