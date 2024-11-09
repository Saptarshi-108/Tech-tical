import { useContext, useState } from "react";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/data/myContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function Dashboard() {
  const context = useContext(myContext);
  const { mode, getAllBlog, loading, setLoading } = context;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const logout = () => {
    try {
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "blogs", id));
      toast.success("Blog deleted successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete blog");
      console.error(error);
    }
  };

  const filteredBlogs = getAllBlog.filter((blog) => {
    const matchesSearch =
      blog.blogs?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.blogs?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory
      ? blog.blogs?.category?.toLowerCase() === filterCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(getAllBlog.map((blog) => blog.blogs?.category)),
  ];

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className="w-40 h-40 object-cover rounded-full border-2 border-pink-600 p-1"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Kamal Nayan Upadhyay
            </h1>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              Software Developer
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              knupadhyay784@gmail.com
            </h2>
            <h2
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="font-semibold"
            >
              <span>Total Blog: </span> {getAllBlog.length}
            </h2>

            <div className="flex gap-2 mt-2">
              <Link to={"/createblog"}>
                <Button
                  style={{
                    background:
                      mode === "dark"
                        ? "rgb(226, 232, 240)"
                        : "rgb(30, 41, 59)",
                    color: mode === "dark" ? "black" : "white",
                  }}
                  className="px-8 py-2"
                >
                  Create Blog
                </Button>
              </Link>
              <Button
                onClick={logout}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color: mode === "dark" ? "black" : "white",
                }}
                className="px-8 py-2"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
            style={{
              background: mode === "dark" ? "#333" : "white",
              color: mode === "dark" ? "white" : "black",
            }}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
            style={{
              background: mode === "dark" ? "#333" : "white",
              color: mode === "dark" ? "white" : "black",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="container mx-auto px-4 max-w-7xl my-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
            <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                style={{
                  background: mode === "dark" ? "white" : "rgb(30, 41, 59)",
                }}
                className="text-xs"
              >
                <tr>
                  {[
                    "S.No",
                    "Thumbnail",
                    "Title",
                    "Category",
                    "Date",
                    "Action",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{
                        color: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-b-2"
                      style={{
                        background:
                          mode === "dark" ? "rgb(30, 41, 59)" : "white",
                      }}
                    >
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4"
                      >
                        {index + 1}.
                      </td>
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4 font-medium"
                      >
                        <img
                          className="w-16 rounded-lg"
                          src={item.thumbnail}
                          alt="thumbnail"
                        />
                      </td>
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4"
                      >
                        {item.blogs?.title || "No Title"}
                      </td>
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4"
                      >
                        {item.blogs?.category || "No Category"}
                      </td>
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4"
                      >
                        {item.date || "No Date"}
                      </td>
                      <td
                        style={{ color: mode === "dark" ? "white" : "black" }}
                        className="px-6 py-4"
                      >
                        <Button
                          onClick={() => deleteBlog(item.id)}
                          style={{ background: "red", color: "white" }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No blogs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
