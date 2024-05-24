// src/components/Login/Login.jsx
import React, { useState } from "react";
import http from "../service/apiClient";
import ErrorHandler from "../service/ErrorHandler";

function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Email:", username);
    console.log("Password:", password);

    try {
      let res = await loginUser(username, password);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", res.data.token);

      await getUserInfo(username);

      window.location.href = "/company-profile";
    } catch (error) {
      setError("Incorrect username or password");

      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const loginUser = async (username, password) => {
    let data = JSON.stringify({
      username: username,
      password: password,
    });

    let config = {
      method: "post",
      data: data,
      url: "/api/login",
    };

    return new Promise((resolve, reject) => {
      http
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const getUserInfo = async (usernmae) => {
    let config = {
      method: "get",
      url: "api/users",
    };
    return new Promise((resolve, reject) => {
      http
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          const userInfo = response.data.data.filter(
            (entry) => entry.username === username
          );
          localStorage.setItem("userInfo", JSON.stringify(userInfo[0]));
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        {error && <ErrorHandler error={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleEmailChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
