
const express = require('express');
const router = express.Router();
const Anime = require('../models/anime');
const {jwtAuthMiddleware,generateToken}=require('../routes/jwt')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newAnime = new Anime(data);
        const response = await newAnime.save();
        console.log('data saved');
        const payload={
            id:response.id,
            username:response.username
        }

        const token=generateToken(payload);

        res.status(200).json({response:response,token:token});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

router.post('/login',async(req,res)=>{
    
    
    try{
    const {username,password}=req.body;

    const user=await Anime.findOne({username:username});

    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:'invalid username Or Password'})
    }
    const payload={
        id:user.id,
        username:user.username
    }

    const token=generateToken(payload);
    res.json({token})
    }
    catch(err){
console.log('error');
res.status(500).json({ error: "internal server error" });

    }
})
// GET route to fetch all anime
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Anime.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});


// GET route to fetch persons by work type
router.get('/:genre', async (req, res) => {
    try {
        const animeType = req.params.genre;
        const anime= await Anime.find({  genre: animeType });
        res.json(anime);
    } catch (error) {
        console.log('error fetching the data', error);
        res.status(500).json({ error: 'internal server error' });
    }
});

// PUT route to update a Anime by ID
router.put('/:id', async (req, res) => {
    try {
        const AnimeId = req.params.id;
        const updatedData = req.body;
        const updatedAnime = await Anime.findByIdAndUpdate(AnimeId, updatedData, { new: true });
        if (!updatedAnime) {
            return res.status(404).json({ error: "Anime not found" });
        }
        console.log('data updated');
        res.status(200).json(updatedAnime);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

// DELETE route to delete a Anime by ID
router.delete('/:id',jwtAuthMiddleware, async (req, res) => {
    try {
        const AnimeId = req.params.id;
        const deletedAnime = await Anime.findByIdAndDelete(AnimeId);
        if (!deletedAnime) {
            return res.status(404).json({ error: "Anime not found" });
        }
        console.log('data deleted');
        res.status(200).json({ message: "Anime deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;