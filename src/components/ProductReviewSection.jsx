import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Star, Trash2, Edit } from "lucide-react";

function ProductReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [canReview, setCanReview] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userReviewId, setUserReviewId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  const [userReview, setUserReview] = useState(null);
  const [otherReviews, setOtherReviews] = useState([]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
      checkPermissions();
    }
  }, [productId]);

  const fetchReviews = async (skipFormStateUpdate = false) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/product/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const allReviews = res.data.reviews || [];
      setReviews(allReviews);
      setUserId(res.data.userId);

      const currentUserReview = allReviews.find(
        (r) => r.user?._id === res.data.userId,
      );
      const others = allReviews.filter((r) => r.user?._id !== res.data.userId);
      setUserReview(currentUserReview || null);
      setOtherReviews(others);
      setUserReviewId(currentUserReview?._id || null);

      const userReview = allReviews.find((r) => r.user?._id === userId);
      if (userReview) {
        setUserReviewId(userReview._id);

        console.log("editing id:", editingReviewId);
        // Only set rating and message if currently editing
        if (!skipFormStateUpdate && editingReviewId) {
          setRating(userReview.rating);
          setMessage(userReview.message);
        }
      }
    } catch (err) {
      toast.error("Failed to load reviews");
    }
  };

  const checkPermissions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/can-review/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCanReview(res.data.canReview);
      setIsAdmin(res.data.isAdmin);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!rating || !message) {
      toast.error("Please provide a rating and message");
      return;
    }

    try {
      if (editingReviewId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${editingReviewId}`,
          { rating, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        toast.success("Review updated");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${productId}`,
          { rating, message },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        toast.success("Review submitted");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setEditingReviewId(null);
      setMessage("");
      setRating(0);
      editingReviewId ? await fetchReviews(true) : await fetchReviews();
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Review deleted");
    } catch (err) {
      toast.error("Failed to delete review");
    } finally {
      setMessage("");
      setRating(0);
      setEditingReviewId(null);
      await fetchReviews();
    }
  };

  const startEdit = (review) => {
    setEditingReviewId(review._id);
    setMessage(review.message);
    setRating(review.rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // useEffect(() => {
  //     if (userId && reviews.length) {
  //         const currentUserReview = reviews.find(r => r.user?._id === userId);
  //         const others = reviews.filter(r => r.user?._id !== userId);
  //         setUserReview(currentUserReview || null);
  //         setOtherReviews(others);
  //         setUserReviewId(currentUserReview?._id || null);
  //     }
  // }, [userId, reviews]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-green-800 mb-6">
        Customer Reviews
      </h2>

      {(canReview || editingReviewId) && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-900 mb-2">
            {editingReviewId ? "Edit your review" : "Write a review"}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                onClick={() => setRating(i)}
                className={`cursor-pointer ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <textarea
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-lg p-3 text-gray-700"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}

      {/* Your Review */}
      {userReview && (
        <div className="mb-10 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-1">Your Review</h3>
          <div className="flex items-center gap-2 text-yellow-500">
            {[...Array(userReview.rating)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="mt-1 text-gray-800">{userReview.message}</p>
          <p className="text-sm text-gray-500">
            By {userReview.user?.name} on {formatDate(userReview.createdAt)}
          </p>
          <div className="mt-2 flex gap-4 text-sm text-gray-600">
            <button
              onClick={() => startEdit(userReview)}
              className="flex items-center gap-1 hover:text-green-700"
            >
              <Edit size={14} /> Edit
            </button>
            <button
              onClick={() => handleDelete(userReview._id)}
              className="flex items-center gap-1 hover:text-red-600"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Other Reviews */}
      {otherReviews.length === 0 ? (
        <p className="text-gray-500">No other reviews yet.</p>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-green-800 mb-4">
            Other Customer Reviews
          </h3>
          <div className="space-y-6">
            {otherReviews.map((review) => (
              <div key={review._id} className="border-b border-green-100 pb-4">
                <div className="flex items-center text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-2 text-gray-800">{review.message}</p>
                <p className="text-sm text-gray-500">
                  By {review.user?.name || "User"} on{" "}
                  {formatDate(review.createdAt)}
                </p>
                {isAdmin && (
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    <button
                      onClick={() => startEdit(review)}
                      className="flex items-center gap-1 hover:text-green-700"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center gap-1 hover:text-red-600"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductReviewSection;
