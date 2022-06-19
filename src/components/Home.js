import { CardMedia } from '@mui/material'
import axios from 'axios'

import React, { useEffect, useState } from 'react'

function Home(props) {
  const [apod, setApod] = useState(null)

  useEffect(() => {
    const fetchAPOData = async () => {
      try {
        const APODdata = await axios('http://localhost:4100/blogs/apod');

        setApod(APODdata.data)
      } catch (error) {
        console.log("Somthing went wrong!!");
      }
    }
    fetchAPOData()

  }, [])

  return (

    <div className='container'>
      {apod &&
        <div className='card'>
          <h1 >{apod.title}</h1>
          <CardMedia
            component="img"
            image={apod.img}
            alt="CardMedia Image Example"
          />
          <p className='text'>{apod.explanation}</p>
        </div>}

    </div>
  )
}

export default Home


