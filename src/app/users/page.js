"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea} from "../../components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";

async function getUsers(){
    try {
        let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`);
        result = await result.json();
        console.log(result)
        return result;
    } catch (error) {
       
        return []
    }
}


export default function Users() {
    const [profiles,setProfiles]=useState([]);
    useEffect(()=>{
        const fetchUsers = async()=>{
            let result = await getUsers();
            setProfiles(result)
        }
        fetchUsers()
    },[])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:'center',marginTop:"40px"}} className="">
        {/* <span>users list</span> */}


    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <span className="mb-4 text-sm font-medium leading-none">users</span>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <div  className="text-sm">
            <Link href={`/users/${profile.id}`}>{profile.companyName}</Link>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  



        {/* <div >
            {users.map((user)=>{
                return <div key={user._id}>
                  
                    </div>
            })}
        </div> */}
    </div>
  )
  
}


