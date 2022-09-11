import React, { useState, useEffect } from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { getHotels, getHotelRooms} from './dataSource/axiosData'


import Map from './components/Map'
import Slide from './components/Slide'
import Sidebar from './components/Sidebar'
import ProductDisplay from './components/ProductDisplay'

import * as theTypes from './componentTypes/allTheTypes.types'



function App() {

const [ mahoteli, setMahoteli ] = useState<theTypes.ForHotel["hotels"]>([])
const [ memHoteli, setMemHoteli ] = useState<theTypes.ForHotel["hotels"]>([])
const [filteredHotelRoomSets, setFilteredHotelRoomSets] = useState<theTypes.actHotel[]>([])
const [ adultsKids, setAdultsKids ] = useState<{ adults?: number, kids?: number}>({adults: 0, kids: 0})

  

  const getDaHotelRooms = async (hotels: theTypes.hotel[])=>{
    let dataArray: theTypes.actHotel[] = []
    for(let hotel of hotels){
      let hotelDeets = await getHotelRooms(hotel.id)
      hotelDeets = await hotelDeets!.filter((room)=>{
        return room.occupancy.maxChildren>= adultsKids.kids! && room.occupancy.maxAdults>= adultsKids.adults!
      })
      dataArray.push(hotelDeets!) 
    }
    
    // console.log('api call fired')
    setFilteredHotelRoomSets(dataArray)
  }
  
  const dataAfterAwait = async()=>{
    const hotelData = await getHotels()
    await setMahoteli(hotelData!)
    await setMemHoteli(hotelData!)
    // console.log("this is mahoteli")
  }

  useEffect(() => {
    dataAfterAwait()
    
  },[])

  useEffect(()=>{
    getDaHotelRooms(mahoteli)
  },[mahoteli, adultsKids])
  // console.log(mahoteli)

  

  return (
    <Box >
      <Stack direction="column" >
        <Box  sx={{height:'30vh', width:'100vw', backgroundColor:'skyblue'}}>
            {/* <Map mahoteli={mahoteli}/> */}
            <Slide mahoteli={mahoteli}/>
        </Box>
        
        <Stack display="flex" direction={{xs:'column', md:'row'}} justifyContent="flex-start" alignItems={{xs:"flex-start", md:"flex-start"}} mb={0} pb={0}>       
          <Box  >
            <Sidebar 
              data-testid="sidebar"
              setHotels={setMahoteli} 
               
              memHotels={memHoteli}
              setAdultsKids={setAdultsKids}
              adultsKids={adultsKids}
              />
              
          </Box>
          <Divider sx={{display:{sx:'none', md:'flex'}}} orientation="vertical" flexItem />
          <Box sx={{width: '100%', display:{md:"flex"}}}>
            <ProductDisplay hotels={mahoteli} filteredHotelRoomSets={filteredHotelRoomSets}/>
          </Box>
        </Stack>
      </Stack>
      
    </Box>
  );
}

export default App;
