export const addToWatchList = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentType, name, image } = req.body;
    if (!contentType || !image || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const item = {
      id,
      contentType,
      name,
      image,
    };

    const exists = req.user.watchlist.some(
      (i) => i.id === id && i.contentType === contentType
    );

    if (!exists) {
      req.user.watchlist.push(item);
      await req.user.save();
    }

    res.status(200).json({ success: true,message:"Successfully added to the watchlist", watchlist: req.user.watchlist });
  } catch (error) {
    console.log("Error in addToWatchList controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const removeFromWatchList = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentType } = req.body;
    if (!contentType) {
      return res
        .status(400)
        .json({ success: false, message: "Content type is required" });
    }

    req.user.watchlist = req.user.watchlist.filter(
      (item) => !(item.id === id && item.contentType === contentType)
    );

    await req.user.save();

    res.status(200).json({ success: true,message:"Successfully removed from the watchlist", watchlist: req.user.watchlist });
  } catch (error) {
    console.log("Error in removeFromWatchList controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
