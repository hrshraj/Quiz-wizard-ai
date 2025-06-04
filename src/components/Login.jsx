import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; // make sure these are correctly exported

const LoginPage = () => {
  //   const handleLogin = async () => {
  //     try {
  //       await signInWithPopup(auth, provider);
  //       sessionStorage.setItem("auth", "true"); // 👈 create session
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     }
  //   };
  const handleLogin = async () => {
    console.log("🔁 Login attempt started");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Login success:", result.user);
      sessionStorage.setItem("auth", "true");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-purple-700">
          Welcome to QuizWizard.ai
        </h1>
        <p className="text-gray-600">Please sign in with Google to continue</p>
        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
