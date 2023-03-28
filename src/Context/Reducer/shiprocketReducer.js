import { getShiprocketCityReq, getShiprocketCountriesReq, getShiprocketStateReq } from "../API";


export const getShiprocketCountry = async(setAllCountries) => {
    try {
        const res = await getShiprocketCountriesReq();
        if(res?.data?.status === 200) {
            setAllCountries(res?.data?.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getShiprocketState = async(id, setAllLocalities) => {
    try {
        const res = await getShiprocketStateReq(id);
        if(res?.data?.status === 200) {
            setAllLocalities(res?.data?.data)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getShiprocketCity = async(userPincode, cartItem, setTaxAndCharges, usersAddress) => {

    try {
        const res = await getShiprocketCityReq(userPincode);
        const currAdd = usersAddress?.filter((user) => user?.isCurrent === true);
        if(res?.data?.postcode_details?.postcode === userPincode) {
            setTaxAndCharges((prev)=>({
                ...prev,
                charge: Number(cartItem[0]?.productId?.localcharge)
            }))
            return;
        } 
        if(res?.data?.postcode_details?.postcode !== userPincode) {
            setTaxAndCharges((prev)=>({
                ...prev,
                charge: Number(cartItem[0]?.productId?.statecharge)
            }))
            return;
        }
    } catch (error) {
        console.log(error)
    }
}