import axios from 'axios';
import React, { useRef, useState } from 'react'
import Blog from './Blog';
import SearchBar from './SearchBar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

function Search() {
    const [searchResults, setSearchResults] = useState()
    //const [searchInput, setInput] = useState("")
    const searchInput = useRef("")

    async function search(input) {
        try {
            if(input && input.trim() !==""){
                const searchRes = await axios.get(`http://localhost:4100/search?q=${input}`)
                setSearchResults(searchRes.data)
                //setInput(input)
                searchInput.current=input
            }else{
              alert("Enter a search keywords")
            }

        } catch (error) {
            alert("Somthing went wrong!!")
        }

    }
    
    async function disLike(blog) {
        try {
            await axios.delete(`http://localhost:4100/blogs/favourites/${blog.nasa_id}`)
            search(searchInput.current)
        } catch (error) {
            alert("Somthing went wrong!!")
        }
    }

    async function like(blog) {
        try {
            await axios.post(`http://localhost:4100/blogs/favourites`,blog)
            search(searchInput.current)

        } catch (error) {
            alert("Somthing went wrong!!")
        }
    }

    function blogFavStatus(isLiked) {
        if (isLiked) {
            return {
                updateLike: disLike,
                icon: <ThumbDownOutlinedIcon />
            }
        }
        return {
            updateLike: like,
            icon: <ThumbUpOutlinedIcon />
        }
    }
    
    return (
        <div className="container">
            <SearchBar search={search} />
            {searchResults && <div className='blogs-container'>
                {searchResults.map((blog, index) => <Blog key={index} blog={blog}
                    FavStatus={blogFavStatus(blog.isLiked)}
                />)
                }
            </div>}
        </div>
    )
}

export default Search

