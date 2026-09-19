import subprocess
import json
import os
import base64
import requests

GITHUB_REPO = "priscadezigns9/priscadezignswebsite"
GITHUB_TOKEN = "{{credential:github-pat-v2-renewed}}"

def get_clients_from_github():
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/CLIENTS.json"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        data = r.json()
        content = base64.b64decode(data['content']).decode()
        return json.loads(content), data['sha']
    return None, None

def update_clients_on_github(data, sha):
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/CLIENTS.json"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    payload = {
        "message": "Autonomous Provisioning: High-Fidelity Onboarding Emails Sent",
        "content": base64.b64encode(json.dumps(data, indent=2).encode()).decode(),
        "sha": sha
    }
    r = requests.put(url, headers=headers, json=payload)
    return r.status_code

def send_notification_to_owner(client_email, plan_name, ref_id):
    """Notify the Architect (Priscilla) of a new activated client via WhatsApp."""
    msg = f"🚀 *PRISCION SYSTEM ALERT*\n\nNew Client Activated!\nPlan: {plan_name}\nEmail: {client_email}\nRef: {ref_id}\n\nOnboarding assets have been requested autonomously."
    # Sending to self-chat JID from account context
    cmd = ['wpp-cli', 'send', '447576505652@s.whatsapp.net', msg]
    subprocess.run(cmd)

def send_welcome_email(client_email, plan_name, ref_id):
    subject = f"Prisca Dezigns Lab: {plan_name} Activated - Action Required"
    
    # Custom instructions per package
    instructions = ""
    if "Branding" in plan_name:
        instructions = "1. Reply with your current logo (if any).\n2. Send 3-5 images or links that represent your desired aesthetic.\n3. Briefly describe your target audience."
    elif "Growth" in plan_name:
        instructions = "1. Provide access to your current website/domain.\n2. List the 3 main goals for your business this quarter.\n3. Share your social media handles for signal integration."
    else:
        instructions = "1. Detail the specific problem you want this AI to solve.\n2. Provide any existing data or documentation for the Neural Node training."

    body = f"""
Hi,

Your payment for {plan_name} (Ref: {ref_id}) has been autonomously cleared by the Laboratory Watchdog.

Your project is now in the **Activation Phase**. To begin high-fidelity engineering, we require the following data from you:

{instructions}

Please reply directly to this email with the requested assets. Once received, the Architect will begin the design process.

Welcome to the future of data architecture.

Best,
The Laboratory Watchdog
Prisca Dezigns
    """
    
    if "@" in client_email:
        # Use outlook cli as configured in the environment
        cmd = ['outlook', 'mail', 'send', client_email, '--subject', subject, '--body', body]
        subprocess.run(cmd)
        
        # Also notify the owner
        send_notification_to_owner(client_email, plan_name, ref_id)
        return True
    return False

def run_provisioning():
    clients, sha = get_clients_from_github()
    if not clients:
        return

    updated = False
    for entry in clients.get("active_subscriptions", []):
        if entry.get("provisioned") != True:
            client_email = entry.get("client_email", "priscadezigns9@gmail.com")
            print(f"Provisioning {entry['client_id']}...")
            sent = send_welcome_email(client_email, entry['plan'], entry['client_id'])
            if sent:
                entry["provisioned"] = True
                updated = True

    if updated:
        update_clients_on_github(clients, sha)
        print("Provisioning complete. Registry updated and owner notified.")

if __name__ == "__main__":
    run_provisioning()
