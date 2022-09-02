import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'


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

  interface Properties {
    theRightRooms: room[]
  }

const EachRoom: React.FC<Properties> = ({theRightRooms}) => {

    const roomsMap = theRightRooms?.map((room, index)=>{
        return (
            <>
                <Stack key={index} direction="row"  sx={{display: 'flex', justifyContent: 'flex-start', mt:3}}>
                    
                    
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
                

            </>)
    })
  return (
    <>
    <Typography variant="body1">Available Rooms </Typography>
    {roomsMap}
    </>
  )
}

export default EachRoom