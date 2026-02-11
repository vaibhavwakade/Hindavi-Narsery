// src/pages/AdminReviewPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Star, Edit, Trash2 } from 'lucide-react';

function AdminReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editMessage, setEditMessage] = useState('');
    const [editRating, setEditRating] = useState(0);

    // const [searchName, setSearchName] = useState('');
    const [filterRating, setFilterRating] = useState(0);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const fetchAllReviews = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews(res.data);
        } catch (err) {
            toast.error('Failed to load reviews');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Review deleted');
            fetchAllReviews();
        } catch (err) {
            toast.error('Failed to delete review');
        }
    };

    const startEdit = (review) => {
        setEditingId(review._id);
        setEditMessage(review.message);
        setEditRating(review.rating);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${editingId}`, {
                message: editMessage,
                rating: editRating,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Review updated');
            setEditingId(null);
            setEditMessage('');
            setEditRating(0);
            fetchAllReviews();
        } catch (err) {
            toast.error('Failed to update review');
        }
    };

    const filteredReviews = reviews.filter((review) => {
        // const nameMatch = review.user?.name?.toLowerCase().includes(searchName.toLowerCase());
        const ratingMatch = filterRating === 0 || review.rating === filterRating;
        return ratingMatch;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-green-800">Manage Product Reviews</h1>

            {/* Filters */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                {/* <input
                    type="text"
                    placeholder="Search by user name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm w-full md:w-1/3"
                /> */}

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Filter by rating:</span>
                    {[0, 1, 2, 3, 4, 5].map((r) => (
                        <button
                            key={r}
                            onClick={() => setFilterRating(r)}
                            className={`text-sm px-2 py-1 rounded ${filterRating === r ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {r === 0 ? 'All' : r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Review List */}
            {filteredReviews.length === 0 ? (
                <p className="text-gray-500">No reviews found.</p>
            ) : (
                <div className="space-y-6">
                    {filteredReviews.map((review) => (
                        <div key={review._id} className="border-b pb-6">
                            <div className="flex flex-wrap md:flex-nowrap md:justify-between md:items-center">
                                <div className="mb-2 md:mb-0">
                                    <p className="font-semibold text-lg text-green-900">{review.product?.name}</p>
                                    <p className="text-gray-500 text-sm">By: {review.user?.name || 'User'}</p>
                                </div>

                                <div className="flex gap-4 mt-2 md:mt-0 w-full md:w-auto">
                                    <button
                                        onClick={() => startEdit(review)}
                                        className="text-green-700 hover:text-green-900 flex items-center gap-1"
                                    >
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 mt-2 text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-700 mt-2">{review.message}</p>

                            {editingId === review._id && (
                                <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h3 className="text-sm font-semibold text-green-800 mb-2">Edit Review</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                onClick={() => setEditRating(i)}
                                                className={`cursor-pointer ${i <= editRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <textarea
                                        rows="3"
                                        value={editMessage}
                                        onChange={(e) => setEditMessage(e.target.value)}
                                        className="w-full border rounded-lg p-2 text-sm text-gray-700"
                                    />
                                    <div className="mt-3 flex gap-3">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminReviewPage;
