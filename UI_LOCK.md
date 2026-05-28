# UI LOCK - DO NOT MODIFY

The following brands have **STRICT UI LOCKS**. Their index files and style identities must NEVER be overwritten with generic templates (like Ivory UI) or modified without explicit, verbal confirmation from the user.

| Brand | UI Style | Protected Path |
| :--- | :--- | :--- |
| **Peak Fit** | High-Fidelity Fitness Orange/Dark | `peakfit/index.html` |
| **The Watch List** | Luxury Gold/Black Magazine | `thewatchlist/index.html` |
| **Glow Protocol** | High-Fidelity Beauty/Skincare (Blush) | `glowprotocol/index.html` |
| **Atelier Gaming** | Premium Void Black Editorial | `ateliergaming/index.html` |
| **The Autodrome** | High-Performance Dark (Teal/Red) | `autodrome/index.html` |
| **Dreaming Anime** | Vivid Orange & Deep Black | `dreaminganime.com` (External) |

### **Visual Truths (Reference Backups)**
The canonical look for each brand is documented and stored in the **"Prisca Dezigns Visual Truths"** folder on Google Drive. Use these screenshots to verify the UI if a restoration is needed.

- **Folder Link**: [Prisca Dezigns Visual Truths](https://drive.google.com/drive/folders/12XUSttdndHRN3Hfu6yE3aMDHyR4DQYfj)
- **The Watchlist**: [Visual Truth](https://drive.google.com/file/d/1RmUPBULT1aaLhRoja2J4JBNLVfjNsKV9/view)
- **Glow Protocol**: [Visual Truth](https://drive.google.com/file/d/1xs0OWWtLlSlN5W2uMZlK0JsmdWqk0pFn/view)
- **Peak Fit**: [Visual Truth](https://drive.google.com/file/d/1GQQW7whFx4OGjwZXTfDddYjOt5XGXmDm/view)
- **Dreaming Anime**: [Visual Truth](https://drive.google.com/file/d/1CoetyYMgYxg-dafyjIOvAhOYfomXlqZ2/view)

### **Lock Protocol**
- **No Templating**: Never apply the main site's Ivory UI (tan/serif) to these subdirectories.
- **Source of Truth**: If these UIs are ever lost, restore them from the following backup files in the root:
    - `peak_fit_orange_hf.html`
    - `the_watch_list_hf.html`
    - `glow_protocol_original_hf.html`
    - `atelier_hf.html`
    - `autodrome_hf_index.html`
- **Violation Alert**: If a subagent or tool attempts to modify these paths, they must first verify the `UI_LOCK.md` and halt if the change is a generic re-templating.
