"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create a Query Client
const queryClient = new QueryClient();

// ✅ API function
async function fetchUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}


export default function Users() {

  const { data: profiles = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Users List</h2>

   
      <ScrollArea className="h-[500px] w-[95%] sm:w-[85%] md:w-[600px] lg:w-[700px] xl:w-[850px] rounded-lg border shadow-md bg-white">
        <div className="p-4">
          {isLoading ? (
            <p className="text-gray-500 text-sm text-center">Loading users...</p>
          ) : error ? (
            <p className="text-red-500 text-sm text-center">Error loading users.</p>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between gap-3 py-3 border-b last:border-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* ✅ Adjusted image size for responsiveness */}
                  <img
                    src={profile.companyProfile}
                    alt={profile.companyName}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border"
                  />
                  <Link
                    href={`/users/${profile.id}`}
                    className="text-sm sm:text-base text-blue-600 font-medium hover:underline truncate max-w-[150px] sm:max-w-none"
                  >
                    {profile.companyName}
                  </Link>
                </div>
  
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-md shadow">
                  <Link href={`/users/${profile.id}`}>Profile</Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}


// export default function UsersPage() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Users />
//     </QueryClientProvider>
//   );
// }
