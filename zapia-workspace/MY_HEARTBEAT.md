- [Weekly] Run the Empire-Wide Site Health Audit (sites_health_check.sh) every Friday to maintain buy-flow integrity and asset health.

## Expense Monitoring (Every Radar cycle)
Scan both Gmail (priscillanarine@gmail.com) and Outlook for:
1. **Subscription emails** — receipts, confirmations, billing emails from any service (keywords: "subscription", "payment confirmed", "receipt", "billing", "you've been charged", "invoice", "your plan", "renewal")
2. **Bank transaction emails** — from First Citizens Bank, Scotiabank, Eastern Credit Union (transaction alerts, payment notifications, account debits)

For each match found:
- Extract: Date, Service/Bank, Amount (TTD or USD), Type (Subscription or Bank Transaction), Description
- Append a new row to the Google Sheet: **1IaKo7XuLbx4op4RwaeHc0k7G2ezuTCgtLODwyJ85h1A** (Prisca Dezigns — Income & Expense Tracker 2026)
- Use the Sheets API via: `curl -X POST "https://sheets.googleapis.com/v4/spreadsheets/1IaKo7XuLbx4op4RwaeHc0k7G2ezuTCgtLODwyJ85h1A/values/A:F:append?valueInputOption=USER_ENTERED" -H "Authorization: Bearer {{credential:g_mail}}" -H "Content-Type: application/json" -d '{"values": [["DATE","SERVICE","AMOUNT","CURRENCY","TYPE","DESCRIPTION"]]}'`
- Only log emails NOT already logged (check against recent entries to avoid duplicates)
- If Sheets API write fails, append to local file: expense_log_pending.csv in workspace and retry next cycle
