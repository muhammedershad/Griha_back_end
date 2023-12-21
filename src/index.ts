import { createServer } from './infrastructure/config/app'
import { connectDb } from './infrastructure/config/connectDB'
const PORT = 3000
const app = createServer()

const startServer = async () => {
    try {
        await connectDb()   // connect to Database
        app?.listen(PORT, () => console.log(`Server running on PORT :${PORT}`))   //start server

    } catch (error) {
        console.log(error)
    }
}
startServer()