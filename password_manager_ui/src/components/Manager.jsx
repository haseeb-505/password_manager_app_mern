import React, { useEffect, useState, useRef } from "react";
// import {CopyToClipboard} from 'react-copy-to-clipboard';

const Manager = () => {
  const ref = useRef();
  // reference for the eye in the table
  const [visiblePassword, setVisiblePassword] = useState({});
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    // ref.current.src retrun a ulr, or say returns absolute url like
    // http://localhost:5173/icons/eye.png
    // so we need to extract the path from this url
    const currentSrc = new URL(ref.current.src).pathname;
    if (currentSrc === "/icons/cross-eye.png") {
      ref.current.src = "/icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icons/cross-eye.png";
      passwordRef.current.type = "password";
    }
  };
  // savePassword
  const savePassword = () => {
    console.log(form);
    const updatedPasswords = [...passwordArray, form];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    //if we'd have passed passwordArray, then it would have taken too much time
    console.log(updatedPasswords);
  };

  // showPasswordTable
  const showPasswordTable = (index) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  //  onChange handler
  const handleChange = (e) => {
    // e.preventDefault();
    // calling e.preventDefault() in handleChange(), which is unnecessary for input fields
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // copy password to clipboard
  const CopyToClipboard = async (text) => {
    // const [clicked, setClicked] = useState(false);
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.log("Failed to copy: ", error);
    }
  };

  // delete password with username as well as site
  const deletePassword = async (index) => {
    setPasswordArray(passwordArray.filter((val, i) => i !== index));
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="myContainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own password manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            className="rounded-full bg-white border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            id="websiteUrl"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              className="rounded-full bg-white border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter UserName"
              id="username"
            />
            <div className="relative">
              <input
                className="rounded-full bg-white border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                id="password"
              />
              <span
                className="absolute right-[1px] top-[1px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye-icon"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-500 border-2 broder-green-700 hover:cursor-pointer active:bg-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        {/* table to show the user's password */}
        <div className="passwords">
          <h2 className="font-bold text-xl py-4 text-center">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          {/* copy button */}
                          <button
                            onClick={() => {
                              CopyToClipboard(item.password);
                            }}
                            className="cursor-pointer bg-green-600 rounded-md justify-center items-center px-2 active:bg-green-800"
                          >
                            <img
                              className="w-5 py-1"
                              src="/icons/copy_icon.png"
                              alt="copy-icon"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center min-w-32">
                        <div className="flex items-center justify-center gap-2">
                          {item.username}
                          {/* copy button */}
                          <button
                            onClick={() => {
                              CopyToClipboard(item.password);
                            }}
                            className="cursor-pointer bg-green-600 rounded-md justify-center items-center px-2 active:bg-green-800"
                          >
                            <img
                              className="w-5 py-1"
                              src="/icons/copy_icon.png"
                              alt="copy-icon"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center justify-center items-center min-w-32">
                        <div className="flex items-center justify-center gap-2">
                          <span>
                            {visiblePassword[index]
                              ? item.password
                              : "********"}
                          </span>
                          <button onClick={() => showPasswordTable(index)}>
                            <img
                              className="w-7 cursor-pointer bg-green-600 rounded-lg py-1 px-1 active:bg-green-900"
                              src={
                                visiblePassword[index]
                                  ? "/icons/eye.png"
                                  : "/icons/cross-eye.png"
                              }
                              alt="eye"
                              onClick={showPasswordTable}
                            />
                          </button>
                          {/* copy button */}
                          <button
                            onClick={() => {
                              CopyToClipboard(item.password);
                            }}
                            className="cursor-pointer bg-green-600 rounded-md justify-center items-center px-2 active:bg-green-800"
                          >
                            <img
                              className="w-5 py-1"
                              src="/icons/copy_icon.png"
                              alt="copy-icon"
                            />
                          </button>
                          {/* delete button */}
                          <button
                            onClick={() => {
                              deletePassword(index);
                            }}
                            className="cursor-pointer bg-green-600 rounded-md justify-center items-center px-2 active:bg-green-800"
                          >
                            <img
                              className="w-5 py-1"
                              src="/icons/delete_icon.png"
                              alt="copy-icon"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
