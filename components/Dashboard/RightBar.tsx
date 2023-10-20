"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function RightBar() {
  const {data:session} = useSession();
  const [following,setF] = useState([]);
  const getData = async() => {
    await axios({
      url: `/api/follow/${session?.user.id}`
    }).then((res)=>{
      setF(following);
    })
  }

  useEffect(()=>{
    if(session?.user.id){
      getData()
    }
  },[session?.user.id])

  return (
    <div className='text-white hidden sm:!flex flex-col bg-[#0d1b2a] p-5 overflow-hidden'>
        <h1 className='tracking-[5px] font-semibold px-8'>FOLLOWING</h1>
        <div className='flex flex-col overflow-x-hidden overflow-y-auto'>

        </div>
    </div>
  )
}