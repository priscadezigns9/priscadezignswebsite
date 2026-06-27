(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    // Shifted even further right and adjusted bottom to ensure zero overlap with center dot nav
    container.style.cssText = "position: fixed; bottom: 30px; right: 30px; z-index: 10000; font-family: 'Inter', -apple-system, sans-serif;";
    
    container.innerHTML = `
        <button id="chat-toggle" style="background: #301934; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 10px 25px rgba(48,25,52,0.4); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; border: 1px solid rgba(255,255,240,0.1);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
        <div id="chat-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 380px; height: 600px; background: rgba(255, 255, 240, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid rgba(48,25,52,0.1); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);">
            <div style="background: #301934; color: white; padding: 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.5px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 8px; height: 8px; background: #00FF00; border-radius: 50%; box-shadow: 0 0 10px #00FF00;"></div>
                    <span style="font-size: 0.9rem; opacity: 0.9;">SIERRA | NEURAL SCOUT</span>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <button id="chat-back" style="background:none; border:none; color:white; cursor:pointer; font-size:12px; font-weight:600; opacity: 0.7; text-transform: uppercase; display: none;">Back</button>
                    <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:24px; opacity: 0.7; line-height: 1;">&times;</button>
                </div>
            </div>
            <div id="chat-messages" style="flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; scroll-behavior: smooth;"></div>
            <div id="chat-options" style="padding: 16px 24px; display: flex; flex-wrap: wrap; gap: 10px; background: transparent; border-top: 1px solid rgba(48,25,52,0.05);"></div>
            <div style="padding: 20px 24px; border-top: 1px solid rgba(48,25,52,0.05); display: flex; gap: 12px; background: rgba(255, 255, 240, 0.5);">
                <input type="text" id="user-input" placeholder="Type custom request..." style="flex: 1; padding: 12px 16px; border: 1px solid rgba(48,25,52,0.1); border-radius: 14px; outline: none; font-size: 0.9rem; background: white;">
                <button id="send-btn" style="background: #301934; color: white; border: none; padding: 0 18px; border-radius: 14px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);

    const t = document.getElementById('chat-toggle'), 
          w = document.getElementById('chat-window'), 
          c = document.getElementById('close-chat'), 
          b = document.getElementById('chat-back'),
          i = document.getElementById('user-input'), 
          s = document.getElementById('send-btn'), 
          m = document.getElementById('chat-messages'), 
          opt = document.getElementById('chat-options');
    
    let state = 'ROOT';
    let history = []; // Track state history for back button
    let user_data = {};

    const PKG_CONFIG = {
        'Starter': { setup: '$297', pulse: '$97/mo', desc: 'Basic Brand Identity' },
        'Growth': { setup: '$597', pulse: '$97/mo', desc: 'Active Scaling' },
        'Trusted': { setup: '$1,200', pulse: '$97/mo', desc: 'High-Fidelity Authority' },
        'E-Starter': { setup: '$497', pulse: '$97/mo', desc: 'E-Comm Framework' },
        'E-Growth': { setup: '$1,497', pulse: '$97/mo', desc: 'Sales Engine' },
        'E-Trusted': { setup: '$2,500', pulse: '$97/mo', desc: 'Enterprise Commerce' },
        'AI Consultancy': { setup: '$8,000', pulse: '$1,500/mo', desc: 'Neural Ecosystem' }
    };

    function addMsg(txt, u) {
        const d = document.createElement('div');
        d.innerHTML = txt;
        d.style.cssText = `padding:14px 18px; border-radius:${u?'18px 18px 2px 18px':'18px 18px 18px 2px'}; font-size:0.9rem; line-height:1.5; max-width:82%; align-self:${u?'flex-end':'flex-start'}; background:${u?'#301934':'#ffffff'}; color:${u?'white':'#333'}; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid rgba(48,25,52,${u?'0':'0.05'});`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function showOptions(options) {
        opt.innerHTML = '';
        options.forEach(o => {
            const btn = document.createElement('button');
            btn.innerText = o;
            btn.style.cssText = "padding: 10px 20px; border: 1.5px solid #301934; border-radius: 14px; background: transparent; color: #301934; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s ease;";
            btn.onmouseover = () => { btn.style.background = '#301934'; btn.style.color = 'white'; };
            btn.onmouseout = () => { btn.style.background = 'transparent'; btn.style.color = '#301934'; };
            btn.onclick = () => handleInput(o);
            opt.appendChild(btn);
        });
    }

    function handleInput(val) {
        if (val !== 'Back' && state !== 'FORM_NAME' && state !== 'FORM_EMAIL') {
            addMsg(val, true);
            history.push(state);
            b.style.display = 'block';
        }
        
        const low = val.toLowerCase();

        if (val === 'Back') {
            state = history.pop() || 'ROOT';
            if (state === 'ROOT') b.style.display = 'none';
            m.innerHTML = ''; // Clear for fresh context or keep history? Let's refresh view.
            if (state === 'ROOT') {
                addMsg("Greetings. I am Sierra. Select a path to evolve your infrastructure:");
                showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
            } else if (state === 'WEBSITE_PATH') {
                addMsg("Select your Website Architectural tier:");
                showOptions(['Starter', 'Growth', 'Trusted', 'E-Commerce', 'Custom Site']);
            
        } else if (state === 'BRANDING_PATH') {
            if (val === 'Back') { handleInput('Back'); return; }
            user_data.package = 'Branding: ' + val;
            state = 'FORM_NAME';
            setTimeout(() => addMsg("Genesis initiated. What is your <strong>Full Name</strong>?"), 400);
        } else if (state === 'CUSTOM_FEATURES') {
            if (val === 'Done Selecting') {
                state = 'FORM_NAME';
                addMsg("Architecting custom quote for: " + (user_data.features || 'Standard Custom'), false);
                setTimeout(() => addMsg("What is your <strong>Full Name</strong>?"), 400);
            } else {
                user_data.features = (user_data.features || '') + val + ', ';
                addMsg(val + " added to architecture.", false);
            }
} else if (state === 'AI_PATH') {
                addMsg("AI Consultancy provides a full-scale neural ecosystem designed to eliminate operational friction ($8k). Shall we proceed?");
                showOptions(['Yes, Initiate AI Intake', 'Back to Main']);
            }
            return;
        }
        
        if (state === 'ROOT') {
            if (low.includes('scan') || low === '4') { 
                state = 'BRAND_SCAN'; 
                setTimeout(() => { addMsg('Initiating high-fidelity Brand Scan. What is the URL or social handle to audit?'); opt.innerHTML = ''; }, 400); 
            } else if (low.includes('website') || low === '1') {
                state = 'WEBSITE_PATH';
                setTimeout(() => {
                    addMsg("Select your Website Architectural tier:");
                    showOptions(['Starter', 'Growth', 'Trusted', 'E-Commerce', 'Custom Site']);
                }, 400);
            } else if (low.includes('ai') || low === '2') {
                state = 'AI_PATH';
                setTimeout(() => {
                    addMsg("AI Consultancy provides a full-scale neural ecosystem designed to eliminate operational friction ($8k). Shall we proceed?");
                    showOptions(['Yes, Initiate AI Intake', 'Back to Main']);
                }, 400);
            }
        } else if (state === 'BRAND_SCAN') { 
            user_data.target = val; 
            state = 'FORM_NAME'; 
            setTimeout(() => { addMsg('Target identified. I need to deliver the diagnostic report to the Architect. What is your <strong>Full Name</strong>?'); }, 800); 
        } else if (state === 'WEBSITE_PATH') {
            if (val === 'E-Commerce') {
                setTimeout(() => {
                    addMsg("Select your E-Commerce architectural tier:");
                    showOptions(['E-Starter', 'E-Growth', 'E-Trusted']);
                }, 400);
            } else if (val === 'Custom Site') { state = 'CUSTOM_FEATURES'; user_data.package = 'Custom Site Build'; setTimeout(() => { addMsg('Custom builds are architected module-by-module. Select the features required:'); showOptions(['AI Chatbot', 'Blog', 'Social Sync', 'TikTok', 'Payment Modal', 'Membership', 'Calendar/Booking', 'Copywriting', 'Visual Assets', 'Done Selecting']); }, 400);
            } else {
                user_data.package = val;
                state = 'FORM_NAME';
                const pkg = PKG_CONFIG[val];
                setTimeout(() => {
                    addMsg(`Tier: <strong>${val}</strong><br>Setup: <strong>${pkg.setup}</strong><br>Ready to secure this build. What is your <strong>Full Name</strong>?`);
                    opt.innerHTML = '';
                }, 400);
            }
        
        } else if (state === 'BRANDING_PATH') {
            if (val === 'Back') { handleInput('Back'); return; }
            user_data.package = 'Branding: ' + val;
            state = 'FORM_NAME';
            setTimeout(() => addMsg("Genesis initiated. What is your <strong>Full Name</strong>?"), 400);
        } else if (state === 'CUSTOM_FEATURES') {
            if (val === 'Done Selecting') {
                state = 'FORM_NAME';
                addMsg("Architecting custom quote for: " + (user_data.features || 'Standard Custom'), false);
                setTimeout(() => addMsg("What is your <strong>Full Name</strong>?"), 400);
            } else {
                user_data.features = (user_data.features || '') + val + ', ';
                addMsg(val + " added to architecture.", false);
            }
} else if (state === 'AI_PATH') {
            if (val.includes('Initiate')) {
                user_data.package = 'AI Consultancy';
                state = 'FORM_NAME';
                setTimeout(() => addMsg("Initiating AI Intake. What is your <strong>Full Name</strong>?"), 400);
            } else {
                handleInput('Back');
            }
        } else if (state === 'FORM_NAME') {
            user_data.name = val;
            state = 'FORM_EMAIL';
            addMsg("Thank you. What is your <strong>Best Email</strong> for the formal proposal?");
        } else if (state === 'FORM_EMAIL') {
            user_data.email = val;
            state = 'COMPLETE';
            addMsg("Data synchronized. Delivering brief to the Architect now.");
            setTimeout(() => addMsg("Intake Complete. The Architect has been notified. Priscilla will reach out within 24 hours. 🙏", false), 800);
            opt.innerHTML = '';
            b.style.display = 'none';
        }
    }

    t.onclick = () => {
        w.style.display = w.style.display === 'none' ? 'flex' : 'none';
        t.style.transform = w.style.display === 'none' ? 'scale(1)' : 'scale(0.9) rotate(90deg)';
        if (m.innerHTML === '') {
            addMsg("Greetings. I am Sierra. Select a path to evolve your infrastructure:");
            showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
        }
    };
    c.onclick = () => { w.style.display = 'none'; t.style.transform = 'scale(1)'; };
    b.onclick = () => handleInput('Back');
    s.onclick = () => { const val = i.value.trim(); if (val) handleInput(val); i.value = ''; };
    i.onkeypress = (e) => { if (e.key === 'Enter') s.click(); };
})();
