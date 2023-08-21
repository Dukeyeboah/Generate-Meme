import React,{useState} from 'react';

export default function Meme() {
    const [meme, setMeme] = useState( {
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemes, setAllMemes] = React.useState([])

    //  React.useEffect(() => {
    //     fetch("https://api.imgflip.com/get_memes")
    //         .then(res => res.json())
    //         .then(data => setAllMemes(data.data.memes))
    // }, [])

    //using Async function in useEffect
    React.useEffect(() => {
    async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMemes(data.data.memes)
    }
    getMemes()
    }, [])
    
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))    
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <div className="form">
            <div className="text-boxes">
                <input
                    placeholder="Top-text"
                    type="text"   
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
            </div>

            <div className="text-boxes">
                <input
                    placeholder="bottom-text"
                    type="text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />     
            </div>

            <button onClick={getMemeImage}>Generate Meme</button>
            
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="generated Meme" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>  
        </div>
    
    )
    }