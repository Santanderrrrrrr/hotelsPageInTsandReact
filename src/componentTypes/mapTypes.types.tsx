export interface ForMapB{
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
export interface Location{
lat: number,
lng: number
} 
  
export type LatLngLiteral = google.maps.LatLngLiteral;