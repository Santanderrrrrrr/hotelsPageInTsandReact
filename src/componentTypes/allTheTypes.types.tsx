export type room = {
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
  
export type actHotel = room[] //X
  
export type hotel= {
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

//for app
export interface ForHotel{
hotels: hotel[]
adultsKids: { adults?: number, kids?: number}
}

//for map
export interface ForMapB{
mahoteli:hotel[] | undefined
}
export interface Location{
    lat: number,
    lng: number
} 
  
export type LatLngLiteral = google.maps.LatLngLiteral;

//for product display 
export interface Properties{
    hotels:hotel[]
    filteredHotelRoomSets: actHotel[]
}

//for Sidebar
export interface SidebarProperties{
    
    memHotels:hotel[]
    setHotels: React.Dispatch<React.SetStateAction<hotel[]>>
    
    setAdultsKids: React.Dispatch<React.SetStateAction<{adults?: number, kids?: number}>>
    adultsKids: {adults?: number, kids?: number}
  }

//for Modal
export interface modalProperties{
    hotel: hotel | undefined
    setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
    openIt: boolean
}

//for list and module hotel display
export interface listDisplayProperties{
    hotels:hotel[]
    setOpenIt: React.Dispatch<React.SetStateAction<boolean>>
    setModalHotel: React.Dispatch<React.SetStateAction<hotel | undefined>>
}

//for Room display
export interface roomProperties{
    hotels:hotel[]
    filteredHotelRoomSets: actHotel[]
  }

//for each room
export interface eachRoomProperties {
    theRightRooms: room[]
    indexNum: number
  }

