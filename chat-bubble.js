(function() {
    const container = document.createElement('div');
    container.id = 'prisca-chat-widget';
    container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif;";

    container.innerHTML = `
        <button id="chat-toggle" style="background: #301934; border: none; width: 65px; height: 65px; border-radius: 50%; cursor: pointer; box-shadow: 0 8px 32px rgba(48,25,52,0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
        <div id="chat-window" style="display: none; position: absolute; bottom: 85px; right: 0; width: 380px; max-height: 540px; background: #ffffff; border-radius: 20px; flex-direction: column; box-shadow: 0 12px 48px rgba(0,0,0,0.2); overflow: hidden; border: 1px solid rgba(48,25,52,0.1);">
            <div style="background: #301934; color: white; padding: 18px 20px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 9px; height: 9px; background: #00FF00; border-radius: 50%; box-shadow: 0 0 6px #00FF00;"></div>
                    <div>
                        <div style="font-size: 0.95rem; font-weight: 700;">Virtual Assistant</div>
                        <div style="font-size: 0.72rem; opacity: 0.6; font-weight: 400;">Online — here to help</div>
                    </div>
                </div>
                <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:22px; opacity:0.7; line-height:1;">&times;</button>
            </div>
            <div id="chat-messages" style="flex: 1; padding: 18px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #fafafa; max-height: 340px;"></div>
            <div id="chat-options" style="padding: 10px 16px 6px; display: flex; flex-wrap: wrap; gap: 8px; background: #ffffff; border-top: 1px solid #f0f0f0;"></div>
            <div style="padding: 12px 16px 16px; background: #ffffff;">
                <div style="font-size: 0.7rem; color: #aaa; text-align: center; letter-spacing: 0.04em;">Powered by Prisca Dezigns</div>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    const t = document.getElementById('chat-toggle'),
          w = document.getElementById('chat-window'),
          cl = document.getElementById('close-chat'),
          m = document.getElementById('chat-messages'),
          opt = document.getElementById('chat-options');

    // ── FAQ KNOWLEDGE BASE ─────────────────────────────────────────
    // Client fills in BUSINESS_INFO before deploying
    const BUSINESS_INFO = {
        name:     'Your Business',
        tagline:  'Here to help you.',
        hours:    'Monday – Friday, 9am – 5pm',
        location: 'Your City, Your Country',
        contact:  'Contact us via the form on this page.',
        services: 'We offer a range of professional services tailored to your needs. Use the menu above to explore.',
        about:    'We are a dedicated team focused on delivering quality results for every client.',
        returns:  'We stand behind our work. Reach out and we will make it right.',
    };

    function addMsg(txt, isUser) {
        const d = document.createElement('div');
        d.innerHTML = txt;
        d.style.cssText = `
            padding: 11px 15px;
            border-radius: 14px;
            font-size: 0.88rem;
            line-height: 1.55;
            max-width: 88%;
            align-self: ${isUser ? 'flex-end' : 'flex-start'};
            background: ${isUser ? '#301934' : '#ffffff'};
            color: ${isUser ? 'white' : '#333'};
            box-shadow: 0 1px 4px rgba(0,0,0,0.07);
            border: ${isUser ? 'none' : '1px solid #eeeeee'};
        `;
        m.appendChild(d);
        m.scrollTop = m.scrollHeight;
    }

    function showOptions(options) {
        opt.innerHTML = '';
        options.forEach(o => {
            const b = document.createElement('button');
            b.innerText = o;
            b.style.cssText = "padding: 8px 14px; border: 1.5px solid #301934; border-radius: 100px; background: white; color: #301934; cursor: pointer; font-size: 0.78rem; font-weight: 700; transition: all 0.2s; margin-bottom: 6px;";
            b.onmouseover = () => { b.style.background = '#301934'; b.style.color = 'white'; };
            b.onmouseout  = () => { b.style.background = 'white';   b.style.color = '#301934'; };
            b.onclick = () => handleSelect(o);
            opt.appendChild(b);
        });
    }

    const MENU = [
        '🕐 Hours',
        '📍 Location',
        '💼 Services',
        '👋 About Us',
        '📞 How to Contact',
    ];

    function showMenu() {
        setTimeout(() => {
            addMsg("Hi there! 👋 I'm here to answer quick questions. What would you like to know?");
            showOptions(MENU);
        }, 300);
    }

    function handleSelect(val) {
        addMsg(val, true);
        opt.innerHTML = '';

        setTimeout(() => {
            if (val.includes('Hours')) {
                addMsg("⏰ <strong>Our Hours</strong><br>" + BUSINESS_INFO.hours);
            } else if (val.includes('Location')) {
                addMsg("📍 <strong>Where We Are</strong><br>" + BUSINESS_INFO.location);
            } else if (val.includes('Services')) {
                addMsg("💼 <strong>What We Do</strong><br>" + BUSINESS_INFO.services);
            } else if (val.includes('About')) {
                addMsg("👋 <strong>About Us</strong><br>" + BUSINESS_INFO.about);
            } else if (val.includes('Contact')) {
                addMsg("📞 <strong>Get in Touch</strong><br>" + BUSINESS_INFO.contact);
            }
            setTimeout(() => {
                addMsg("Anything else I can help with?");
                showOptions([...MENU, '✅ That's all, thanks!']);
            }, 600);
        }, 380);
    }

    t.onclick = () => {
        const open = w.style.display === 'none' || w.style.display === '';
        w.style.display = open ? 'flex' : 'none';
        if (open && m.innerHTML === '') showMenu();
    };
    cl.onclick = () => { w.style.display = 'none'; };

})();
