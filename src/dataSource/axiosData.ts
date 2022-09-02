import axios from 'axios';

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

interface Properties{
  hotels:hotel[]
}

const linki: string = `https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`
const linkiForRoom: string = `https://obmng.dbm.guestline.net/api/roomRates/OBMNG`

export const getHotels = async(): Promise<Properties['hotels'] | undefined> => {
    try{
        let {data} = await axios.get(`${linki}`)
        // console.log(data)

        let theDataArray: Properties['hotels'] = [];

        for (let tidbit of data){
            theDataArray.push(
                {
                    id: tidbit.id,
                    name: tidbit.name,
                    imgs: tidbit.images,
                    contacts:{
                      email: tidbit.email,
                      telephone: tidbit.telephone
                    },
                    location:{
                      geoLocation:{
                        latitude: tidbit.position["latitude"],
                        longitude: tidbit.position["longitude"],
                        timezone: tidbit.position["timezone"]
                      },
                      country: tidbit.country,
                      town: tidbit.town,
                      countryCode: tidbit.countryCode,
                      postCode: tidbit.postCode,
                      addresses: [tidbit.address1, tidbit.address2]
                    },
                    rating: tidbit.starRating,
                    description: tidbit.description
                });
        }
        return theDataArray
    }catch(err){
        if(err instanceof Error) console.log(err.message? err.message : err + "This is the error")
        
    }
}

export const getHotelRooms = async(hotelId: string): Promise<room[] | undefined> =>{
  try{ 
    let {data} = await axios.get(`${linkiForRoom}/${hotelId}`)
    // console.log(data)
    let rooms = data.rooms
    rooms = rooms.map((daroom: any)=>{
      let neededRoomData = {
        id: daroom.id,
        name: daroom.name,
        bedConfiguration: daroom.bedConfiguration,
        longDescription: daroom.longDescription,
        occupancy:daroom.occupancy,
        disabledAccess: daroom.disabledAccess,
        facilities:daroom.facilities,
        images: daroom.images
      }
      return neededRoomData
    })
    return rooms
  }catch(err){
    if(err instanceof Error) console.log(err.message? err.message : err + "This is the error")
  }
}