import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../Styles/pages/EditUserProfile.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../Context/AuthContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  ADD_USER_ADDRESS,
  CHANGE_USER_CURRENT_ADDRESS,
  DELETE_SAVED_ADDRESS,
  EDIT_ADDRESS,
  GET_SHIPROCKET_COUNTRY,
  GET_SHIPROCKET_STATE,
  GET_USER_ADDRESS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  UPLOAD_PROFILE_PIC,
} from "../Context/Types";
import { uploadFile3 } from "../firebase/fileUpload";
import CircularLoading from "../ui/CircularLoading/CircularLoading";
import CustomModal from "../ui/CustomModal/CustomModal";
import noProf from '../Assets/Images/noprof.png';
import EditIcon from '@mui/icons-material/Edit';

const VEditProfile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const { dispatch} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [profileData, setProfileData] = useState();
  const [allCountries, setAllCountries] = useState([]);
  const [allLocalities, setAllLocalities] = useState([]);
  const [file, setFile] = React.useState();
  const [image, setImage] = React.useState("");

  const [imgUrl, setImgUrl] = useState("");

  const [usersAddress, setUsersAddress] = useState([]);

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isCurrent: false,
  });
  const [editedAddress, setEditedAddress] = useState({
    id: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    isCurrent: false,
  })


  const [isEditAddress, setIsEditAddress] = useState(false);
  const [updatePf, setUpdatePf] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const onImageChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }

    uploadFile3(event, setImgUrl);
  };

  const handleUpload = () => {
    dispatch({
      type: UPLOAD_PROFILE_PIC,
      data: { profile_pic: imgUrl },
    });
  };

  useEffect(() => {
    window.scroll(0,0);
    if (imgUrl?.length > 0) {
      handleUpload();
    }
  }, [imgUrl]);

  const getProfileData = () => {
    dispatch({
      type: GET_USER_PROFILE,
      upDateState: setProfileData,
      setImage,
      setUpdatePf,
      setIsLoading,
    });
  };

  const getAddress = () => {
    dispatch({
      type: GET_USER_ADDRESS,
      setUserAddress: setUsersAddress,
      setIsLoading: setIsLoading2,
    });
  };

  //the shiprocket api is send through cors fix kylo url,
  //where localhost:3000 is not allowed but the shiprocket APi I am using doeesn't need it
  const getShiprocketCountries = () => {
    dispatch({
      type: GET_SHIPROCKET_COUNTRY,
      setAllCountries
    })
  };

  const getShiprocketLocalities = async (e) => {
    const value = JSON.parse(e.target.value);
    setAddress((prev) => {
      return { ...prev, country: value.name };
    });
    setEditedAddress((prev) => {
      return {...prev, country: value.name}
    })
    dispatch({
      type: GET_SHIPROCKET_STATE,
      id: value?.id,
      setAllLocalities
    })
  };

  const stateHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, state: e.target.value };
    });
    setEditedAddress((prev) => {
      return {...prev, state: e.target.value}
    })
  };

  const addNewAddressHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const profileDetailHandler = (e) => {
    setUpdatePf((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const saveAddress = () => {
    dispatch({
      type: ADD_USER_ADDRESS,
      address,
      setIsLoading2: setIsLoading3,
      handleClose,
      setUsersAddress,
    });
  };

  const changeCurrentAddress = (id) => {
    dispatch({
      type: CHANGE_USER_CURRENT_ADDRESS,
      id,
      setUsersAddress,
    });
  };

  const deleteSavedAddress = (id) => {
    dispatch({
      type: DELETE_SAVED_ADDRESS,
      id,
      setUsersAddress,
      usersAddress,
    });
  };

  const updateProfile = () => {
    const data = {
      ...updatePf,
    };
    dispatch({
      type: UPDATE_USER_PROFILE,
      data,
      setIsLoading2,
    });
  };

  const editAddressHandler = (e) => {
    setEditedAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const updateAddressHandler = (e) => {
    setUsersAddress([...usersAddress?.filter((item) => item?._id !== editedAddress?.id), editedAddress]);
    e.preventDefault();
    dispatch({
      type: EDIT_ADDRESS,
      address: editedAddress,
      handleClose: handleClose2,
      setIsLoading: setIsLoading4
    });
  }

  const editModalHandler = (item) => {
    setEditedAddress({
      line1: item?.line1,
      line2: item?.line2,
      city: item?.city,
      state: item?.state,
      pincode: item?.pincode,
      country: item?.country,
      isCurrent: item?.isCurrent,
      id: item?._id
    });
    handleOpen2();
  }


  useEffect(() => {
    getProfileData();
    getAddress();
    getShiprocketCountries();
  }, []);

  return (
    <div style={{ padding: "0 30px" }}>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularLoading color="orange" />
        </div>
      ) : (
        <>
          <div className="edit-top">
            <div className="profileImgContainer">
              <img
                style={{ width: "100%", height: "100%", border: "none" }}
                src={image?.length > 0 || image ? image : noProf}
                alt=""
              />
            </div>
            <div className="profileInputCont">
              <label htmlFor="pro">
                <AddAPhotoIcon className="profileiconsel" />
              </label>
              <input
                onChange={onImageChange}
                style={{ border: "none" }}
                type="file"
                name="profilePic"
                id="pro"
              />
            </div>
          </div>

          <div className="d-flex align-form" style={{ display: "flex" }}>
            <div className="align-inputs">
              <div style={{ display: "flex", flexDirection: "column", marginBottom: '25px' }}>
                <label style={{color: "#808080"}} htmlFor="vname">Name</label>
                <input
                  onChange={profileDetailHandler}
                  type="text"
                  id="vname"
                  name="name"
                  defaultValue={profileData?.name}
                  placeholder={profileData?.name}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginBottom: '25px' }}>
                <label style={{color: "#808080"}} htmlFor="mobile">Mobile</label>
                <input
                  onChange={profileDetailHandler}
                  type="text"
                  id="mobile"
                  name="mobile"
                  defaultValue={profileData?.mobile}
                  placeholder={profileData?.mobile}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{color: "#808080"}} htmlFor="email">Email</label>
                <input
                  onChange={profileDetailHandler}
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={profileData?.email}
                  placeholder={profileData?.email}
                />
              </div>

              <div
                className="editButtonProfile"
                style={{ margin: "40px 0", display: "flex" }}
              >
                <Button
                  onClick={updateProfile}
                  variant="contained"
                  style={{ backgroundColor: "#FF8D22" }}
                >
                  {isLoading2 ? (
                    <CircularLoading color="white" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </div>

            <div className="align-inputs">
              <div>
                <h5 style={{ textAlign: "center" }}>Current Address</h5>

                {usersAddress?.map(
                  (item, index) =>
                    item?.isCurrent && (
                      <div
                        className="addressContainer"
                        key={index}
                        style={{
                          border: "1px solid #FF8D22",
                          borderRadius: "8px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <p>{item?.line1}</p>
                          <p>{item?.line2}</p>
                          <p>{`${item?.city} - ${item?.pincode}`}</p>
                          <p>{`${item?.state}, ${item?.country}`}</p>
                        </div>
                        <div
                          style={{
                            width: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: "#FF8D22",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <EditIcon onClick={()=>editModalHandler(item)} style={{color:'gray', marginRight: '10px', cursor:'pointer'}}/>
                        </div>
                      </div>
                    )
                )}

                <div
                  style={{
                    display: "flex",
                    marginTop: "40px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <h5 style={{ textAlign: "center" }}>Saved Address</h5>
                  <div>
                    <Button
                      onClick={handleOpen}
                      variant="contained"
                      style={{ backgroundColor: "#FF8D22", width: "100%" }}
                    >
                      Add New Address
                    </Button>
                  </div>
                </div>
                {usersAddress?.map(
                  (item, index) =>
                    !item?.isCurrent && (
                      <div
                      key={index}
                        className="addressContainer"
                        style={{
                          border: "1px solid #FF8D22",
                          borderRadius: "8px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <p>{item?.line1}</p>
                          <p>{item?.line2}</p>
                          <p>{`${item?.city} - ${item?.pincode}`}</p>
                          <p>{`${item?.state}, ${item?.country}`}</p>
                        </div>
                        <div
                          style={{
                            // width: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            onClick={() => changeCurrentAddress(item?._id)}
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "4px solid #FF8D22",
                              borderRadius: "50%",
                              cursor: "pointer",
                              marginLeft: 'auto'
                            }}
                          ></div>
                          <div style={{display: 'flex', alignItems:'center'}}>
                          <EditIcon onClick={()=>editModalHandler(item)} style={{color:'gray', marginRight: '10px', cursor:'pointer'}} />
                          <span
                            onClick={() => deleteSavedAddress(item?._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <DeleteIcon style={{ color: "gray" }} />
                          </span>
                          </div>
                        </div>
                      </div>
                    )
                )}
                <CustomModal open={open} handleClose={handleClose}>
                <h5 style={{ textAlign: "center" }}>Add New Address</h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="address">Address Line 1</label>
                      <input
                        onChange={addNewAddressHandler}
                        type="text"
                        name="line1"
                        id="address"
                        style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="address_2">Address Line 2</label>
                      <input
                        onChange={addNewAddressHandler}
                        type="text"
                        name="line2"
                        id="address_2"
                        style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="city">City</label>
                      <input
                        onChange={addNewAddressHandler}
                        type="text"
                        name="city"
                        id="city"
                        style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="country">Country</label>
                      <select
                        onChange={getShiprocketLocalities}
                        className="selector"
                        name="country"
                        id="country"
                        style={{padding: '0 10px'}}
                      >
                        {allCountries?.map((country) => (
                          <option
                            value={JSON.stringify({
                              id: country.id,
                              name: country?.name,
                            })}
                            key={country?.id}
                          >
                            {country?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="state">State</label>

                      <select
                        onChange={stateHandler}
                        className="selector"
                        name="state"
                        id="state"
                        style={{padding: '0 10px'}}
                      >
                        {allLocalities?.map((localities, index) => (
                          <option value={localities?.name} key={index}>
                            {localities?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="zip_code">Zip Code</label>
                      <input
                        onChange={addNewAddressHandler}
                        type="text"
                        name="pincode"
                        id="zip_code"
                        style={{padding: '0 10px'}}
                      />
                    </div>

                    <div>
                      <Button
                        onClick={saveAddress}
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#FF8D22",
                        }}
                        variant="contained"
                      >
                        {isLoading3 ? <CircularLoading color="white" /> : "Save"}
                      </Button>
                      <Button
                        onClick={handleClose}
                        style={{
                          marginRight: "10px",
                          color: "#FF8D22",
                          borderColor: "#FF8D22",
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </div>
                </CustomModal>
                <CustomModal open={open2} handleClose={handleClose2}>
                <h5 style={{ textAlign: "center" }}>Edit Address</h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="address">Address Line 1</label>
                      <input
                        onChange={editAddressHandler}
                        type="text"
                        name="line1"
                        id="address"
                        defaultValue={editedAddress?.line1}
                        style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="address_2">Address Line 2</label>
                      <input
                        onChange={editAddressHandler}
                        type="text"
                        name="line2"
                        id="address_2"
                        defaultValue={editedAddress?.line2}
                              style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="city">City</label>
                      <input
                        onChange={editAddressHandler}
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={editedAddress?.city}
                              style={{padding: '0 10px'}}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="country">Country</label>
                      <select
                        onChange={getShiprocketLocalities}
                        className="selector"
                        name="country"
                        id="country"
                        defaultValue={editedAddress?.country}
                              style={{padding: '0 10px'}}
                      >
                      <option value={editedAddress?.country}>{editedAddress?.country}</option>
                        {allCountries?.map((country) => (
                          <option
                            value={JSON.stringify({
                              id: country.id,
                              name: country?.name,
                            })}
                            key={country?.id}
                          >
                            {country?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="state">State</label>

                      <select
                        onChange={stateHandler}
                        className="selector"
                        name="state"
                        id="state"
                        defaultValue={editedAddress?.state}
                      >
                      <option value={editedAddress?.state}>{editedAddress?.state}</option>
                        {allLocalities?.map((localities, index) => (
                          <option value={localities?.name} key={index}>
                            {localities?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{color: "#808080"}} htmlFor="zip_code">Zip Code</label>
                      <input
                        onChange={editAddressHandler}
                        type="text"
                        name="pincode"
                        id="zip_code"
                        defaultValue={editedAddress?.pincode}
                              style={{padding: '0 10px'}}
                      />
                    </div>

                    <div>
                      <Button
                        onClick={updateAddressHandler}
                        style={{
                          marginRight: "10px",
                          backgroundColor: "#FF8D22",
                        }}
                        variant="contained"
                      >
                        {isLoading4 ? <CircularLoading color="white" /> : "Update"}
                      </Button>
                      <Button
                        onClick={handleClose2}
                        style={{
                          marginRight: "10px",
                          color: "#FF8D22",
                          borderColor: "#FF8D22",
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </div>
                </CustomModal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VEditProfile;
