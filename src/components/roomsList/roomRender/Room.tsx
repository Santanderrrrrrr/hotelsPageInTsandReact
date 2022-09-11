import React from 'react';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Box, Rating, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Carousel from 'react-material-ui-carousel'

import EachRoom from './EachRoom';
import * as theTypes from '../../../componentTypes/allTheTypes.types'


const Room:React.FC<theTypes.roomProperties> = ({ hotels, filteredHotelRoomSets}) =>{               //hotelsRooms = 4*X && hotels = 4*Y


  const theRoomAccordion = (hotels: theTypes.hotel[], hotelRoomSets: theTypes.actHotel[])=>{       //hotelRooms == hotelsRooms == 4*X

    
    let hotelDisplay= hotels?.map((hotel: theTypes.hotel, index: number)=>{

      let theRightRooms = hotelRoomSets[index]
      // console.log(theRightRooms)
  
      return(
        <React.Fragment key={index}>
          <Accordion sx={{width:'80%'}}>
            <AccordionSummary
              data-testid={`batch #${index}`}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Stack key={hotel.id} direction="row" sx={{width:"80%", mb:2}}>
                <Stack sx={{ display:{xs:'none', sm:'flex'}, width:'27%', mr: 3}}>
                    <Carousel
                        next={ (next, active) => null }
                        prev={ (prev, active) => null } 
                        indicators={false}         
                        sx={{width: 150}}
                        NextIcon={<ArrowForwardIos/>}
                        PrevIcon={<ArrowBackIos/>}
                        >
                            {hotel.imgs.map((img, index)=>{
                            return (
                            <Stack key={index} sx={{ width: 150, height: 150, display: 'flex', direction:'row', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                  
                                  // component="img"
                                  style={{maxWidth:'100%', maxHeight:'100%'}}
                                  src={img.url}
                                  alt={hotel.name}
                                />
                            </Stack>)
                            })}
                    </Carousel>
                </Stack>
                                  
                <Stack width="63%" direction="column" justifyContent="flex-start" ml={4} mt={1}>
                  <Box sx={{ width:'100%', display: 'flex', direction: 'row',  justifyContent: "space-between"}}>
                    <Typography variant="h5" component="div">
                      {hotel.name}
                    </Typography>
                    <Rating value={Number(hotel.rating)} readOnly />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{hotel.location.country}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {hotel.location.addresses[0]}
                    </Typography>
                  </Box>
                </Stack>
                
              </Stack>	
            </AccordionSummary>
            <AccordionDetails data-testid={`will be hidden ${index}`}>
              
                <EachRoom theRightRooms={theRightRooms} indexNum={index}/>
              
            </AccordionDetails>
          </Accordion>         
        </React.Fragment>
    )})
    return hotelDisplay
  }


  return (
    <>
      {theRoomAccordion(hotels, filteredHotelRoomSets)}
    </>
      
    
  );
}

export default Room

