// software/invoice-tracker/app/dashboard.js

function parseInvoice() {
    const input = document.getElementById('aiInput').value;
    const preview = document.getElementById('invoicePreview');
    
    if (!input) {
        alert("Please describe the invoice details first");
        return;
    }

    // Mock AI extraction
    const client = input.match(/for (.*?) at/) ? input.match(/for (.*?) at/)[1] : "New Client";
    const hours = input.match(/(\d+) hour/) ? input.match(/(\d+) hour/)[1] : 1;
    const rate = input.match(/\$(\d+)/) ? input.match(/\$(\d+)/)[1] : 0;
    const total = hours * rate;

    document.getElementById('prevClient').innerText = client;
    document.getElementById('prevTotal').innerText = `$${total.toFixed(2)}`;
    
    preview.classList.remove('hidden');
    preview.classList.add('animate-pulse');
    setTimeout(() => preview.classList.remove('animate-pulse'), 1000);
}

console.log("BillFlow Financial Engine v1.0.4 Online");
