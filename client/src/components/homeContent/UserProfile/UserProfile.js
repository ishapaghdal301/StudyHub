import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UserProfile() {

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        github_id: "",
        linkedin_id: "",
        bio: "",
        website: "",
      });
      useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("user");
            console.log(userId);
            try {
                const response = await fetch("/user/find/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
    
                const data = await response.json();
    
                console.log("Data received from API:", data);
    
                setUserData({
                    first_name: data.user.first_name || "",
                    last_name: data.user.last_name || "",
                    email: data.user.email || "",
                    github_id: data.user.githubId || "",
                    linkedin_id: data.user.linkedinId || "",
                    bio: data.user.bio || "",
                    website: data.user.website || "",
                });
                
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserData();
    }, []);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = localStorage.getItem("user");
        const { first_name, last_name, email, github_id, linkedin_id, bio, website } = userData;
        try {
          const response = await fetch("/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ first_name, last_name, email, github_id, linkedin_id, bio, website, _id }),
          });
      
          if (response.ok) {
            // Display a success toast
            toast.success("Profile updated successfully!");
          } else {
            console.log("error in updating");
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      };
      
    return (
        <div className="user-profile">
            <h1>My Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="left">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={userData.bio}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="form-group">
                            <label htmlFor="github_id">GitHub Profile:</label>
                            <input
                                type="text"
                                id="github_id"
                                name="github_id"
                                value={userData.github_id}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="linkedin_id">LinkedIn Profile:</label>
                            <input
                                type="text"
                                id="linkedin_id"
                                name="linkedin_id"
                                value={userData.linkedin_id}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Website:</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={userData.website}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <button type="submit">Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;
