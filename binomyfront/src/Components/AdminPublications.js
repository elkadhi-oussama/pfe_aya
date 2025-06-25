import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "./redux/postSlice";
import Swal from "sweetalert2";

function AdminPublications() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post?.postList || []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer cette publication ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(id));
        Swal.fire("Supprimé", "Publication supprimée avec succès.", "success").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          📝 Publications des amateurs
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-transform hover:scale-[1.01]"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">{post.description}</p>
              <p className="text-xs text-gray-500">
                ✍️ Auteur : {post.author?.name || "—"} ({post.author?.role || "—"})
              </p>
              <p className="text-xs text-gray-400 mb-4">
                🕒 {new Date(post.date).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm shadow transition duration-200"
              >
                🗑 Supprimer
              </button>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="col-span-full text-gray-500 text-center text-sm">
              Aucune publication trouvée.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPublications;
