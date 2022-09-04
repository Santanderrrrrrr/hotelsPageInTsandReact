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


const [filteredHotelRoomSets, setFilteredHotelRoomSets] = useState<actHotel[]>([])

const [ adultsKids, setAdultsKids ] = useState<{ adults?: number, kids?: number}>({adults: 0, kids: 0})

  // const pusher = (array: actHotel, arrToPushTo: actHotel[])=>{
  //   arrToPushTo.push(array)
  // }

  const getDaHotelRooms = async (hotels: hotel[])=>{
    let dataArray: actHotel[] = []
    for(let hotel of hotels){
      let hotelDeets = await getHotelRooms(hotel.id)
      hotelDeets = hotelDeets!.filter((room)=>{
        return room.occupancy.maxChildren>= adultsKids.kids! && room.occupancy.maxAdults>= adultsKids.adults!
      })
      dataArray.push(hotelDeets!) 
    }
    
    // console.log('api call fired')
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
  },[mahoteli, adultsKids])
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
              hotels={mahoteli} 
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
