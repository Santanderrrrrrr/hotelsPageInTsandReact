import React, { useState, useEffect } from 'react'
import { Box, Stack, Divider } from '@mui/material'
import { getHotels, getHotelRooms} from './dataSource/axiosData'


import Map from './components/Map'
import Sidebar from './components/Sidebar'
import ProductDisplay from './components/ProductDisplay'

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

type hotel= {
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
export interface ForHotel{
  hotels: hotel[]
  adultsKids: { adults?: number, kids?: number}
}



function App() {

const [ mahoteli, setMahoteli ] = useState<ForHotel["hotels"]>([])
const [ memHoteli, setMemHoteli ] = useState<ForHotel["hotels"]>([])


const [hotelsRoomSets, setHotelsRoomSets ] = useState<actHotel[]>([])
const [filteredHotelRoomSets, setFilteredHotelRoomSets] = useState<actHotel[]>([])
  

  const getDaHotelRooms = async (hotels: hotel[])=>{
    const dataArray: actHotel[] = []
    for(const hotel of hotels){
        await getHotelRooms(hotel.id)
        .then((hotelDeets)=>{dataArray.push(hotelDeets!)})
        .catch((error: Error)=>{if (error instanceof Error )console.log(error.message? error.message : error)})
    }
    // console.log(dataArray)
    setHotelsRoomSets(dataArray)
    setFilteredHotelRoomSets(dataArray)
  }
  
  const dataAfterAwait = async()=>{
    const hotelData = await getHotels()
    setMahoteli(hotelData!)
    setMemHoteli(hotelData!)
    // console.log("this is mahoteli")
  }

  useEffect(() => {
    dataAfterAwait()
    
  },[])

  useEffect(()=>{
    getDaHotelRooms(mahoteli)
  },[mahoteli])
  // console.log(mahoteli)

  

  return (
    <Box >
      <Stack direction="column">
        <Box  sx={{height:'30%', width:'100%', backgroundColor:'skyblue'}}>
            <Map mahoteli={mahoteli}/>
        </Box>
        
        <Stack display="flex" direction={{xs:'column', md:'row'}} justifyContent="flex-start" alignItems={{xs:"flex-start", md:"flex-start"}} mb={0} pb={0}>       
          <Box  >
            <Sidebar 
              setHotels={setMahoteli} 
               
              memHotels={memHoteli}
              hotelsRoomsSets={hotelsRoomSets}
              setFilteredHotelRoomSets={setFilteredHotelRoomSets}/>
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
