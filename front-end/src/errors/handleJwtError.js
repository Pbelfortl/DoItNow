import { useRouter } from "next/router"


export default function handleJwtError (error) {
    const router = useRouter()

    if(error.data === "jwt expired") {
        alert(error.data)
        router.push("/")
        return
    }

}