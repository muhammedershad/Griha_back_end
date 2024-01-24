import { createServer } from './infrastructure/config/app'
import { connectDb } from './infrastructure/config/connectDB'
import { server } from './infrastructure/config/app'

const PORT = 3000

const startServer = async () => {
    try {
        createServer()
        await connectDb()   // connect to Database
        server?.listen(PORT, () => console.log(`Server running on PORT :${PORT}`))   //start server

    } catch (error) {
        console.log(error)
    }
}
startServer()