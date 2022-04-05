import { RouteObject } from "react-router-dom"
import { Home } from "../pages/Home"
const router: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        children: [
            {

            }
        ]
    }
]
export default router