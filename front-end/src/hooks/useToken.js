"use client"
import { useContext, useEffect, useState } from "react"

import userContext from "@/context/userContext"

export default function useToken () {
    const {userData} = useContext(userContext)

    const token = JSON.parse(window.localStorage.getItem("token"))
    
    return token         
}