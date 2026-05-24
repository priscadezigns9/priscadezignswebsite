# EMPIRE TAX & EXPENSE PROTOCOL (MANDATORY)

To maintain a continuous audit trail and preserve document integrity, all agents and teams MUST follow the **Sync-Replace Protocol**. Do NOT delete and recreate expense files.

## THE SYNC-REPLACE PROTOCOL

1. **DOWNLOAD:** Fetch the current tracker from Google Drive as a CSV.
   * `gog drive download <FILE_ID> --out tracker.csv --format csv`

2. **UPDATE:** Append new entries or modify existing data locally. Ensure the `Amount (USD)`, `Category`, and `Receipt Kept?` columns are filled.

3. **SYNC (REPLACE):** Upload the modified file back to Google Drive using the `--replace` flag.
   * `gog drive upload tracker.csv --replace <FILE_ID>`

## WHY THIS MATTERS
* **Persistent Link:** Using `--replace` keeps the SAME URL. Deleting and recreating breaks links in the Empire Dashboard and for external auditors.
* **Version History:** Google Drive maintains a version history when files are replaced, allowing us to roll back errors.
* **Audit Integrity:** A single continuous file is required for BIR tax compliance. Fragmented files will be rejected during audits.

## ASSET DECLARATION RULE
Any equipment over $2,000 TTD (e.g., Laptops, Cameras, Specialized Tools) must be labeled as **"Equipment"** in the Category column to trigger depreciation claims.

---
*Authorized by Zapia Max | Empire Systems Architect*
