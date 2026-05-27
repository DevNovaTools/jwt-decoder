const input = document.getElementById('jwtInput');
const headerOutput = document.getElementById('headerOutput');
const payloadOutput = document.getElementById('payloadOutput');

input.addEventListener('input', decodeJWT);

function decodeJWT() {
    const token = input.value.trim();
    
    if (!token) {
        headerOutput.textContent = "Waiting for token...";
        headerOutput.className = "";
        payloadOutput.textContent = "Waiting for token...";
        payloadOutput.className = "";
        return;
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid format. A JWT must have 3 parts separated by dots.');

        // Secure Base64Url decoding logic
        const decodeBase64Url = (str) => {
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) { base64 += '='; }
            // Handles Unicode decoding properly
            return decodeURIComponent(escape(atob(base64))); 
        };

        const header = JSON.parse(decodeBase64Url(parts[0]));
        const payload = JSON.parse(decodeBase64Url(parts[1]));

        headerOutput.textContent = JSON.stringify(header, null, 2);
        headerOutput.className = "";
        payloadOutput.textContent = JSON.stringify(payload, null, 2);
        payloadOutput.className = "";
    } catch (e) {
        headerOutput.textContent = "Error decoding token.";
        headerOutput.className = "error";
        payloadOutput.textContent = e.message;
        payloadOutput.className = "error";
    }
}
