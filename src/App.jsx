import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

function App() {


  return (
    <>
      <Analytics />
      <div className="h-screen w-screen">
      <Navbar/>
      <Dashboard/>
      <Footer/>
      </div>
    </>
  );
}

export default App;
