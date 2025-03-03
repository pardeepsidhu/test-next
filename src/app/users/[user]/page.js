"use client"
import  React, {useState,useEffect} from "react"
import { Loader2 } from "lucide-react"
import "./profile.css"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { redirect } from "next/navigation"





export default function Profile(props) {
  
  const [loading,setLoading]=useState(true)
  const [profileData,setProfileData]=useState({});

 useEffect(()=>{  
  let getData = async()=>{
    let params = await props.params;
    if(!params.user){
      redirect("/users")
    }
    let user = await getUsers(params.user)
    setProfileData(user);
    setLoading(false)
  }
  getData();
 },[])

  const handleContact = () => {
    console.log("Contact button clicked");
  }
  
  return (
    <Card className="w-[350px] card">
      <CardHeader className="profile-header">
        <div className="image-box">
       {  loading ?
         <Loader2 className="h-40 w-40 animate-spin text-cyan-400" /> :
        <img className="image" src={profileData.companyProfile} alt={profileData.name} />
         }
        </div>
   { !loading && <>    <CardTitle><strong>name placeholder</strong></CardTitle>
        <CardDescription className={"text-black"}>{profileData.jobTitle}</CardDescription>
        </> }
       
      </CardHeader>
     
     
      
   { !loading && <>  <CardContent className={"card-content"}>
   <hr />
        <div className="bio-box">
          <strong>Company</strong> : {profileData.companyName}
        </div>
        <div className="bio-box">
          <strong>Description</strong> : {profileData.description}
        </div>
        <div className="bio-box">
          <strong>Locations</strong> : {profileData.location}
        </div>
        <div className="bio-box">
          <strong>Type</strong> : {profileData.type}
        </div>
        {/* <div className="bio-box">
          <strong>Skills</strong>: {profileData.skills.toString().replaceAll(","," , ")}
        </div> */}
      </CardContent>  
      
      <CardFooter className="flex footer card-content">
        <Button onClick={handleContact} className="contact-button">Contact</Button>
      </CardFooter>
      </> }
    </Card>
  )
}


const getUsers = async(_id)=>{
  try {
   
    let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/${_id}`);
    result = await result.json();
    console.log(result)
    if(!result){
      redirect("/users")
      return;
    }
    return result;
  } catch (error) {
    console.log(error)
    redirect("/users")
  }
}