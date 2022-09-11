import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'

import * as theTypes from '../../../componentTypes/allTheTypes.types'

const EachRoom: React.FC<theTypes.eachRoomProperties> = ({theRightRooms, indexNum}) => {

    const roomsMap = theRightRooms?.map((room, index)=>{
        return (
            <React.Fragment key={index} >
                <Stack data-testid={`room ${index} of hotel ${indexNum}`} key={index} direction="row"  sx={{display: 'flex', justifyContent: 'flex-start', mt:3}}>
                    
                    
                    <Stack sx={{width: '30%', mr: 2}} >
                        <Typography variant="h6" mb={1}>{room.name}</Typography>
                        <Typography variant="body2">adults: {room.occupancy.maxAdults}</Typography>
                        <Typography variant="body2">Children: {room.occupancy.maxChildren}</Typography>
                    </Stack>
                    {/* <Divider orientation="vertical" flexItem sx={{mr:2}}/> */}
                    <Stack sx={{justifyContent: 'center', width:'70%' }}>
                        <Typography variant="overline">{room.longDescription.length>300? room.longDescription.slice(0, 300) + '...':room.longDescription}</Typography>
                    </Stack>
                </Stack>
                {index === theRightRooms.length-1? "": (<Divider orientation="horizontal" flexItem sx={{m:2}}/>)}
                

            </React.Fragment>)
    })
  return (
    <>
        <Typography variant="body1">{theRightRooms && Object.keys(theRightRooms).length>0? 'Available Rooms' : 'No rooms in this hotel are of capacity'} </Typography>
        {roomsMap}
    </>
  )
}

export default EachRoom