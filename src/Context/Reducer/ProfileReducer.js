import {
  deleteSavedAddress,
  userProfileRequest,
  getUserAddresss,
  changeCurrentUserAddress,
  addUserAddress,
  updateUserProfilePic,
  updateUserProfile,
  userLogoutRequest,
  getUserNotification,
  editUserAddress,
} from "../API";
import Cookies from "js-cookie";
import { Store } from "react-notifications-component";
import { notification } from "../AuthContext";

export const getUserAddress = async (setUserAddress, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await getUserAddresss();

    setUserAddress(res?.data);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
export const addUserAddressData2 = async (
  data,
  setIsLoading2,
  setUsersAddress,
  setNewadd
) => {
  try {
    setIsLoading2(true);
    const res = await addUserAddress(data);
    setUsersAddress((old) => {
      old.push(data);
      return [...old];
    });
    setIsLoading2(false);
    Store.addNotification({
      ...notification,
      type: "success",
      message: "Address Added",
    });
    setNewadd(false);
  } catch (error) {
    setIsLoading2(false);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: error.response.data,
    });
  }
};
export const deleteSavedAdd = async (id, setUsersAddress, usersAddress) => {
  try {
    const res = await deleteSavedAddress(id);
    if (res?.data?.message === "Deleted Successfully") {
      setUsersAddress(usersAddress?.filter((add) => add?._id !== id));
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Deleted Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "Delete Failed!",
    });
  }
};
export const changeCurrentUserAdd = async (id, setUsersAddress) => {
  try {
    const res = await changeCurrentUserAddress(id);
    setUsersAddress(res?.data?.user?.address);
    Store.addNotification({
      ...notification,
      type: "success",
      message: "Current Address Changed",
    });
  } catch (error) {
    console.log(error);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: "Something went wrong!",
    });
  }
};
export const userProfile2 = async (setProfileData, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await userProfileRequest();
    if (res.data) {
      setProfileData(res.data);
    }
    setIsLoading(false);
  } catch (Err) {
    console.log(Err);
    setIsLoading(false);
  }
};
export const userLogout = async (navigate, setAuth) => {
  try {
    const res = await userLogoutRequest();
    if ((res.data = "User Logged out")) {
      setAuth(false);
      Cookies.remove("auth_token");
      Cookies.remove("ship_token");
      Cookies.remove("role");
      navigate("/login");
    }
  } catch (err) {
    console.log(err);
  }
};
export const getUserNotificationReq = async(setMyNotification) => {
  try {
    const res = await getUserNotification();
    if(res?.status === 200 ) {
      setMyNotification(res?.data?.data)
    }
  } catch (error) {
    console.log(error);
  }
}
export const uploadProfilePic = async (data) => {
  try {
    const res = await updateUserProfilePic(data);
    if (res.data.message === "Updated Successfully") {
      alert("profile_pic_updated");
    }
  } catch (error) {
    console.log(error);
  }
};
export const userProfile = async (upDateState, setImage, setUpdatePf, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await userProfileRequest();
    if (res.data) {
      upDateState(res.data);
      setImage(res.data?.profile_pic);
      setUpdatePf({
        name: res.data.name,
        email: res.data.email,
        mobile: res.data.mobile.toString(),
      });
    }
    setIsLoading(false);
  } catch (Err) {
    console.log(Err);
    setIsLoading(false);
  }
};
export const addUserAddressData = async (
  data,
  setIsLoading2,
  handleClose,
  setUsersAddress
) => {
  try {
    setIsLoading2(true);
    const res = await addUserAddress(data);
    setUsersAddress((old) => {
      old.push(data);
      return [...old];
    });
    handleClose();
    setIsLoading2(false);
    Store.addNotification({
      ...notification,
      type: "success",
      message: "Address Added",
    });
  } catch (error) {
    console.log(error);
    setIsLoading2(false);
    Store.addNotification({
      ...notification,
      type: "danger",
      message: error.response.data,
    });
  }
};
export const updateUserProfiles = async (data, setIsLoading2, setInitialState, initialState) => {
  try {
    setIsLoading2(true);
    const res = await updateUserProfile(data);
    
    if (res.data.message === "Updated Successfully") {
      setInitialState((prev) => {
        return {
          ...prev,
          user: {
            ...initialState?.user,
            adultCheck: true
          }
        }
      })
      Store.addNotification({
        ...notification,
        type: "success",
        message: "Profile Updated",
      });
    }
    setIsLoading2(false);
  } catch (error) {
    console.log(error);
    setIsLoading2(false);
  }
};
export const editAddress = async (address, handleClose, setIsLoading, setIsEditAddress) => {
  try {
    setIsLoading(true);
    const data = {
      line1: address?.line1,
      line2: address?.line2,
      city: address?.city,
      state: address?.state,
      pincode: address?.pincode,
      country: address?.country,
      isCurrent: address?.isCurrent,
    }
    const res = await editUserAddress(address?.id, data);

    if(res?.status === 200) {
        handleClose();
        Store.addNotification({
          ...notification,
          type: "success",
          message: "Address Updated",
        });
        setIsEditAddress(false)
    }else {
      Store.addNotification({
        ...notification,
        type: "danger",
        message: "Something went wrong!",
      });
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};


