import React, {useEffect, useMemo, useRef, useCallback} from 'react'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'



interface ForMapB{
  mahoteli:{
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

  }[] | undefined
}
interface Location{
  lat: number,
  lng: number
} 

type LatLngLiteral = google.maps.LatLngLiteral;


const containerStyle = {
  width: '100%',
  height: '35vh'
}

let location: Location

async function locationSetter(): Promise<void> {
  if (navigator.geolocation) {
    try{  
      await navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // console.log(result.state);
            navigator.geolocation.getCurrentPosition((position)=> {          
              
              let coordinates = {lat: position.coords.latitude, lng: position.coords.longitude}
                location = coordinates
                // console.log(location)
              })
            }else if (result.state === "denied") {
              location={ lat: 0, lng: 0}
              // console.log(location)
            }
          });
    }catch(error){
    if (error instanceof Error) console.log(error.message? error.message : error + "this is the error")
  }
  }
}




const Map: React.FC<ForMapB> =  ({mahoteli}) => {

  const mapRef = useRef()

  useEffect(() => {
    locationSetter()
    
  }, [])

  const options = useMemo(() => ({
    disableDefaultUi: true,
    mapId: process.env.REACT_APP_MAP_ID,
    clickableIcons: false
  }), [])

  const onLoad =useCallback((map: any) => {mapRef.current = map}, [])
  
  let validCoords = mahoteli!.filter((hoteli)=>{
    return typeof(hoteli.location.geoLocation.latitude) === "number" && typeof(hoteli.location.geoLocation.longitude) === "number"
    })
    
  const markers = validCoords!.map((hoteli, index)=>{
    let position: LatLngLiteral = {lat: hoteli.location.geoLocation.latitude, lng: hoteli.location.geoLocation.longitude}
    // console.log("facts")
    // let icon = hoteli.imgs[0].url
    return (<>
      <div key={index}>
        <Marker key={index} position={position}/>
      </div>
    </>)
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  })

  if(!isLoaded){
    return(
      <div>Loading...</div>
    )
  }else{
    return (
      <GoogleMap 
        zoom={5} 
        center={location} 
        mapContainerStyle={containerStyle} 
        options={options}
        onLoad={onLoad}
        >
          {React.Children.toArray(markers)}
          {/* <Marker /> */}
          
      </GoogleMap>
    )
  }
    
}

export default Map