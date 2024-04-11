import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div className="w-full h-screen grid place-items-center">
        <img src="/404er.svg" alt="not-found" width={400} height={400} />
        <Button>
            <Link to="/dashboard">
                  برگشت به داشبور
           </Link>
        </Button>
    </div>
  )
}

export default NotFound