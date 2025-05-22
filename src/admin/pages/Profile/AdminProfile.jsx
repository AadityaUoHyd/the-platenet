import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../../context/StoreContext";
import { getUserProfile, uploadProfileImage } from "../../../service/userService";
import { assets } from "../../../assets/assets";
import "./AdminProfile.css";

const AdminProfile = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobileNumber: "",
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

    try {
      if (imageFile) {
        const imageUrl = await uploadProfileImage(imageFile, token);
        setProfile((prev) => ({ ...prev, profileImageUrl: imageUrl }));
        setImageFile(null);
        setPreviewUrl(null);
        toast.success("Profile image updated successfully.");
      } else {
        toast.info("No changes to save.");
      }
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
                      onClick={() => navigate("/admin/orders")}
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

export default AdminProfile;