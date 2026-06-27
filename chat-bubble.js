(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    container.style.cssText = 'position: fixed; bottom: 160px; right: 40px; z-index: 10000; font-family: "Inter", -apple-system, sans-serif;';
    
    container.innerHTML = `
        <button id='chat-toggle' style='background: #301934; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 10px 25px rgba(48,25,52,0.4); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;'>
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
        </button>
        <div id='chat-window' style='display: none; position: absolute; bottom: 80px; right: 0; width: 380px; height: 600px; background: rgba(255, 255, 240, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; flex-direction: column; box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; border: 1px solid rgba(48,25,52,0.1);'>
            <div style='background: #301934; color: white; padding: 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;'>
                <div style='display: flex; align-items: center; gap: 12px;'>
                    <div style='width: 8px; height: 8px; background: #00FF00; border-radius: 50%; box-shadow: 0 0 10px #00FF00;'></div>
                    <span style='font-size: 0.9rem; opacity: 0.9;'>SIERRA | NEURAL SCOUT</span>
                </div>
                <div style='display: flex; gap: 15px; align-items: center;'>
                    <button id='chat-back' style='background:none; border:none; color:white; cursor:pointer; font-size:12px; font-weight:600; opacity: 0.7; text-transform: uppercase; display: none;'>Back</button>
                    <button id='close-chat' style='background:none; border:none; color:white; cursor:pointer; font-size:24px; opacity: 0.7;'>&times;</button>
                </div>
            </div>
            <div id='chat-messages' style='flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;'></div>
            <div id='chat-options' style='padding: 16px 24px; display: flex; flex-wrap: wrap; gap: 10px;'></div>
            <div style='padding: 20px 24px; border-top: 1px solid rgba(48,25,52,0.05); display: flex; gap: 12px;'>
                <input type='text' id='user-input' placeholder='Type custom request...' style='flex: 1; padding: 12px 16px; border: 1px solid rgba(48,25,52,0.1); border-radius: 14px;'>
                <button id='send-btn' style='background: #301934; color: white; border: none; padding: 0 18px; border-radius: 14px;'>Send</button>
            </div>
        </div>`;
    
    document.body.appendChild(container);
    const t = document.getElementById('chat-toggle'), w = document.getElementById('chat-window'), c = document.getElementById('close-chat'), b = document.getElementById('chat-back'), i = document.getElementById('user-input'), s = document.getElementById('send-btn'), m = document.getElementById('chat-messages'), opt = document.getElementById('chat-options');
    let state = 'ROOT', user_data = {};

    const PKG_CONFIG = {
        'Starter': { setup: '97', pulse: '7/mo' }, 'Growth': { setup: '97', pulse: '7/mo' }, 'Trusted': { setup: ',200', pulse: '7/mo' },
        'E-Starter': { setup: '97', pulse: '7/mo' }, 'E-Growth': { setup: ',497', pulse: '7/mo' }, 'E-Trusted': { setup: ',500', pulse: '7/mo' },
        'AI Consultancy': { setup: ',000', pulse: ',500/mo' }
    };

    function addMsg(txt, u) {
        const d = document.createElement('div'); d.innerHTML = txt;
        d.style.cssText = 'padding:14px 18px; border-radius:' + (u ? '18px 18px 2px 18px' : '18px 18px 18px 2px') + '; font-size:0.9rem; max-width:82%; align-self:' + (u ? 'flex-end' : 'flex-start') + '; background:' + (u ? '#301934' : '#ffffff') + '; color:' + (u ? 'white' : '#333') + '; box-shadow: 0 4px 15px rgba(0,0,0,0.05);';
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function showOptions(options) {
        opt.innerHTML = '';
        options.forEach(o => {
            const btn = document.createElement('button'); btn.innerText = o;
            btn.style.cssText = 'padding: 10px 20px; border: 1.5px solid #301934; border-radius: 14px; background: transparent; color: #301934; cursor: pointer; font-size: 0.85rem; font-weight: 700;';
            btn.onclick = () => handleInput(o); opt.appendChild(btn);
        });
    }

    function handleInput(val) {
        opt.innerHTML = '';
        if (val === 'Back') {
            state = 'ROOT'; b.style.display = 'none';
            addMsg('Returning to main menu.', false);
            showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
            return;
        }
        addMsg(val, true); b.style.display = 'block';
        const low = val.toLowerCase();

        if (state === 'ROOT') {
            if (low.includes('branding') || low === '3') {
                state = 'BRANDING_PATH';
                addMsg('Branding is the genesis of your identity. Select your starting point:', false);
                showOptions(['Brand Identity (New)', 'Brand Refresh (Existing)', 'Back']);
            } else if (low.includes('web') || low === '1') {
                state = 'WEBSITE_PATH';
                addMsg('Select your Website Architectural tier:', false);
                showOptions(['Starter', 'Growth', 'Trusted', 'E-Commerce', 'Custom Site', 'Back']);
            } else if (low.includes('ai') || low === '2') {
                state = 'AI_PATH';
                addMsg('AI Consultancy provides a full-scale neural ecosystem (,000). Shall we proceed?', false);
                showOptions(['Yes, Initiate AI Intake', 'Back']);
            } else if (low.includes('scan') || low === '4') {
                state = 'BRAND_SCAN';
                addMsg('Initiating Brand Scan. What is the URL or handle?', false);
            }
        } else if (state === 'BRANDING_PATH') {
            user_data.package = 'Branding: ' + val; state = 'FORM_NAME';
            addMsg('Genesis initiated. What is your <strong>Full Name</strong>?', false);
        } else if (state === 'WEBSITE_PATH') {
            if (val === 'E-Commerce') {
                addMsg('Select your E-Commerce tier:', false);
                showOptions(['E-Starter', 'E-Growth', 'E-Trusted', 'Back']);
            } else if (val === 'Custom Site') {
                state = 'CUSTOM_FEATURES';
                addMsg('Custom builds are modular. Select features:', false);
                showOptions(['AI Chatbot', 'Blog', 'Social Sync', 'TikTok', 'Payment Modal', 'Membership', 'Calendar', 'Copywriting', 'Visual Assets', 'Done Selecting']);
            } else {
                user_data.package = val; state = 'FORM_NAME';
                const pkg = PKG_CONFIG[val];
                addMsg('Tier: <strong>' + val + '</strong><br>Setup: <strong>' + pkg.setup + '</strong><br>What is your <strong>Full Name</strong>?', false);
            }
        } else if (state === 'CUSTOM_FEATURES') {
            if (val === 'Done Selecting') {
                state = 'FORM_NAME';
                addMsg('Architecture captured. What is your <strong>Full Name</strong>?', false);
            } else {
                user_data.features = (user_data.features || '') + val + ', ';
                addMsg(val + ' added.', false);
                showOptions(['AI Chatbot', 'Blog', 'Social Sync', 'TikTok', 'Payment Modal', 'Membership', 'Calendar', 'Copywriting', 'Visual Assets', 'Done Selecting']);
            }
        } else if (state === 'AI_PATH') {
            user_data.package = 'AI Consultancy'; state = 'FORM_NAME';
            addMsg('Initiating AI Intake. What is your <strong>Full Name</strong>?', false);
        } else if (state === 'BRAND_SCAN') {
            user_data.target = val; state = 'FORM_NAME';
            addMsg('Target identified. What is your <strong>Full Name</strong>?', false);
        } else if (state === 'FORM_NAME') {
            user_data.name = val; state = 'FORM_EMAIL';
            addMsg('Thank you. What is your <strong>Best Email</strong>?', false);
        } else if (state === 'FORM_EMAIL') {
            user_data.email = val; state = 'COMPLETE';
            addMsg('The Architect has been notified. Priscilla will reach out within 24 hours. 🙏', false);
        }
    }

    t.onclick = () => {
        w.style.display = w.style.display === 'none' ? 'flex' : 'none';
        if (m.innerHTML === '') {
            addMsg('Greetings. I am Sierra. Select a path:', false);
            showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
        }
    };
    c.onclick = () => { w.style.display = 'none'; };
    b.onclick = () => handleInput('Back');
    s.onclick = () => { const val = i.value.trim(); if (val) handleInput(val); i.value = ''; };
    i.onkeypress = (e) => { if (e.key === 'Enter') s.click(); };
})();