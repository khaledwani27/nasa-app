import React, { useEffect, useState } from 'react'
import Blog from './Blog';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import axios from 'axios';

function Favourites(props) {
  const [favourites, setFavourites] = useState()
  const [liked, setIsLiked] = useState(false)
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favourites = await axios.get('http://localhost:4100/blogs/favourites');
        setFavourites(favourites.data)
      } catch (error) {
        console.log("Somthing went wrong!!");
      }
    }

    fetchFavourites()

  }, [liked])

  async function disLike(blog) {
    try {
      await axios.delete(`http://localhost:4100/blogs/favourites/${blog.nasa_id}`)
      setIsLiked(!liked)
    } catch (error) {
      alert("Somthing went wrong!!")
    }
  }
  
  return (
    <div className="container">
      {favourites && <div className='blogs-container'>
        {favourites.map((blog, index) =>
          <Blog key={index} blog={blog}
            FavStatus={{
              updateLike: disLike,
              icon: <ThumbDownOutlinedIcon />
            }}
          />
        )}
      </div>}
    </div>
  )
}

export default Favourites

