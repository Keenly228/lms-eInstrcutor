import React, {useContext, useEffect, useState} from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import {ProfileContext} from "../plugin/Context.js";
import useAxios from "../../utils/useAxios.js";
import UserData from "../plugin/UserData.js";
import Toast from "../plugin/Toast.js";

function Profile() {
  const [profile, setProfile] = useContext(ProfileContext);
  const [profileData, setProfileData] = useState({
    image: "",
    full_name: "",
    about: "",
    country: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const fetchProfile = () => {
    useAxios()
      .get(`user/profile/${UserData()?.user_id}/`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
        setProfileData(res.data);
        setImagePreview(res.data.image);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfileData({
      ...profileData,
      [event.target.name]: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await useAxios().get(`user/profile/${UserData()?.user_id}/`);
    const formdata = new FormData();
    if (profileData.image && profileData.image !== res.data.image) {
      formdata.append("image", profileData.image);
    }

    formdata.append("full_name", profileData.full_name);
    formdata.append("about", profileData.about);
    formdata.append("country", profileData.country);

    await useAxios()
      .patch(`user/profile/${UserData()?.user_id}/`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      });
  };

  console.log(imagePreview);

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Деталі профілю</h3>
                  <p className="mb-0">
                    Ви маєте повний контроль над налаштуваннями свого облікового запису.
                  </p>
                </div>
                {/* Card body */}
                <form className="card-body" onSubmit={handleFormSubmit}>
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={imagePreview}
                        id="img-uploaded"
                        className="avatar-xl rounded-circle"
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Ваш аватар</h4>
                        <p className="mb-0">
                          PNG або JPG не більше 800 пікселів у ширину та висоту.
                        </p>
                        <input
                          type="file"
                          className="form-control mt-3"
                          name="image"
                          onChange={handleFileChange}
                          id=""
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0">Особисті дані</h4>
                    <p className="mb-4">
                      Відредагуйте свою особисту інформацію та адресу.
                    </p>
                    {/* Form */}
                    <div className="row gx-3">
                      {/* First name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Повне ім'я
                        </label>
                        <input
                          type="text"
                          id="fname"
                          className="form-control"
                          placeholder="First Name"
                          required=""
                          value={profileData.full_name}
                          onChange={handleProfileChange}
                          name="full_name"
                        />
                        <div className="invalid-feedback">
                          Please enter first name.
                        </div>
                      </div>
                      {/* Last name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="lname">
                          Про себе
                        </label>
                        <textarea
                          onChange={handleProfileChange}
                          name="about"
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          value={profileData.about}
                        ></textarea>
                        <div className="invalid-feedback">
                          Please enter last name.
                        </div>
                      </div>

                      {/* Country */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="editCountry">
                          Країна
                        </label>
                        <input
                          type="text"
                          id="country"
                          className="form-control"
                          placeholder="Country"
                          required=""
                          value={profileData.country}
                          onChange={handleProfileChange}
                          name="country"
                        />
                        <div className="invalid-feedback">
                          Please choose country.
                        </div>
                      </div>
                      <div className="col-12">
                        {/* Button */}
                        <button className="btn btn-primary" type="submit">
                          Update Profile <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Profile