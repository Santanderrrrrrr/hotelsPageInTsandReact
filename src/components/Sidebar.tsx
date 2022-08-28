import React, { useEffect, useState, useMemo } from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Rating, Stack } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarsIcon from '@mui/icons-material/Stars'
import SingleBedIcon from '@mui/icons-material/SingleBed'
import Collapse from '@mui/material/Collapse';
// import StarBorder from '@mui/icons-material/StarBorder';
import BedIcon from '@mui/icons-material/Bed';
import HotelIcon from '@mui/icons-material/Hotel';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';



const theme = createTheme();

type hotel = {
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
  memHotels:hotel[]
  setHotels: React.Dispatch<React.SetStateAction<hotel[]>>
}

const Sidebar: React.FC<Properties> = ({setHotels, hotels, memHotels}) => {

  const [starList, setStarList] = useState<boolean>(true);
  const [roomList, setRoomList] = useState<boolean>(true);

  const [value, setValue] = React.useState<number | null>(2);

  const memorizedHotels = useMemo(()=> hotels, [])

  const collapseStars = () => {
    
    setStarList(!starList);
  };
  const collapseRooms = () => {
    setRoomList(!roomList);
  };

  useEffect(()=>{
    console.log('çhange registered', memorizedHotels)
    if(value){
      let ratedHotels = memHotels.filter((hotel)=>{
        return Number(hotel.rating) >= value
      })
      setHotels(ratedHotels)
    }
  }, [value])

//sx={{display: 'flex', direction: {xs:'column', md:'row'}, alignItems:"flex-start"}}
  return (
    <ThemeProvider theme={theme}>
      <Box >
        <Stack display="flex" direction={{xs:'row', md:'column'}} justifyContent="flex-start" alignItems={{xs:"flex-start", md:"flex-start"}} spacing={0}>
          <Box> 
            <ListItemButton onClick={collapseStars}>
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
                  value={value}
                  onChange={(event, newValue) => {
                    
                    setValue(newValue);
                  }}
                />
              </Box>
            </Collapse>
          </Box>
          <Box>
            <ListItemButton onClick={collapseRooms}>
              <ListItemIcon>
                <SingleBedIcon />
              </ListItemIcon>
              <ListItemText primary="Filter By Room Capacity" />
              {roomList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={roomList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <HotelIcon />
                  </ListItemIcon>
                  <ListItemText primary="Single Bed" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BedIcon />
                    
                  </ListItemIcon>
                  <ListItemText primary="Double" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <EscalatorWarningIcon />
                  </ListItemIcon>
                  <ListItemText primary="With Children" />
                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}

export default Sidebar