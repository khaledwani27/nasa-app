import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const SearchBar = (props) => {
    const [searchInput, setInput] = useState("")

    const handleSearch = (e) => {
        setInput(e.target.value)
    }
    function search(){
        props.search(searchInput)
    }
    return (
        <div className="searchpage">
                <input type="text" onChange={handleSearch} 
                value={searchInput} placeholder="Search the univers" />
                <button className='icon-container' onClick={search}>
                  <SearchOutlinedIcon/>
                </button>
        </div>
    )
}

export default SearchBar