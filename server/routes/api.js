const express = require('express')
const Favourites = require('../models/Favourites')
const axios = require('axios')
const config = require('../config')

const router = express.Router()

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})


const loadFavs = () => Favourites.find({})

function formatPOData(data) {
    return {
        explanation: data.explanation,
        media_type: data.media_type,
        title: data.title,
        img: data.url
    }
}

router.get('/blogs/apod', async function (req, res) {
    try {
        const response = await axios.get(`${config.APOD_URL}${config.API_KEY}`)
        res.send(formatPOData(response.data))
    } catch (err) {
        res.status(404).send({ message: "404 Not found", err: err })
    }
})

async function formatSearchData(data) {
   
    const nasaIds = new Set()
    const favs = await loadFavs();
    favs.forEach(f => nasaIds.add(f.nasa_id))
    return data.map(blog => {
        const blogData = blog.data[0];
        return {
            description: blogData.description,
            title: blogData.title,
            nasa_id: blogData.nasa_id,
            img: blog.links && blog.links[0].href,
            isLiked: nasaIds.has(blogData.nasa_id)
        }
    }).slice(0,19);

}

router.get('/search', async function (req, res) {
    let errCode = "404"
    try {
        if (req.query.q) {
            const response = await axios.get(`${config.SEARCH_URL}${req.query.q}`)
            res.send(await formatSearchData(response.data.collection.items))
        } else {
            errCode = "400"
            throw (errCode)
        }
    } catch (err) {
        console.log("hi");
        res.status(parseInt(errCode)).send({ message: config.ERROR[errCode] })
    }
})

router.get('/blogs/favourites', async function (req, res) {
    try {
        const favs = await loadFavs();
        res.send(favs);
    }
    catch (e) {
        res.status(404).send({ message: config.ERROR["404"], err: e });
    }
})



router.post('/blogs/favourites', function (req, res) {
    const favouritesData = req.body
    const favourite = new Favourites({
        img: favouritesData.img,
        description: favouritesData.description,
        nasa_id: favouritesData.nasa_id,
        title: favouritesData.title
    })
    favourite.save().then(f => {
        res.status(201).send({ message: "post was liked", data: f })
    }).catch(err => {
        res.status(400).send({ message: "can not add new item", err: err })
    })
})

router.delete('/blogs/favourites/:id', async function (req, res) {
    const plogId = req.params.id
    try {
        if (!plogId || !isValidString(plogId)) {
            return res.status(400).send({ message: config.ERROR["400"] })
        }
        const deletedFavedPost = await Favourites.findOneAndDelete({ nasa_id: plogId })
        if (!deletedFavedPost) {
            return res.status(404).send({ message: config.ERROR["404"] })
        }
        res.send(deletedFavedPost)

    } catch (error) {
        res.status(500).send({ message: "Internal Server error", err: error })
    }
})


function isValidString(str) {
    if (str === undefined) {
        return false;
    }
    else if (typeof str === 'object') {
        return false;
    }
    else if (str.trim().length < 2) {
        return false;
    }
    return true;
}



module.exports = router
