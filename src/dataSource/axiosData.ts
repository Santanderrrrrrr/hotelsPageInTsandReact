import axios from 'axios';

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
}

export const getHotels = async(): Promise<Properties['hotels'] | undefined> => {
    try{
        let {data} = await axios.get('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG')

        let theDataArray: Properties['hotels'] = [];

        for (let tidbit of data){
            theDataArray.push(
                {
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