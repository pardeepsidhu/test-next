"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea} from "../../components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";

async function getUsers(){
    try {
        let result = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/users`);
        result = await result.json();

        if(result.error){
            alert(result.error)
            return []
        }
        return result.users;
    } catch (error) {
       
        return []
    }
}


export default function Users() {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        const fetchUsers = async()=>{
            let users = await getUsers();
            setUsers(users)
        }
        fetchUsers()
    },[])
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:'center',marginTop:"40px"}} className="">
        {/* <span>users list</span> */}


    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <span className="mb-4 text-sm font-medium leading-none">users</span>
        {users.map((user) => (
          <div key={user._id}>
            <div  className="text-sm">
            <Link href={`/users/${user._id}`}>{user.name}</Link>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  



        <div >
            {users.map((user)=>{
                return <div key={user._id}>
                  
                    </div>
            })}
        </div>
    </div>
  )
  
}


