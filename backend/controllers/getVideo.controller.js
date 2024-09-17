import youtubeMusic from "youtube-music-api";

const api = new youtubeMusic();

export const getVideo = async (req, res) => {
    try {
        const searchTerm = req.query.input;
        
        await api.initalize();
        
        const result = await api.search(searchTerm, 'song');
                if(result.content.length> 0){
                    const firstResult = result.content[0];
                    res.json(firstResult)
                }else{
                    console.log("No result Found");
                }
    } catch (error) {
        console.log("error in getVideoController",error.message);
    }
}