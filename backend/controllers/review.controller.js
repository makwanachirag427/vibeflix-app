export const addOrUpdateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentType, rating, text } = req.body;

    if (!contentType || !rating) {
      return res.status(400).json({
        success: false,
        message: "Content type and rating is required",
      });
    }

    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 0 to 5" });
    }

    const review = {
      id,
      contentType,
      text,
      rating,
      date: new Date(),
    };

    const index = req.user.reviews.findIndex(
      (r) => r.id === id && r.contentType === contentType
    );

    if (index !== -1) {
      req.user.reviews[index] = review;
    } else {
      req.user.reviews.push(review);
    }
    await req.user.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      reviews: req.user.reviews,
    });
  } catch (error) {
    console.log("Error in addOrUpdateReview controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const removeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentType } = req.body;
    if (!contentType) {
      return res
        .status(400)
        .json({ success: false, message: "Content type is required" });
    }

    req.user.reviews = req.user.reviews.filter(
      (item) => !(item.id === id && item.contentType === contentType)
    );

    await req.user.save();

    res.status(200).json({ success: true,message:"Review removed successfully", reviews: req.user.reviews });
  } catch (error) {
    console.log("Error in removeReview controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
