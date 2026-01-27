// import { createContext, useState } from "react";

// // export const CommentContext = createContext();

// const API_URL = "http://localhost:5000/comments";

// const CommentProvider = ({ children }) => {
//   const [comments, setComments] = useState({});

//   const fetchComments = async (movieId) => {
//     try {
//       const res = await fetch(`${API_URL}?movieId=${movieId}`);
//       const data = await res.json();
//       setComments((prev) => ({ ...prev, [movieId]: data }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getComments = (movieId) => comments[movieId] || [];

//   const addComment = async (movieId, text) => {
//     const newComment = {
//       movieId,
//       text,
//       date: new Date().toLocaleString(),
//     };
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newComment),
//       });
//       const saved = await res.json();
//       setComments((prev) => ({
//         ...prev,
//         [movieId]: [...(prev[movieId] || []), saved],
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeComment = async (movieId, commentId) => {
//     try {
//       await fetch(`${API_URL}/${commentId}`, { method: "DELETE" });
//       setComments((prev) => ({
//         ...prev,
//         [movieId]: prev[movieId].filter((c) => c.id !== commentId),
//       }));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <CommentContext.Provider
//       value={{ getComments, addComment, removeComment, fetchComments }}
//     >
//       {children}
//     </CommentContext.Provider>
//   );
// };

// export default CommentProvider;
