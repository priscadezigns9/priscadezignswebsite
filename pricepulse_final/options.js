document.addEventListener('DOMContentLoaded', async () => {
  const data = await chrome.storage.local.get(['alertEmail']);
  if (data.alertEmail) {
    document.getElementById('alert-email').value = data.alertEmail;
  }

  document.getElementById('save-btn').addEventListener('click', async () => {
    const email = document.getElementById('alert-email').value;
    await chrome.storage.local.set({ alertEmail: email });
    alert('Settings saved!');
  });
});
