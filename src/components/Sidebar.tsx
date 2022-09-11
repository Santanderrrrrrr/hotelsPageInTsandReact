import React, { useEffect, useState } from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Rating, Stack, Slider } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarsIcon from '@mui/icons-material/Stars'
import SingleBedIcon from '@mui/icons-material/SingleBed'
import Collapse from '@mui/material/Collapse';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

import * as theTypes from '../componentTypes/allTheTypes.types'

// function debounce<F extends (...params: any[]) => void> (func: F, delay = 1000){
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return (...args:any[])=>{
//       if(timeoutId){
//           clearTimeout(timeoutId)
//       }
//       timeoutId = setTimeout(() =>{
//           // console.log("timer called")
//           func.apply(null, args)
//       }, delay);
      
//   }
// }

const Sidebar: React.FC<theTypes.SidebarProperties> = ({setHotels,  memHotels, setAdultsKids, adultsKids}) => {

  const [starList, setStarList] = useState<boolean>(false);
  const [roomList, setRoomList] = useState<boolean>(false);
  const [value, setValue] = React.useState<number | null>(2);


  const collapseStars = () => { 
    setStarList(!starList);
  };
  const collapseRooms = () => {
    setRoomList(!roomList);
  };

  useEffect(()=>{
    if(value){
      let ratedHotels = memHotels.filter((hotel)=>{
        return Number(hotel.rating) >= value
      })
      setHotels(ratedHotels)
    }
    
    
  }, [value])

  
  return (
    // <ThemeProvider theme={theme}>
      <Box >
        <Stack display="flex" direction={{xs:'row', md:'column'}} justifyContent="flex-start" alignItems={{xs:"flex-start", md:"flex-start"}} spacing={0}>
          <Box> 
            <ListItemButton data-testid='starDropdown' onClick={collapseStars}>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Filter By Star Rating" />
              {starList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={starList} timeout="auto" unmountOnExit >
              <Box sx={{ display: 'flex', direction: 'column', justifyContent:{lg: 'center', xs: 'center'}, ml:{lg: 4, xs:4}, alignItems: 'center'}}>
                <Rating
                  
                  name="simple-controlled"
                  data-testid='starRatingRadios'
                  value={value}
                  onChange={(event, newValue) => {
                    
                    setValue(newValue)
                  }}
                />
              </Box>
            </Collapse>
          </Box>
          <Box>
            <ListItemButton data-testid='roomDropdown' onClick={collapseRooms}>
              <ListItemIcon>
                <SingleBedIcon />
              </ListItemIcon>
              <ListItemText primary="Filter By Room Capacity" />
              {roomList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={roomList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4}}>
                  <Stack sx={{width:'80%', display:'flex', direction: 'column', alignItems: 'center'}}>
                    <Box sx={{width:'100%', display:'flex', direction: 'column', alignItems:'center'}}>
                      <ListItemIcon sx={{mr:0}}>
                        <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Adults" sx={{ml:0}}/>
                    </Box>
                    
                    <Slider aria-label="adults" defaultValue={0} marks step={1} min={0} max={6} 
                      onChange={(event, value) =>{
                        
                        setAdultsKids({...adultsKids, adults:value as number})
                        }}/>
                  </Stack>
                </ListItemButton>

                  
                <ListItemButton sx={{ pl: 4 }}>
                  <Stack sx={{width:'80%', display:'flex', direction: 'column', alignItems: 'center'}}>
                    <Box sx={{width:'100%', display:'flex', direction: 'column', alignItems:'center'}}>
                      <ListItemIcon sx={{mr:0}}>
                        <EscalatorWarningIcon />
                      </ListItemIcon>
                      <ListItemText primary="Children" sx={{ml:0}}/>
                    </Box>
                    
                    <Slider aria-label="kids" defaultValue={0} marks step={1} min={0} max={4} 
                      onChange={(event, value) =>{
                        
                        setAdultsKids({...adultsKids, kids:value as number})
                        }} />
                  </Stack>

                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        </Stack>
      </Box>
    // {/* </ThemeProvider> */}
  )
}

export default Sidebar