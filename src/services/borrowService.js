import { privateApi } from "../utils/api";

// 🔹 Borrow a book (Requires Authentication)
export const borrowBook = async (bookId, returnDate, userId) => {
  try {
    const formData = new FormData();
    formData.append("book_id", bookId);
    formData.append("return_date", returnDate);
    formData.append("user_id", userId);

    const response = await privateApi.post("/borrow", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error borrowing book:",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      "Failed to borrow book: " +
        (error.response?.data?.message || error.message)
    );
  }
};

// 🔹 Get borrowed books for the current user (Requires Authentication)
export const getBorrowedBooks = async () => {
  try {
    const response = await privateApi.get("/borrow/my-borrow");
    return response.data;
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    throw error;
  }
};

// 🔹 Get all borrows (Requires Authentication)
export const getBorrows = async () => {
  try {
    const response = await privateApi.get("/borrow");
    return response.data;
  } catch (error) {
    console.error("Error fetching borrows:", error);
    throw error;
  }
};

// 🔹 Update a borrow (Requires Authentication)
export const updateBorrow = async (id, borrowData) => {
  try {
    const response = await privateApi.put(`/borrow/${id}`, borrowData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating borrow:", error);
    throw error;
  }
};

// 🔹 Delete a borrow (Requires Authentication)
export const deleteBorrow = async (id) => {
  try {
    const response = await privateApi.delete(`/borrow/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting borrow:", error);
    throw error;
  }
};
