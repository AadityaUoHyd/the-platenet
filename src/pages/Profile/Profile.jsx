import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { getUserProfile, updateUserAddress, uploadProfileImage } from "../../service/userService";
import { assets } from "../../assets/assets";
import "./Profile.css";

const Profile = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    profileImageUrl: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile({
          name: data.name || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
          profileImageUrl: data.profileImageUrl || "",
        });
      } catch (error) {
        toast.error("Failed to load profile.");
        navigate("/auth");
      }
    };
    if (token) {
      fetchProfile();
    } else {
      navigate("/auth");
    }
  }, [token, navigate]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleCancelImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (profile.zip && !/^\d{6}$/.test(profile.zip)) {
      toast.error("Please enter a valid 6-digit zip code.");
      return;
    }

    try {
      // Only update address if at least one address field is provided
      if (profile.name || profile.address || profile.city || profile.state || profile.zip) {
        await updateUserAddress({
          name: profile.name,
          address: profile.address,
          city: profile.city,
          state: profile.state,
          zip: profile.zip,
        }, token);
      }

      if (imageFile) {
        const imageUrl = await uploadProfileImage(imageFile, token);
        setProfile((prev) => ({ ...prev, profileImageUrl: imageUrl }));
        setImageFile(null);
        setPreviewUrl(null);
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="container mt-5 profile-container mb-3">
      <main>
        
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="mb-4 text-center">
                    <div className="profile-image-container">
                      <img
                        src={previewUrl || profile.profileImageUrl || assets.profile}
                        alt="Profile"
                        className="profile-image"
                      />
                      <input
                        type="file"
                        className="form-control mt-3"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {previewUrl && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm mt-2"
                          onClick={handleCancelImage}
                        >
                          Cancel Image
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={profile.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={profile.mobileNumber}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-muted">[Edit By Forgot Password]</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      value="********"
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Jaihind Enclave, Arunodaya Colony, Hitech City"
                      name="address"
                      value={profile.address}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      className="form-select"
                      id="state"
                      name="state"
                      value={profile.state}
                      onChange={onChangeHandler}
                    >
                      <option value="">Choose...</option>
                      <option>Telangana</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      name="city"
                      value={profile.city}
                      onChange={onChangeHandler}
                    >
                      <option value="">Choose...</option>
                      <option>Hyderabad</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder="500034"
                      name="zip"
                      value={profile.zip}
                      maxLength={6}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                          onChangeHandler(e);
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-primary w-50"
                      type="submit"
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn btn-outline-secondary w-50"
                      type="button"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;