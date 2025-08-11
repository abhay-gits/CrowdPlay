import youtubeMusic from "youtube-music-api";

const api = new youtubeMusic();

export const getVideo = async (req, res) => {
  try {
    const { searchValue } = req.params;
    await api.initalize();

    const result = await api.search(searchValue, "song");
    if (result.content.length > 0) {
      const firstResult = result.content[0];
      res.status(200).json(firstResult);
    } else {
        res.status(404).json({ error: "No results found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
