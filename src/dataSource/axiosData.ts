import axios from 'axios';
import * as theTypes from '../componentTypes/allTheTypes.types'


const linki: string = `https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`
const linkiForRoom: string = `https://obmng.dbm.guestline.net/api/roomRates/OBMNG`

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

export const getHotels = async(): Promise<theTypes.Properties['hotels'] | undefined> => {
    try{
        let {data} = await axios.get(`${linki}`)
        // console.log(data)

        let theDataArray: theTypes.Properties['hotels'] = [];

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

export const getHotelRooms = async(hotelId: string): Promise<theTypes.room[] | undefined> =>{
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
    // console.log(JSON.stringify(rooms))
    return rooms
  }catch(err){
    if(err instanceof Error) console.log(err.message? err.message : err + "This is the error")
  }
}