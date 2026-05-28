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

### **Lock Protocol**
- **No Templating**: Never apply the main site's Ivory UI (tan/serif) to these subdirectories.
- **Source of Truth**: If these UIs are ever lost, restore them from the following backup files in the root:
    - `peak_fit_orange_hf.html`
    - `the_watch_list_hf.html`
    - `glow_protocol_original_hf.html`
    - `atelier_hf.html`
    - `autodrome_hf_index.html`
- **Violation Alert**: If a subagent or tool attempts to modify these paths, they must first verify the `UI_LOCK.md` and halt if the change is a generic re-templating.
