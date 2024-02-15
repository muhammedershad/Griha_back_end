require('dotenv').config()

 
const BASE_URL = process.env.CLIENT_SITE_URL!
const BASE_URL_LOCAL = 'http://localhost:8080'

export const links = {
    BASE_URL,
    BASE_URL_LOCAL
}