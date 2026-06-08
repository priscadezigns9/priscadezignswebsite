(function() {
    const MODAL_ID = 'pm-payment-modal-overlay';
    
    const modalHTML = `
        <div id="${MODAL_ID}" class="pm-overlay">
            <div class="pm-modal">
                <button class="pm-close" id="pm-modal-close">&times;</button>
                
                <div class="pm-header">
                    <div class="pm-product-name" id="pm-display-product-name">Product Name</div>
                    <div class="pm-price" id="pm-display-price">$0.00</div>
                </div>
                
                <div class="pm-body">
                    <!-- PayPal Container -->
                    <div id="pm-paypal-button-container"></div>
                    <button class="pm-method-btn pm-btn-paypal" id="pm-trigger-paypal">
                        <svg class="pm-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 21L7.9 15H5L7 3H15.5C18.5 3 20.5 5 20.5 8C20.5 9.5 20 11 19 12.2C18 13.5 16.5 14.5 14.5 14.5H12.5L11.5 21H7Z"/></svg>
                        Pay with PayPal
                    </button>

                    <!-- Payoneer Link -->
                    <a href="#" target="_blank" class="pm-method-btn pm-btn-payoneer" id="pm-link-payoneer">
                        <svg class="pm-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"/></svg>
                        Pay with Payoneer
                    </a>

                    <!-- Crypto Section -->
                    <button class="pm-method-btn pm-btn-crypto" id="pm-trigger-crypto">
                        <svg class="pm-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h2v-2h-2zm0-4v2h2V7h-2zm0 8v2h2v-2h-2z"/></svg>
                        Pay with Crypto
                    </button>
                    
                    <div class="pm-crypto-section" id="pm-crypto-details">
                        <div class="pm-qr-wrapper" id="pm-qrcode"></div>
                        <div class="pm-address-wrapper">
                            <span class="pm-address-text" id="pm-wallet-address">0x...</span>
                            <button class="pm-copy-btn" id="pm-copy-address">Copy</button>
                        </div>
                        <div class="pm-crypto-info">
                            <div class="pm-crypto-network">Network: ERC-20 (Ethereum)</div>
                            <div class="pm-crypto-warning">Warning: Send only ERC-20 compatible tokens to this address.</div>
                        </div>
                    </div>
                </div>
                
                <div class="pm-footer">
                    <div class="pm-trust-badge">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0L0 3.11111V7.11111C0 11.5289 2.98667 15.6533 7 16C11.0133 15.6533 14 11.5289 14 7.11111V3.11111L7 0ZM12.4444 7.11111C12.4444 10.6667 10.1244 13.9733 7 14.2222C3.87556 13.9733 1.55556 10.6667 1.55556 7.11111V4.18667L7 1.76889L12.4444 4.18667V7.11111Z" fill="#10B981"/><path d="M10.1111 5.33333L6.22222 9.22222L3.88889 6.88889L2.88889 7.88889L6.22222 11.2222L11.1111 6.33333L10.1111 5.33333Z" fill="#10B981"/></svg>
                        Secure Encrypted Payment
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const overlay = document.getElementById(MODAL_ID);
    const closeBtn = document.getElementById('pm-modal-close');
    const cryptoBtn = document.getElementById('pm-trigger-crypto');
    const cryptoSection = document.getElementById('pm-crypto-details');
    const copyBtn = document.getElementById('pm-copy-address');
    const paypalTrigger = document.getElementById('pm-trigger-paypal');
    const paypalContainer = document.getElementById('pm-paypal-button-container');

    let currentConfig = {};

    function closePaymentModal() {
        overlay.classList.remove('active');
        cryptoSection.classList.remove('active');
        paypalContainer.classList.remove('active');
        paypalTrigger.style.display = 'flex';
        // Clear QR code to prevent duplication next time
        document.getElementById('pm-qrcode').innerHTML = '';
    }

    closeBtn.onclick = closePaymentModal;
    overlay.onclick = (e) => { if(e.target === overlay) closePaymentModal(); };

    // Toggle Crypto Section
    cryptoBtn.onclick = () => {
        const isActive = cryptoSection.classList.contains('active');
        if (!isActive) {
            cryptoSection.classList.add('active');
            generateQRCode(currentConfig.cryptoAddress);
        } else {
            cryptoSection.classList.remove('active');
        }
    };

    // Copy Address
    copyBtn.onclick = () => {
        const addr = currentConfig.cryptoAddress;
        navigator.clipboard.writeText(addr).then(() => {
            copyBtn.innerText = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerText = 'Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    };

    // Handle PayPal SDK Loading and Initialization
    function initPayPal() {
        paypalTrigger.style.display = 'none';
        paypalContainer.classList.add('active');
        paypalContainer.innerHTML = ''; // Reset

        if (window.paypal) {
            renderPayPalButton();
        } else {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${currentConfig.paypalClientId}&currency=USD`;
            script.onload = renderPayPalButton;
            document.head.appendChild(script);
        }
    }

    function renderPayPalButton() {
        window.paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: currentConfig.productName,
                        amount: {
                            value: currentConfig.price.replace(/[^0-9.]/g, '')
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    closePaymentModal();
                });
            }
        }).render('#pm-paypal-button-container');
    }

    paypalTrigger.onclick = initPayPal;

    // QR Code Generation
    function generateQRCode(address) {
        const qrContainer = document.getElementById('pm-qrcode');
        if (qrContainer.innerHTML !== '') return;

        if (window.QRCode) {
            new QRCode(qrContainer, {
                text: address,
                width: 128,
                height: 128
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
            script.onload = () => {
                new QRCode(qrContainer, {
                    text: address,
                    width: 128,
                    height: 128
                });
            };
            document.head.appendChild(script);
        }
    }

    // Public API
    window.openPaymentModal = function(config) {
        currentConfig = config;
        
        document.getElementById('pm-display-product-name').innerText = config.productName;
        document.getElementById('pm-display-price').innerText = config.price;
        document.getElementById('pm-wallet-address').innerText = config.cryptoAddress;
        document.getElementById('pm-link-payoneer').href = config.payoneerLink;

        overlay.classList.add('active');
    };
})();
