import React, { useEffect, useState } from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Rating, Stack, Slider } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarsIcon from '@mui/icons-material/Stars'
import SingleBedIcon from '@mui/icons-material/SingleBed'
import Collapse from '@mui/material/Collapse';
import BedIcon from '@mui/icons-material/Bed';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';



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

type actHotel = room[]



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
  hotelsRoomsSets: actHotel[]
  setFilteredHotelRoomSets: React.Dispatch<React.SetStateAction<actHotel[]>>
  memHotels:hotel[]
  setHotels: React.Dispatch<React.SetStateAction<hotel[]>>
}

function valuetext(value: number) {
  return `${value}°C`;
}

const Sidebar: React.FC<Properties> = ({setHotels, memHotels, hotelsRoomsSets, setFilteredHotelRoomSets}) => {

  const [starList, setStarList] = useState<boolean>(false);
  const [roomList, setRoomList] = useState<boolean>(false);
  const [ adultsKids, setAdultsKids ] = useState<{ adults?: number, kids?: number}>({adults: 0, kids: 0})
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

  useEffect(()=>{
    if(adultsKids){
      let fhrs = hotelsRoomsSets.map((roomSet)=>{
        return roomSet.filter((room)=>{
          return room.occupancy.maxChildren>= adultsKids.kids! && room.occupancy.maxAdults>= adultsKids.adults!
        })
      })
      // console.log(fhrs)
      setFilteredHotelRoomSets(fhrs)
    }
  }, [adultsKids])

  

//sx={{display: 'flex', direction: {xs:'column', md:'row'}, alignItems:"flex-start"}}
  return (
    // <ThemeProvider theme={theme}>
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