"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "@/components/ui/button";

async function getUsers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`);
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default function Users() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setProfiles(result);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Users List</h2>
      <ScrollArea className="h-96 w-[420px] rounded-lg border shadow-md bg-white">
        <div className="p-4">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.companyProfile}
                    alt={profile.companyName}
                    className="w-12 h-12 rounded-full border"
                  />
                  <Link
                    href={`/users/${profile.id}`}
                    className="text-blue-500 hover:underline hover:text-blue-600 font-medium"
                  >
                    {profile.companyName}
                  </Link>
                </div>
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md shadow">
                  <Link href={`/users/${profile.id}`}>Profile</Link>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">Loading users...</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
