import React from 'react'

function Blog(props) {

    function updateLikes() {
        props.FavStatus.updateLike(props.blog)
    }

    return (
        <div className='card'>
                <h1 >{props.blog.title}</h1>
                <img src={props.blog.img}
                    alt=""
                />
            <button onClick={updateLikes}>
                {props.FavStatus.icon}
            </button>
        </div>
    )
}

export default Blog