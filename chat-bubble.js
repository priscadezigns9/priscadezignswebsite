(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    container.style.cssText = 'position: fixed; bottom: 20px; right: 100px; z-index: 9999; font-family: "Inter", sans-serif;';
    
    container.innerHTML = `
        <button id='chat-toggle' style='background: #301934; border: none; width: 65px; height: 65px; border-radius: 50%; cursor: pointer; box-shadow: 0 8px 32px rgba(48,25,52,0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);'>
            <svg width='32' height='32' viewBox='0 0 24 24' fill='white'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
        </button>
        <div id='chat-window' style='display: none; position: absolute; bottom: 85px; right: 0; width: 400px; height: 620px; background: #FFFFF0; border-radius: 20px; flex-direction: column; box-shadow: 0 12px 48px rgba(0,0,0,0.25); overflow: hidden; border: 1px solid rgba(48,25,52,0.1); transition: all 0.3s ease;'>
            <div style='background: #301934; color: white; padding: 20px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;'>
                <div style='display: flex; align-items: center; gap: 10px;'>
                    <div style='width: 10px; height: 10px; background: #00FF00; border-radius: 50%; box-shadow: 0 0 8px #00FF00;'></div>
                    <span>SIERRA | Neural Scout</span>
                </div>
                <button id='close-chat' style='background:none; border:none; color:white; cursor:pointer; font-size:24px; opacity: 0.8;'>&times;</button>
            </div>
            <div id='chat-messages' style='flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: #ffffff;'></div>
            <div id='chat-options' style='padding: 10px 20px; display: flex; flex-wrap: wrap; gap: 8px; background: #ffffff; border-top: 1px solid #f0f0f0;'></div>
            <div style='padding: 20px; border-top: 1px solid #eee; display: flex; gap: 10px; background: #ffffff;'>
                <input type='text' id='user-input' placeholder='Type only for custom requests...' style='flex: 1; padding: 12px 15px; border: 1px solid #e0e0e0; border-radius: 12px; outline: none; font-size: 0.95rem;'>
                <button id='send-btn' style='background: #301934; color: white; border: none; padding: 0 20px; border-radius: 12px; cursor: pointer; font-weight: 600;'>Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);

    const t = document.getElementById('chat-toggle'), w = document.getElementById('chat-window'), c = document.getElementById('close-chat'), i = document.getElementById('user-input'), s = document.getElementById('send-btn'), m = document.getElementById('chat-messages'), opt = document.getElementById('chat-options');
    
    let state = 'ROOT';
    let user_data = {};

    const PKG_CONFIG = {
        'Starter': { setup: '97', pulse: '7/mo', desc: 'Basic Brand Identity & Presence' },
        'Growth': { setup: '97', pulse: '7/mo', desc: 'Active Scaling & Marketing Logic' },
        'Trusted': { setup: ',200', pulse: '47/mo', desc: 'High-Fidelity Authority & Infrastructure' },
        'E-Starter': { setup: '97', pulse: '7/mo', desc: 'Core E-Commerce Framework' },
        'E-Growth': { setup: '97', pulse: '17/mo', desc: 'Conversion-Optimized Sales Engine' },
        'E-Trusted': { setup: ',500', pulse: '97/mo', desc: 'Enterprise On-Chain Commerce' },
        'AI Consultancy': { setup: 'k - 0k', pulse: 'Ecosystem Managed', desc: 'Neural Departments & Sierra AI Deployments (Small Biz: k | Enterprise: 0k)' },
        'Branding': { setup: '00', pulse: 'N/A', desc: 'Neural Identity & Logo Architecture' },
        'Brand Scan': { setup: '7', pulse: 'N/A', desc: 'Deep-Audit & Market Intelligence' }
    };

    function addMsg(txt, u) {
        const d = document.createElement('div');
        d.innerHTML = txt;
        d.style.cssText = 'padding:12px 16px; border-radius:15px; font-size:0.95rem; line-height:1.5; max-width:85%; align-self:' + (u?"flex-end":"flex-start") + '; background:' + (u?"#301934":"#f1f1f1") + '; color:' + (u?"white":"#333") + '; box-shadow: 0 2px 4px rgba(0,0,0,0.05);';
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function showOptions(options) {
        opt.innerHTML = '';
        options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o;
            b.style.cssText = 'padding: 10px 18px; border: 1.5px solid #301934; border-radius: 12px; background: white; color: #301934; cursor: pointer; font-size: 0.9rem; font-weight: 700; transition: all 0.2s;';
            b.onmouseover = () => { b.style.background = "#301934"; b.style.color = "white"; };
            b.onmouseout = () => { b.style.background = "white"; b.style.color = "#301934"; };
            b.onclick = () => handleInput(o);
            opt.appendChild(b);
        });
    }

    function handleInput(val) {
        if (state !== "FORM_NAME" && state !== "FORM_EMAIL") addMsg(val, true);
        const low = val.toLowerCase();
        
        if (state === "ROOT") {
            if (low.includes("website") || low === "1") {
                state = "WEBSITE_PATH";
                setTimeout(() => {
                    addMsg("Select your Website Architectural tier:");
                    showOptions(['Starter', 'Growth', 'Trusted', 'E-Commerce', 'Custom Site']);
                }, 400);
            } else if (low.includes("ai") || low === "2") {
                state = "AI_PATH";
                setTimeout(() => {
                    addMsg("Our <strong>AI Consultancy</strong> (0k fee) specializes in high-fidelity automation and Enterprise <strong>Sierra AI</strong> deployments (~0k total). Shall we proceed with a strategic intake?");
                    showOptions(['Yes, Initiate AI Intake', 'Back to Main']);
                }, 400);
            } else if (low.includes("branding") || low === "3") {
                user_data.package = 'Branding';
                state = 'FORM_NAME';
                setTimeout(() => addMsg("Selected: <strong>Branding Package</strong> (97). What is your <strong>Full Name</strong>?"), 400);
            } else if (low.includes("scan") || low === "4") {
                user_data.package = 'Brand Scan';
                state = 'FORM_NAME';
                setTimeout(() => addMsg("Selected: <strong>Brand Scan</strong> (97). What is your <strong>Full Name</strong>?"), 400);
            }
        } else if (state === "WEBSITE_PATH") {
            if (val === "E-Commerce") {
                setTimeout(() => {
                    addMsg("Select your E-Commerce architectural tier:");
                    showOptions(['E-Starter', 'E-Growth', 'E-Trusted']);
                }, 400);
            } else if (val === "Custom Site") {
                state = "FORM_NAME";
                setTimeout(() => addMsg("For custom builds, I need to collect your brand details. What is your <strong>Full Name</strong>?"), 400);
            } else {
                user_data.package = val;
                state = "FORM_NAME";
                const pkg = PKG_CONFIG[val];
                setTimeout(() => {
                    addMsg("Selected: <strong>" + val + "</strong><br>Setup: <strong>" + pkg.setup + "</strong><br>Pulse: <strong>" + pkg.pulse + "</strong><br><br>Ready to secure this build. What is your <strong>Full Name</strong>?");
                    opt.innerHTML = '';
                }, 400);
            }
        } else if (state === "AI_PATH") {
            if (val.includes("Initiate")) {
                user_data.package = "AI Consultancy";
                state = "FORM_NAME";
                setTimeout(() => addMsg("Initiating AI Intake. What is your <strong>Full Name</strong>?"), 400);
            } else {
                state = "ROOT";
                handleInput("Back");
            }
        } else if (state === "FORM_NAME") {
            user_data.name = val;
            state = "FORM_EMAIL";
            addMsg("Thank you. What is your <strong>Best Email</strong> for the formal proposal?", false);
        } else if (state === "FORM_EMAIL") {
            user_data.email = val;
            state = "COMPLETE";
            addMsg("Data synchronized. I am delivering your brief to the Architect now.", false);
            setTimeout(() => addMsg("Intake Complete. Priscilla will reach out within 24 hours. Látom. 🙏", false), 800);
            opt.innerHTML = '';
        }
    }

    t.onclick = () => {
        w.style.display = w.style.display === 'none' ? 'flex' : 'none';
        if (m.innerHTML === '') {
            addMsg("Greetings. I am Sierra. Select a path to evolve your infrastructure:");
            showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
        }
    };
    c.onclick = () => w.style.display = 'none';
    s.onclick = () => { const val = i.value.trim(); if (val) handleInput(val); i.value = ''; };
    i.onkeypress = (e) => { if (e.key === 'Enter') s.click(); };
})();