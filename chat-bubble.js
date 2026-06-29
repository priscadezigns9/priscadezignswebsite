(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif;";
    
    container.innerHTML = `
        <button id="chat-toggle" style="background: #301934; border: none; width: 65px; height: 65px; border-radius: 50%; cursor: pointer; box-shadow: 0 8px 32px rgba(48,25,52,0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
        <div id="chat-window" style="display: none; position: absolute; bottom: 85px; right: 0; width: 400px; height: 620px; background: #FFFFF0; border-radius: 20px; flex-direction: column; box-shadow: 0 12px 48px rgba(0,0,0,0.25); overflow: hidden; border: 1px solid rgba(48,25,52,0.1); transition: all 0.3s ease;">
            <div style="background: #301934; color: white; padding: 20px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 10px; height: 10px; background: #00FF00; border-radius: 50%; box-shadow: 0 0 8px #00FF00;"></div>
                    <span>SIERRA | Neural Scout</span>
                </div>
                <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:24px; opacity: 0.8;">&times;</button>
            </div>
            <div id="chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: #ffffff;"></div>
            <div id="chat-options" style="padding: 10px 20px; display: flex; flex-wrap: wrap; gap: 8px; background: #ffffff; border-top: 1px solid #f0f0f0;"></div>
            <div style="padding: 20px; border-top: 1px solid #eee; display: flex; gap: 10px; background: #ffffff;">
                <input type="text" id="user-input" placeholder="Type only for custom requests..." style="flex: 1; padding: 12px 15px; border: 1px solid #e0e0e0; border-radius: 12px; outline: none; font-size: 0.95rem;">
                <button id="send-btn" style="background: #301934; color: white; border: none; padding: 0 20px; border-radius: 12px; cursor: pointer; font-weight: 600;">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);

    const t = document.getElementById('chat-toggle'), w = document.getElementById('chat-window'), c = document.getElementById('close-chat'), i = document.getElementById('user-input'), s = document.getElementById('send-btn'), m = document.getElementById('chat-messages'), opt = document.getElementById('chat-options');
    
    let state = 'ROOT';
    let user_data = {};

    const PKG_CONFIG = {
        'Starter': { setup: '$397', pulse: '$97/mo', desc: 'Basic Brand Identity' },
        'Growth': { setup: '$897', pulse: '$197/mo', desc: 'Active Scaling' },
        'Trusted': { setup: '$1,200', pulse: '$297/mo', desc: 'High-Fidelity Authority' },
        'E-Starter': { setup: '$597', pulse: '$147/mo', desc: 'Core E-Commerce' },
        'E-Growth': { setup: '$1,297', pulse: '$347/mo', desc: 'Sales Engine' },
        'E-Trusted': { setup: '$2,500', pulse: '$497/mo', desc: 'Enterprise Commerce' },
        'Branding': { setup: '$500', pulse: 'N/A', desc: 'Neural Identity' },
        'Brand Scan': { setup: '$19', pulse: 'N/A', desc: 'Deep-Audit' }
    };

    function addMsg(txt, u) {
        const d = document.createElement('div');
        d.innerHTML = txt;
        d.style.cssText = `padding:12px 16px; border-radius:15px; font-size:0.95rem; line-height:1.5; max-width:85%; align-self:${u?'flex-end':'flex-start'}; background:${u?'#301934':'#f1f1f1'}; color:${u?'white':'#333'}; box-shadow: 0 2px 4px rgba(0,0,0,0.05);`;
        m.appendChild(d); m.scrollTop = m.scrollHeight;
    }

    function showOptions(options) {
        opt.innerHTML = '';
        options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o;
            b.style.cssText = "padding: 10px 18px; border: 1.5px solid #301934; border-radius: 12px; background: white; color: #301934; cursor: pointer; font-size: 0.85rem; font-weight: 700; transition: all 0.2s;";
            b.onmouseover = () => { b.style.background = '#301934'; b.style.color = 'white'; };
            b.onmouseout = () => { b.style.background = 'white'; b.style.color = '#301934'; };
            b.onclick = () => handleInput(o);
            opt.appendChild(b);
        });
    }

    function resetToRoot() {
        state = 'ROOT';
        addMsg("Greetings. I am Sierra. Select a path to evolve your infrastructure:");
        showOptions(['1. 🌐 Websites', '2. 🧠 AI Consultancy', '3. 🎨 Branding', '4. 🔍 Brand Scan']);
    }

    function handleInput(val) {
        const low = val.toLowerCase();
        if (state !== 'FORM_NAME' && state !== 'FORM_EMAIL') addMsg(val, true);
        
        if (low.includes('back') || low === '0') {
            resetToRoot();
            return;
        }

        if (state === 'ROOT') {
            if (low.includes('website') || low === '1') {
                state = 'WEBSITE_PATH';
                setTimeout(() => {
                    addMsg("Select your Website Architectural tier:");
                    showOptions(['Starter', 'Growth', 'Trusted', 'E-Commerce', 'Custom Site', 'Back']);
                }, 400);
            } else if (low.includes('ai') || low === '2') {
                state = 'AI_PATH';
                setTimeout(() => {
                    addMsg("AI Consultancy: <strong>Small Biz ($8k)</strong> | <strong>Enterprise ($60k)</strong>. Which tier are we targeting?");
                    showOptions(['Small Business ($8k)', 'Enterprise ($60k)', 'Back']);
                }, 400);
            } else if (low.includes('branding') || low === '3') {
                user_data.package = 'Branding';
                state = 'FORM_NAME';
                setTimeout(() => {
                    addMsg("Selected: <strong>Branding</strong> ($500 Setup · One-time). Ready to begin? What is your <strong>Full Name</strong>?");
                    showOptions(['⬅ Back']);
                }, 400);
            } else if (low.includes('scan') || low === '4') {
                user_data.package = 'Brand Scan';
                state = 'SCAN_DOMAIN';
                setTimeout(() => {
                    addMsg("🔍 <strong>Brand Scan</strong> — Deep Audit ($19).<br><br>Enter your existing domain below so we can run the diagnostic:");
                    showOptions(['⬅ Back']);
                    i.placeholder = 'e.g. yourbusiness.com';
                    i.focus();
                }, 400);
            }
        } else if (state === 'WEBSITE_PATH') {
            if (val === 'E-Commerce') {
                setTimeout(() => {
                    addMsg("Select your E-Commerce tier:");
                    showOptions(['E-Starter', 'E-Growth', 'E-Trusted', 'Back']);
                }, 400);
            } else if (val === 'Custom Site') {
                state = 'FORM_NAME';
                setTimeout(() => {
                    addMsg("For custom builds, I need your details. What is your <strong>Full Name</strong>?");
                    showOptions(['⬅ Back']);
                }, 400);
            } else if (PKG_CONFIG[val]) {
                user_data.package = val;
                state = 'FORM_NAME';
                const pkg = PKG_CONFIG[val];
                setTimeout(() => {
                    addMsg(`Selected: <strong>${val}</strong><br>Setup: <strong>${pkg.setup}</strong><br>Pulse: <strong>${pkg.pulse}</strong><br><br>Ready to secure this build. What is your <strong>Full Name</strong>?`);
                    showOptions(['⬅ Back']);
                }, 400);
            }
        } else if (state === 'SCAN_DOMAIN') {
            if (val === '⬅ Back') { resetToRoot(); return; }
            user_data.domain = val;
            i.placeholder = 'Type only for custom requests...';
            setTimeout(() => {
                addMsg("Domain locked: <strong>" + val + "</strong>. Running your Brand Scan now — click below to see your live results 👇");
                const scanUrl = 'https://priscadezigns.org/scan/?domain=' + encodeURIComponent(val);
                showOptions(['⬅ Back']);
                const linkEl = document.createElement('div');
                linkEl.style.cssText = 'padding:10px 0;';
                linkEl.innerHTML = '<a href="' + scanUrl + '" target="_blank" style="display:inline-block;background:#301934;color:white;padding:12px 24px;border-radius:10px;font-weight:700;text-decoration:none;font-size:0.85rem;letter-spacing:1px;">🔍 Open My Brand Scan →</a>';
                document.getElementById('chat-messages').appendChild(linkEl);
                document.getElementById('chat-messages').scrollTop = 99999;
            }, 400);
        } else if (state === 'AI_PATH') {
            if (val === 'Back') { resetToRoot(); return; }
            user_data.package = 'AI Consultancy - ' + val;
            state = 'FORM_NAME';
            setTimeout(() => {
                addMsg(`Targeting <strong>${val}</strong>. Shall we initiate the intake? What is your <strong>Full Name</strong>?`);
                showOptions(['⬅ Back']);
            }, 400);
        } else if (state === 'FORM_NAME') {
            if (val === '⬅ Back') { resetToRoot(); return; }
            user_data.name = val;
            state = 'FORM_EMAIL';
            addMsg("Thank you. What is your <strong>Best Email</strong> for the formal proposal?", false);
        } else if (state === 'FORM_EMAIL') {
            user_data.email = val;
            state = 'COMPLETE';
            addMsg("Data synchronized. Delivering your brief to the Architect now...", false);

            // ── Silent backend POST via Formsubmit ──────────────
            fetch('https://formsubmit.co/ajax/priscillanarine@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name:    user_data.name    || '',
                    email:   user_data.email   || '',
                    package: user_data.package || '',
                    domain:  user_data.domain  || '',
                    source:  window.location.hostname || 'priscadezigns.org',
                    _subject: '🔥 New Lead: ' + (user_data.name || 'Unknown') + ' — ' + (user_data.package || 'General')
                })
            }).catch(function() {});
            // ────────────────────────────────────────────────────

            setTimeout(() => addMsg("Intake complete. Priscilla will reach out within 24 hours. Látom. 🙏", false), 800);
            setTimeout(() => resetToRoot(), 4000);
        }
    }

    t.onclick = () => {
        w.style.display = w.style.display === 'none' ? 'flex' : 'none';
        if (m.innerHTML === '') resetToRoot();
    };
    c.onclick = () => w.style.display = 'none';
    s.onclick = () => { const val = i.value.trim(); if (val) handleInput(val); i.value = ''; };
    i.onkeypress = (e) => { if (e.key === 'Enter') s.click(); };
})();
