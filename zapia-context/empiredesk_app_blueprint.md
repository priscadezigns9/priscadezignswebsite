# EmpireDesk App Blueprint
## Stack: FlutterFlow + Firebase

---

## Firebase Setup
- **Auth** — Email/password + Google Sign-In
- **Firestore** — Database for users, brands, posts, plans
- **Storage** — Media uploads (images, videos)
- **Functions** — Scheduled posting triggers (Node.js serverless)

---

## User Roles
| Role | Access |
|---|---|
| Agency Owner (you) | All brands, all clients, full admin |
| Pro Client | Their brands only, composer, analytics |
| Starter Client | Limited brands, manual post only |
| Free Client | View only, 3 brands max |

---

## App Screens

### 1. Onboarding
- Splash screen (EmpireDesk logo, dark bg)
- Login / Sign Up
- Forgot password
- Plan selection (Free / Starter $5 / Pro $12 / Agency $150)
- Payment screen (PayPal / Wise / Crypto)
- Welcome screen after plan confirmed

### 2. Dashboard (Home)
- Total brands count
- Posts scheduled today
- Total reach this week
- Quick action buttons: Create Post, View Calendar, Add Brand
- Recent activity feed

### 3. Brands
- Grid of brand cards (logo, name, platform icons, status)
- Tap brand → Brand Detail page
  - Connected platforms (FB, IG, TikTok, Pinterest, X)
  - Recent posts
  - Post now button
  - Analytics for that brand

### 4. Create Post (Composer)
- Select brand(s)
- Select platforms (FB ✓, IG, TikTok, Pinterest, X)
- Write caption (with char counter per platform)
- Upload image/video OR pick from Media Library
- Schedule date/time OR Post Now
- Preview before posting
- X platform → copy + open X (manual, or auto for Agency)

### 5. Calendar
- Month/week view
- Each post shown as a dot on its day
- Tap day → see all posts scheduled
- Tap post → edit or delete
- Color coded by brand

### 6. Analytics
- Per brand or all brands
- Reach, engagement, likes, shares (from FB Graph API)
- Weekly/monthly toggle
- Simple bar/line charts

### 7. Media Library
- Upload images/videos
- Organized by brand
- Tap to use in composer

### 8. Inbox (Agency plan)
- Comments and DMs from connected FB pages
- Reply from within app

### 9. Settings
- Profile (name, email, photo)
- Plan & billing
- Connected accounts (FB, IG, etc.)
- Payment methods
- Notification preferences
- Logout

### 10. Admin Panel (Agency Owner only)
- All clients list
- Manage plans
- Approve/revoke access
- Usage stats per client

---

## Firestore Data Structure
```
users/
  {userId}/
    name, email, plan, createdAt
    brands/
      {brandId}/
        name, slug, logo, platforms{}
        posts/
          {postId}/
            caption, image, scheduledAt, status, platforms[]

plans/
  free / starter / pro / agency
  → price, brandLimit, platformLimit, features[]
```

---

## Firebase Functions (Serverless)
- `scheduledPoster` — runs every hour, checks posts due, fires FB/IG API
- `onUserCreate` — assign free plan on signup
- `onPlanUpgrade` — unlock features after payment confirmed

---

## FlutterFlow Build Order
1. Set up Firebase project + connect to FlutterFlow
2. Build auth screens (login, signup, forgot password)
3. Build dashboard
4. Build composer
5. Build brands page + brand detail
6. Build calendar
7. Build settings + plan management
8. Build admin panel
9. Connect FB Graph API for real posting
10. Submit to Google Play + App Store

---

## Estimated Timeline
| Phase | Time |
|---|---|
| Firebase setup | 1 day |
| Auth + onboarding screens | 1-2 days |
| Core screens (dashboard, composer, brands) | 3-4 days |
| Calendar + analytics | 2 days |
| FB API integration | 1-2 days |
| Testing + polish | 2 days |
| Google Play submission | 1 day |
| **Total** | **~2 weeks** |
