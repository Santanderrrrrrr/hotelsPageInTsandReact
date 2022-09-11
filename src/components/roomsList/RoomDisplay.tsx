import {  Stack } from '@mui/material';
import React from 'react'

import Room from './roomRender/Room';
import { roomProperties } from '../../componentTypes/allTheTypes.types'



const RoomDisplay: React.FC<roomProperties> = ({hotels, filteredHotelRoomSets}) => {

  

    

  return (
    
    
    <>
      <Stack sx={{width:"100%", display: 'flex', direction:"column", alignItems:'center'}} >
        <Room hotels={hotels} filteredHotelRoomSets={filteredHotelRoomSets}/>
      </Stack>
    </>
  )
}

export default RoomDisplay