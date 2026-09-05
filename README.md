# 1Fi Marketplace — Assignment Web App Implementation

Hey team! Here is my implementation of the **1Fi Marketplace** feature built for the assignment. 

Since the main 1Fi product is a native mobile app, I built this as a mobile-first responsive React web app. I constrained the main container on wide desktop viewports (`max-w-[460px]`) so it retains the authentic mobile layout and visually matches the reference screenshots while working seamlessly on desktop browsers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens (`#7B2FF7` primary purple, `#EDE4FB` light purple chip bg, `#1A1A2E` primary text, `#8A8A9E` secondary text, `#F5F5F7` screen background)
- **Routing**: React Router (`react-router-dom` v6)
- **State Management**: React Context API (`SelectionContext`) with `localStorage` fallback persistence so page refreshes don't wipe active order state or history.
- **Backend Mock API**: Express.js server running on port `3001` serving simulated network responses with 400ms delay.

---

## 🚀 Running the App Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Mock API & Frontend concurrently**:
   ```bash
   npm run dev
   ```
   - **Mock Express Server**: `http://localhost:3001`
   - **React Vite App**: `http://localhost:5173`

---

## 📱 Features & Highlights

1. **Shop Page with 3 Tabs**:
   - `Top Brands`: EmptyState placeholder component.
   - `Nearby Stores`: EmptyState placeholder component.
   - `1Fi Marketplace`: Active product catalog fetching real JSON data from Express mock API. Includes live search, category filtering, loading skeletons, and error handling with retry capability.

2. **Product Detail Screen**:
   - Dynamic variant chip selector (e.g. 128GB, 256GB, 512GB).
   - Real-time price and EMI monthly amount recalculation when variants with price deltas are selected.
   - Selectable EMI plan cards (3, 6, 9, 12, 18, 24 months) highlighting No Cost EMI and cashback incentives.

3. **Confirmation & EMI Application Recap**:
   - Financial recap displaying base price, variant addition, cashback discount, processing fee, and monthly EMI.
   - One-click credit application generating unique order IDs.
   - Instant transition to approved state with updates synced to the **EMI Dues** tab.

4. **Bottom Navigation**:
   - Floating white pill bar navigating between Home, Shop, EMI Dues, Limit, and Profile.

---

## 💬 My Design Decisions & Trade-Offs

- **Context API vs Zustand/Redux**: For a flow of this scale (selecting a product, picking a variant & EMI plan, and submitting an application), Context API with custom React hooks provided clean, lightweight state management without extra bundle bloat. I added `localStorage` syncing so direct page refreshes on `/confirmation` or `/emi-dues` retain full state.
- **Dynamic EMI Recalculation**: Instead of hardcoding static EMI amounts, I added dynamic calculation logic so when a user selects a 512GB variant (+₹30,000), all EMI monthly amounts update accurately to match the true total price.

---

## 💡 What I Would Improve With More Time

If I had a bit more time, I would:
1. **Add an Interactive Repayment Schedule Drawer**: Allow users to click on any EMI plan to open a modal showing exact month-by-month auto-debit dates (e.g., 5th Oct, 5th Nov, 5th Dec).
2. **Add Unit & Integration Tests**: Set up Vitest / React Testing Library tests for `SelectionContext` state transitions and the financial calculation helper logic.

Hope you enjoy reviewing it! Let me know if you have any questions or feedback.
