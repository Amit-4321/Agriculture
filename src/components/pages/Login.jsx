import React, { useState, useEffect, useRef } from "react";
import "./LoginButton.css";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const password = e.target.password.value.trim();

    if (name && password) {
      const userData = {
        name,
        imgUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsOpen(false);
    } else {
      alert("Please enter name and password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
  };

  return (
    <div className="login-wrapper" ref={wrapperRef}>
      {!user ? (
        <>
          <button className="login-button" onClick={() => setIsOpen(!isOpen)}>
            Login
          </button>
          {isOpen && (
            <form className="login-form" onSubmit={handleLogin}>
              <input type="text" name="name" placeholder="Enter Name" required />
              <input type="password" name="password" placeholder="Enter Password" required />
              <button type="submit">Login</button>
            </form>
          )}
        </>
      ) : (
        <div className="login-user-dropdown">
          <img
            src={user.imgUrl}
            alt="User"
            className="login-avatar"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="login-dropdown-menu">
              <p>Hello, {user.name}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginButton;
