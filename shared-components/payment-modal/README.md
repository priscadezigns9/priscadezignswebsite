# Sovereign Payment Modal - Prisca Dezigns Empire

A reusable, zero-modification payment modal for all Empire products. Supports PayPal, Payoneer, and Crypto (ERC-20).

## 3-Step Integration

### 1. Include the files
Copy the `payment-modal.css` and `payment-modal.js` files to your project's shared folder and include them in your HTML:

```html
<link rel="stylesheet" href="path/to/payment-modal.css">
<script src="path/to/payment-modal.js"></script>
```

### 2. Trigger the modal
Call `openPaymentModal(config)` when a user clicks a "Buy" or "Subscribe" button.

```javascript
openPaymentModal({
  productName: "Your Product Name",
  price: "$19.99/month",
  paypalClientId: "YOUR_PAYPAL_CLIENT_ID",
  payoneerLink: "https://payoneer.me/yourusername",
  cryptoAddress: "0xcef857e82c306b3d0f2db080e7794f4bb376049e"
});
```

### 3. Done!
The modal handles dependencies (PayPal SDK and QRCode.js) automatically on demand.

## Features
- **PayPal**: Real SDK integration for secure card/PayPal payments.
- **Payoneer**: Direct link to your Payoneer.me profile.
- **Crypto**: ERC-20 wallet address with auto-generated QR code and one-click copy.
- **Responsive**: Mobile-first design (bottom sheet on mobile, centered modal on desktop).
- **Secure**: Features a "Secure Payment" trust badge.
- **Zero Stripe**: Guaranteed 100% Stripe-free.
