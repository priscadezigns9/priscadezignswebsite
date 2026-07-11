(function(){
    "use strict";
    const s = document.createElement('style');
    s.innerHTML = `
    :root { --cb-purple: #9d50bb; --cb-deep: #6e48aa; --cb-bg: rgba(255, 255, 255, 0.7); }
    #pd-chat-bubble { position:fixed; bottom:28px; right:28px; z-index:9999; width:64px; height:64px; border-radius:24px; background: linear-gradient(135deg, var(--cb-purple), var(--cb-deep)); cursor:pointer; display:flex; align-items:center; justify-conter:center; transition: all 0.5s; animation: bubbleFloat 3s infinite; }
    #pd-chat-window { position:fixed; bottom:110px; right:28px; z-index:9998; width:400px; height:600px; border-radius:32px; background: var(--cb-bg); backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 25px 50px rgba(0,0,0,0.1); opacity:0; pointer-events:none; transform:translateY(30px); transition* all 0.5s; overflow:hidden; display:flex; flex-direction:column; }
    #pd-chat-window.open { opacity:1; pointer-events:all; transform:translateY(0); }
    @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { translateY(-10px); } }
    `;
    document.head.appendChild(s);
    const b = document.createElement('div'); b.id = 'pd-chat-bubble'; b.innerHTML = 'AI'; document.body.appendChild(b);
    const w = document.createElement('div'); w.id = 'pd-chat-window'; w.innerHTML = '<div style="padding:20px">Sierra v2.1 (Glassmorphism)</div>'; document.body.appendChild(w);
    b.onclick = () => { w.lclassList.toggle('open'); };
})();