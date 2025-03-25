import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosApi from "../utils/axiosApi";

const ContainerAddPassword = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [visiblePassword, setVisiblePassword] = useState({});
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPasswords, setTotalPasswords] = useState(0);

  // Fetch passwords with pagination
  const fetchPasswords = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/passwords?page=${page}&limit=10`);
      // console.log("Fetched passwords: ", response.data.data)
      const result = response.data.data; // Adjust based on actual API response structure
      // Avoid unnecessary state updates
      setPasswordArray((prevPasswords) => {
        if (JSON.stringify(prevPasswords) !== JSON.stringify(result.passwords)) {
            return result.passwords;
        }
        return prevPasswords;
    });
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.page);
      setTotalPasswords(response.data.totalDocs);
    } catch (error) {
      toast.error("Failed to fetch passwords");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!fetchedOnce.current) {
        fetchPasswords();
        fetchedOnce.current = true;
    }
}, []);

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    const currentSrc = new URL(ref.current.src).pathname;
    const basePath = import.meta.env.BASE_URL || "";
    
    if (currentSrc.includes("cross-eye.png")) {
      ref.current.src = `${basePath}/icons/eye.png`;
    } else {
      ref.current.src = `${basePath}/icons/cross-eye.png`;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await axiosApi.put(`/passwords/${editId}`, form);
        toast.success("Password updated successfully!");
      } else {
        await axiosApi.post("/passwords", form);
        toast.success("Password saved successfully!");
        setCurrentPage(1); // Reset to first page when adding new item
      }
      setForm({ site: "", username: "", password: "" });
      setIsEditing(false);
      setEditId(null);
      fetchPasswords(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save password");
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePassword = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) {
      return;
    }

    try {
      setLoading(true);
      await axiosApi.delete(`/passwords/${id}`);
      toast.success("Password deleted successfully");
      
      // Handle page navigation if last item on page is deleted
      if (passwordArray.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchPasswords(currentPage);
      }
    } catch (error) {
      toast.error("Failed to delete password");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const editPassword = (password) => {
    setForm({
      site: password.site,
      username: password.username,
      password: password.password
    });
    setIsEditing(true);
    setEditId(password._id);
  };

  const CopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("Copied to clipboard!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to copy");
      console.error("Copy failed:", error);
    }
  };

  const PaginationControls = () => (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1 || loading}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 || loading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
        } text-white`}
      >
        Previous
      </button>
      
      <span className="px-4 py-2 bg-white border border-green-500 rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages || loading}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages || loading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
        } text-white`}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="myContainer pb-20 pt-20">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </h1>
      <p className="text-green-900 text-sm md:text-md lg:text-lg text-center">
        Your Own password manager
      </p>
      
      <div className="flex flex-col p-4 text-black gap-4 items-center w-full">
        {isEditing && <div className="text-green-600 font-medium">Editing Password</div>}
        
        <input
          className="rounded-full bg-white border border-green-500 w-full md:w-3/4 p-4 py-1 text-sm md:text-base"
          type="text"
          name="site"
          value={form.site}
          onChange={handleChange}
          placeholder="Enter website URL"
          required
        />
        
        <div className="flex flex-col md:flex-row w-full md:w-3/4 justify-between gap-4">
          <input
            className="rounded-full bg-white border border-green-500 w-full md:w-1/2 p-4 py-1 text-sm md:text-base"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            required
          />
          
          <div className="relative w-full md:w-1/2">
            <input
              className="rounded-full bg-white border border-green-500 w-full p-4 py-1 text-sm md:text-base"
              type="password"
              name="password"
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
            <span
              className="absolute right-[1px] top-[1px] cursor-pointer"
              onClick={showPassword}
            >
              <img
                ref={ref}
                className="p-1"
                width={30}
                src={`${import.meta.env.BASE_URL}/icons/eye.png`}
                onError={(e) => (e.currentTarget.src = "/icons/eye.png")}
                alt="toggle visibility"
              />
            </span>
          </div>
        </div>

        <button
          onClick={savePassword}
          disabled={loading}
          className={`flex gap-1 md:gap-2 justify-center items-center ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-500"
          } rounded-full px-2 md:px-4 py-2 w-fit text-sm md:text-base font-semibold border-2 border-green-700 cursor-pointer`}
        >
          {loading ? (
            "Processing..."
          ) : isEditing ? (
            "Update Password"
          ) : (
            <>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </>
          )}
        </button>
      </div>

      <div className="passwords mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          <div className="text-sm text-gray-600">
            Total: {totalPasswords} passwords
          </div>
        </div>
        
        {loading && passwordArray.length === 0 ? (
          <div className="text-center">Loading passwords...</div>
        ) : passwordArray.length === 0 ? (
          <div className="text-center">No passwords saved yet</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-xl overflow-hidden text-sm md:text-base">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-2">Site</th>
                    <th className="py-2 px-2">Username</th>
                    <th className="py-2 px-2">Password</th>
                    <th className="py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item) => (
                    <tr key={item._id}>
                      <td className="py-2 border border-white text-center px-2">
                        <div className="flex items-center justify-center gap-1">
                          <a 
                            href={item.site.startsWith('http') ? item.site : `https://${item.site}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="truncate max-w-[100px]"
                          >
                            {item.site.replace(/^https?:\/\//, '').split('/')[0]}
                          </a>
                          <button
                            onClick={() => CopyToClipboard(item.site)}
                            className="p-1 rounded hover:bg-green-200"
                            title="Copy URL"
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/copy_icon.png`}
                              onError={(e) => (e.currentTarget.src = "/icons/copy_icon.png")}
                              alt="copy"
                            />
                          </button>
                        </div>
                      </td>
                      
                      <td className="py-2 border border-white text-center px-2">
                        <div className="flex items-center justify-center gap-1">
                          <span className="truncate max-w-[80px]">{item.username}</span>
                          <button
                            onClick={() => CopyToClipboard(item.username)}
                            className="p-1 rounded hover:bg-green-200"
                            title="Copy username"
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/copy_icon.png`}
                              onError={(e) => (e.currentTarget.src = "/icons/copy_icon.png")}
                              alt="copy"
                            />
                          </button>
                        </div>
                      </td>
                      
                      <td className="py-2 border border-white text-center px-2">
                        <div className="flex items-center justify-center gap-1">
                          <span>
                            {visiblePassword[item._id] ? (
                              <span className="font-mono">{item.password}</span>
                            ) : (
                              "••••••••"
                            )}
                          </span>
                          <button
                            onClick={() => setVisiblePassword(prev => ({
                              ...prev,
                              [item._id]: !prev[item._id]
                            }))}
                            className="p-1 rounded hover:bg-green-200"
                            title={visiblePassword[item._id] ? "Hide" : "Show"}
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/${
                                visiblePassword[item._id] ? "eye.png" : "cross-eye.png"
                              }`}
                              onError={(e) => (e.currentTarget.src = `/icons/${
                                visiblePassword[item._id] ? "eye.png" : "cross-eye.png"
                              }`)}
                              alt="toggle visibility"
                            />
                          </button>
                        </div>
                      </td>
                      
                      <td className="py-2 border border-white text-center px-2">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => CopyToClipboard(item.password)}
                            className="p-1 rounded hover:bg-green-200"
                            title="Copy password"
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/copy_icon.png`}
                              onError={(e) => (e.currentTarget.src = "/icons/copy_icon.png")}
                              alt="copy"
                            />
                          </button>
                          
                          <button
                            onClick={() => editPassword(item)}
                            className="p-1 rounded hover:bg-green-200"
                            title="Edit"
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/edit-icon.png`}
                              onError={(e) => (e.currentTarget.src = "/icons/edit-icon.png")}
                              alt="edit"
                            />
                          </button>
                          
                          <button
                            onClick={() => deletePassword(item._id)}
                            className="p-1 rounded hover:bg-red-200"
                            title="Delete"
                          >
                            <img
                              className="w-4"
                              src={`${import.meta.env.BASE_URL}/icons/delete_icon.png`}
                              onError={(e) => (e.currentTarget.src = "/icons/delete_icon.png")}
                              alt="delete"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationControls />
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ContainerAddPassword;