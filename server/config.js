const PORT = 4100
const API_KEY = "1PZgczKtY7MmFW8X8Gk53x6j4O2cp2aOaOZibrDU"
const APOD_URL = "https://api.nasa.gov/planetary/apod?api_key="
const SEARCH_URL="https://images-api.nasa.gov/search?q="
const ERROR ={
    "404":"404 Not found",
    "400":"bad request"
}
module.exports = { PORT, API_KEY, APOD_URL,SEARCH_URL,ERROR }

