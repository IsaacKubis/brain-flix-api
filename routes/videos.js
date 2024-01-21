const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const fs = require("fs");
const path = require('path')
let videos = require('../data/videos')

router.get('/videos', (req, res) => {
    let videoNames = videos.map(({id,title,channel,image}) => ({id,title,channel,image}));
    res.json(videoNames);
})

router.get('/videoData/:id', (req, res) => {
    let videoData = videos.filter(function (videos) {
        return videos.id === req.params.id;
    }).map(function (videos) {
        return videos;
    })

    res.json(videoData[0]);
})

router.use(bodyParser.json())

function postVideo(newVideo) {
    let videosJson = fs.readFileSync(path.resolve(__dirname, '../data/videos.Json'));
    let videoArray = JSON.parse(videosJson);
    videoArray.push(newVideo);
    videosJson = JSON.stringify(videoArray);
    fs.writeFileSync(path.resolve(__dirname, '../data/videos.Json'), videosJson, 'utf-8');
}
router.post('/videos', (req, res) => {
    const reqData = req.body;
    let id = Math.random().toString(16).slice(2);
    let newVideo = {
        id: id,
        title: req.body.title,
        channel: 'placeholder',
        image: 'http://localhost:8080/static/images/Upload-video-preview.jpg',
        description: req.body.description,
        views: 'placeholder',
        likes: 'placeholder',
        duration: 'placeholder', 
        video: 'placeholder',
        timestamp: 'placeholder',
        comments: ['placeholder']
    }
    postVideo(newVideo)
    return res.send(newVideo);
})

module.exports = router;