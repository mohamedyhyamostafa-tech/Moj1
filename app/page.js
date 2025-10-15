"use client";
import { useEffect } from "react";

export default function Page() {

  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }

  function searchPage() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let links = document.querySelectorAll(".links a");
    for (let link of links) {
      if (link.innerText.toLowerCase().includes(input)) {
        window.location.href = link.href;
        return;
      }
    }
    alert("Page not found!");
  }

  function playWelcome() {
    let music = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    music.volume = 0.2;
    music.play();

    setTimeout(() => {
      let msg = new SpeechSynthesisUtterance("Welcome to Alzaeem Tech website!");
      msg.lang = "en-US";
      msg.rate = 1.2;
      msg.pitch = 1.1;
      window.speechSynthesis.speak(msg);
    }, 3000);
  }

  useEffect(() => {
    playWelcome();
  }, []);

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>☰ Menu</button>

      <header>⚔️ 𝒜𝓁𝓏𝒶𝒾𝓂 𝒯𝑒𝒸𝒽 ⚔️ <i className="fa-solid fa-brain" style={{color:'#0ff'}}></i></header>

      <div className="sidebar" id="sidebar">
        <div>
          <div className="search-box">
            <input type="text" id="searchInput" placeholder="Search page..." />
            <button onClick={searchPage}>Search</button>
          </div>
          <div className="links">
            <a href="https://alzaeemtc1.vercel.app/"><i className="fa-solid fa-house"></i> Home</a>
            <a href="https://alzaeem1.gt.tc/rule%20unive"><i className="fa-solid fa-circle-info"></i> University of Computers and Information</a>
            <a href="https://alzaeem1.gt.tc/rule%20stud"><i className="fa-solid fa-gear"></i> Student values</a>
            <a href="https://kop-eta.vercel.app/"><i className="fa-solid fa-briefcase"></i> snake_game</a>
            <a href="https://alzaeem1.gt.tc/student"><i className="fa-solid fa-brain"></i> Student page</a>
            <a href="https://script.google.com/macros/s/AKfycbyuA91JpL64BF4A8uytTLVcMrL7SlNSDQXN3xC-J-28t-Ed9Z_qhO6TGDdk425reg/exec"><i className="fa-solid fa-code"></i> Registration page</a>
            <a href="https://alzaeem1.gt.tc/file"><i className="fa-solid fa-shield-halved"></i> Student files</a>
            <a href="https://alzaeem1.gt.tc/search1_hub"><i className="fa-solid fa-users"></i> Google and Microsoft services</a>
            <a href="https://alzaeem1.gt.tc/search_hub"><i className="fa-solid fa-headset"></i> Software definitions</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mohamedyhyamostafa@gmail.com"><i className="fa-solid fa-envelope"></i> Email for correspondence and inquiries</a>
          </div>
        </div>
        <div className="footer">
          ⚔️ © 2025 Alza3im Tech ⚔️<br/> All Rights Reserved
        </div>
      </div>

      <div className="content">
        <div className="welcome">✨ Power • Intelligence • Future ✨</div>
        <div className="message">⚔️ Where AI Meets Warriors of Technology ⚔️</div>
        <div className="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKVX7d7hDJYenWDygmHG-h239wLLUlIPmFWwlSiF4mA&s=10" alt="Wild Horse Logo"/>
          <p style={{marginTop:'10px'}}>The Untamed Stallion of Sharqia 🐎</p>
        </div>
      </div>

      <div className="cloud" style={{top:'25%',animationDelay:'0s'}}>🤖 Artificial Intelligence</div>
      <div className="cloud" style={{top:'35%',animationDelay:'5s'}}>⚡ Neural Networks</div>
      <div className="cloud" style={{top:'45%',animationDelay:'10s'}}>📊 Data Science</div>
      <div className="cloud" style={{top:'55%',animationDelay:'15s'}}>🗡️ Cyber Defense</div>
      <div className="cloud" style={{top:'65%',animationDelay:'20s'}}>🚀 Robotics & Automation</div>
      <div className="cloud" style={{top:'75%',animationDelay:'25s'}}>🌐 Future Networks</div>

      <div className="bottom-bar">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-gem"></i>
        <i className="fa-solid fa-dragon"></i>
        <i className="fa-solid fa-chess-knight"></i>
        <i className="fa-solid fa-shield-halved"></i>
        <br/> ⚔️ All Rights Reserved | Alzaeem Tech ⚔️
      </div>

      <button className="voice-btn" onClick={playWelcome}>🔊 Play Welcome Voice</button>

      <style jsx>{`
        header { text-align:center; padding:20px; font-size:40px; font-weight:bold; color:gold; text-shadow:0 0 15px #ff0,0 0 25px #f80; animation:glow 3s infinite alternate; }
        @keyframes glow { from{ text-shadow:0 0 10px #f80;} to{ text-shadow:0 0 30px #ff0;} }
        .sidebar { position: fixed; top:-100%; left:0; width:100%; height:320px; background:rgba(0,0,0,0.95); padding:20px; box-shadow:0 3px 15px #000; transition: top 0.5s ease; z-index:1001; display:flex; flex-direction:column; justify-content:space-between; }
        .sidebar.active{ top:0; }
        .search-box{ text-align:center; margin-bottom:20px; }
        .search-box input{ width:70%; padding:8px; border:none; border-radius:6px; outline:none; font-size:14px; }
        .search-box button{ padding:8px 10px; border:none; border-radius:6px; background:gold; cursor:pointer; font-weight:bold; }
        .search-box button:hover{ background:orange; }
        .links{ flex:1; overflow-y:auto; }
        .links a{ display:block; padding:12px; margin:8px 0; background:#111; color:#fff; text-decoration:none; border-radius:8px; text-align:center; transition:0.3s; font-weight:bold; }
        .links a:hover{ background:gold; color:black; }
        .footer{ text-align:center; font-size:12px; color:#bbb; margin-top:10px; }
        .toggle-btn{ position:fixed; top:20px; right:20px; background:gold; color:black; border:none; padding:10px 15px; cursor:pointer; border-radius:8px; font-weight:bold; z-index:1002; transition:0.3s; }
        .toggle-btn:hover{ background:orange; }
        .content{ margin:40px; text-align:center; position:relative; z-index:1; }
        .welcome{ font-size:28px; font-weight:bold; animation:colors 3s infinite alternate; }
        @keyframes colors{ 0%{color:gold;} 50%{color:#0ff;} 100%{color:#f0f;} }
        .message{ margin-top:15px; font-size:22px; animation:fade 4s infinite; font-weight:bold; }
        @keyframes fade{ 0%,100%{opacity:0;} 50%{opacity:1;} }
        .logo{ margin-top:20px; }
        .logo img{ width:280px; border-radius:20px; box-shadow:0 0 30px gold; max-width:90%; }
        .cloud{ position:absolute; left:-200px; background:rgba(255,255,255,0.08); padding:20px 40px; border-radius:50px; font-size:18px; font-weight:bold; animation:floatClouds 25s linear infinite; color:cyan; text-shadow:0 0 8px #0ff; white-space:nowrap; }
        @keyframes floatClouds{ 0%{transform:translateX(0);opacity:0;} 20%{opacity:1;} 80%{opacity:1;} 100%{transform:translateX(120vw);opacity:0;} }
        .bottom-bar{ background:#111; padding:15px; text-align:center; font-size:14px; margin-top:40px; border-top:2px solid gold; }
        .bottom-bar i{ margin:0 8px; color:gold; font-size:18px; }
        .voice-btn{ position:fixed; bottom:25px; right:25px; padding:12px 18px; background:cyan; color:black; font-weight:bold; border:none; border-radius:10px; cursor:pointer; z-index:1003; box-shadow:0 0 15px cyan; transition:0.3s; }
        .voice-btn:hover{ background:#0ff; box-shadow:0 0 25px cyan; }
      `}</style>
    </>
  );
}
