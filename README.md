# 🐱 **KittyCare - Frontend with Google OAuth Authentication**  

## 📌 **Overview**  
The implementation of **Google OAuth 2.0 authentication**. Users can log in using their **Google accounts**, and their profile details are displayed upon successful authentication.  

---

## 🚀 **Completed tasks**  
✅ Google Login with OAuth 2.0  
✅ Display user profile information after login  
✅ Logout functionality  
✅ Authentication state persistence  

---

## 🛠️ **Setting Up the Project**  

### 1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/sanderNunes/kittycare-frontend.git  
cd kittycare-frontend  
```  

### 2️⃣ **Install Dependencies**  
```bash
yarn  
```  

### 3️⃣ **Set Up Environment Variables**  
Create a `.env` file in the root directory and add:  
```
VITE_GOOGLE_CLIENT_ID
VITE_GOOGLE_CLIENT_SECRET 
```  
The keys are the ones used in the backend readme

### 4️⃣ **Run the Development Server**  
```bash
yarn dev  
```  
The app will start on **`http://localhost:5173/`**  

---

## 🔄 **Authentication Flow**  
1️⃣ **User clicks Google Login** → Redirects to Google OAuth  
2️⃣ **User logs in** → Google sends an **ID Token**  
3️⃣ **Frontend sends the token to backend** → Backend verifies & returns **JWT**  
4️⃣ **User session is stored** → JWT stored in **httpOnly cookie** or local state  

---

## 🎨 **Frontend Features**  
- **Google Login Button:** Allows users to sign in with their Google accounts  
- **Profile Display:** Shows **email, name, and profile picture** after login  
- **Logout Button:** Clears user session  
- **Persistent Authentication:** Keeps users logged in across page reloads  

---

## 📚 **Files/Folders Edited**  
```
kittycare-frontend  
 └── 📂 src  
     └── 📂 components  
         └── GoogleLoginButton.tsx
         └── 📂 Login
             └── LoginForm.tsx
     └── 📂 context  
         └── AuthContext.tsx  
     └── 📂 Redux  
         └── userSlice.ts
     └── 📂 pages  
         └── Dashboard.tsx
         └── Login.tsx  
     └── App.tsx 
```

---

## ✅ **Security Considerations**  
🔹 **CORS Policy:** Ensures secure cross-origin requests  
🔹 **JWT Storage:** Tokens can be stored in `httpOnly` cookies for enhanced security  
🔹 **Token Expiry:** JWT expires in **1 hour** (`expiresIn: "1h"`)  

---

Let me know if you need any changes! 🚀

