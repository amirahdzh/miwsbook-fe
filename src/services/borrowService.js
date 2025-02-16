import axios from 'axios';

const API_URL = 'http://laravue-bookworld.vercel.app/api/v1/borrow';

/**
 * Mengirimkan permintaan peminjaman buku.
 * @param {string} bookId - ID buku yang dipinjam.
 * @param {string} returnDate - Tanggal pengembalian buku.
 * @param {string} userId - ID pengguna yang melakukan peminjaman.
 * @returns {Promise<Object>} - Response dari API.
 */
export const borrowBook = async (bookId, returnDate, userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error('Authentication token is missing.');
  }

  try {
    const formData = new FormData();
    formData.append('book_id', bookId);
    formData.append('return_date', returnDate);
    formData.append('user_id', userId);

    const response = await axios.post(API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    // Log error details for debugging
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error('Failed to borrow book: ' + (error.response?.data?.message || error.message));
  }
};

// Function to get borrowed books for the current user
export const getBorrowedBooks = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  try {
    const response = await axios.get(`${API_URL}/my-borrow`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

// Function to get all borrows
export const getBorrows = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching borrows:', error);
    throw error;
  }
};

// Function to update a borrow
export const updateBorrow = async (id, borrowData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  try {
    const response = await axios.put(`${API_URL}/${id}`, borrowData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating borrow:', error);
    throw error;
  }
};

// Function to delete a borrow
export const deleteBorrow = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting borrow:', error);
    throw error;
  }
};
