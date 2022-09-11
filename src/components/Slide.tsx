import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-material-ui-carousel'

import * as theTypes from '../componentTypes/allTheTypes.types'

const Slide: React.FC<theTypes.ForMapB> = ({mahoteli}) => {
  return (
  
    <Carousel
      next={ (next, active) => null }
      prev={ (prev, active) => null } 
      indicators={false}         
      sx={{width: '100%', maxHeight:'30vh', display: 'flex', alignItems: 'center'}}
      NextIcon={<ArrowForwardIos/>}
      PrevIcon={<ArrowBackIos/>}
      >
        {mahoteli!.map((hotel, index)=>{
          return (
            <Stack key={index} sx={{ maxWidth: '100%', height: '100%', display: 'flex', direction:'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <img
                  
                  // component="img"
                  style={{width:'100%', height:'100%', maxWidth: '100%', maxHeight: '100%'}}
                  src={hotel.imgs[0].url}
                  alt={hotel.name}
                />
                <Typography variant="h1" sx={{position:'absolute', ml: 10, color:'white'}}>{hotel.name}</Typography>
            </Stack>
          )
        })}
    </Carousel>
  )
}

export default Slide