"use client"

import React, { useState, useEffect } from "react";
import { AwardIcon, Loader2 } from "lucide-react";
import "./profile.css";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { redirect } from "next/navigation";

export default function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let params = await props.params; 
      if (!params.user) {
        redirect("/users");
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${params.user}`);
        const data = await response.json();
        if (data === "Not found") {
          redirect("/users");
          return;
        }
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        redirect("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleContact = () => {
    console.log("Contact button clicked");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-[380px] bg-white shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 text-center">
          <div className="image-box mx-auto">
            {loading ? (
              <Loader2 className="h-20 w-20 animate-spin text-white" />
            ) : (
              <img
                className="profile-image rounded-full border-4 border-white"
                src={profileData?.companyProfile}
                alt={profileData?.name}
              />
            )}
          </div>
          {!loading && (
            <>
              <CardTitle className="mt-3 text-lg font-semibold">{profileData?.name || "Name Not Available"}</CardTitle>
              <CardDescription className="text-white text-sm">
                {profileData?.jobTitle || "Job Title Not Available"}
              </CardDescription>
            </>
          )}
        </CardHeader>
        {!loading && profileData && (
          <>
            <CardContent className="p-4">
              <div className="bio-box py-2">
                <strong className="text-gray-700">Company:</strong> {profileData.companyName || "N/A"}
              </div>
              <div className="bio-box py-2">
                <strong className="text-gray-700">Description:</strong> {profileData.description || "N/A"}
              </div>
              <div className="bio-box py-2">
                <strong className="text-gray-700">Location:</strong> {profileData.location || "N/A"}
              </div>
              <div className="bio-box py-2">
                <strong className="text-gray-700">Type:</strong> {profileData.type || "N/A"}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-end">
              <Button onClick={handleContact} className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform duration-200">
                Contact
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}