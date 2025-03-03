"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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

// ✅ Fetch profile data
async function fetchProfile(userId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${userId}`
  );
  if (!response.ok) throw new Error("User not found");
  return response.json();
}

export default function Profile({ params }) {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  // ✅ Handle params being a promise
  useEffect(() => {
    Promise.resolve(params)
      .then((resolvedParams) => {
        if (resolvedParams?.user) {
          setUserId(resolvedParams.user);
        } else {
          router.push("/users");
        }
      })
      .catch(() => router.push("/users"));
  }, [params, router]);

  // ✅ Fetch profile using TanStack Query
  const { data: profileData, isLoading, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId, // Prevents query from running without userId
    retry: false, 
  });

  // ✅ Redirect on error
  useEffect(() => {
    if (error) router.push("/users");
  }, [error, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-[380px] bg-white shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-5 text-center">
          <div className="image-box mx-auto">
            {isLoading ? (
              <Loader2 className="h-20 w-20 animate-spin text-white" />
            ) : (
              <img
                className="profile-image rounded-full border-4 border-white"
                src={profileData?.companyProfile}
                alt={profileData?.name || "Company"}
              />
            )}
          </div>
          {!isLoading && profileData && (
            <>
              <CardTitle className="mt-3 text-lg font-semibold">
                {profileData.name || "Name Not Available"}
              </CardTitle>
              <CardDescription className="text-white text-sm">
                {profileData.jobTitle || "Job Title Not Available"}
              </CardDescription>
            </>
          )}
        </CardHeader>

        {!isLoading && profileData && (
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
              <Button
                onClick={() => console.log("Contact button clicked")}
                className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform duration-200"
              >
                Contact
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
