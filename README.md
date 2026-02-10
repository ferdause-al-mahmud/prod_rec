# ProdRec - Product Recommendation Platform

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-11.1.0-FFCA28?logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, full-featured product recommendation platform built with React, Vite, and Firebase. Users can query products, receive and give recommendations, manage their queries and recommendations, and interact with an intelligent chatbot system.

## 📑 Table of Contents

- [Features](#-features)
  - [Core Features](#core-features)
  - [UI/UX Features](#uiux-features)
- [Architecture](#-architecture)
  - [System Architecture](#system-architecture)
  - [Design Patterns](#design-patterns)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Installation](#step-1-clone-the-repository)
- [Dependencies](#-dependencies)
- [API Configuration](#-api-configuration)
- [Security Features](#-security-features)
- [Styling & Theme](#-styling--theme)
- [Chatbot Integration](#-chatbot-integration)
- [Additional Features](#-additional-features)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Developer Information](#-developer-information)
- [Support & Contact](#-support--contact)
- [Roadmap](#-roadmap)

## 🌟 Features

### Core Features
- **User Authentication**
  - Email/Password registration and login
  - Google OAuth integration
  - Secure JWT token-based API communication
  - Automatic logout on unauthorized access (401/403)

- **Product Query Management**
  - Create product queries with detailed information
  - View all queries with pagination/filtering
  - Edit and delete your own queries
  - Search and browse all product queries
  - Get detailed query information with recommendations

- **Recommendation System**
  - Give product recommendations on queries
  - View all recommendations given by you
  - Browse recommendations suggested for you
  - Real-time recommendation updates
  - Track recommendation metrics

- **User Profile & Dashboard**
  - User profile management
  - My Queries dashboard
  - My Recommendations tracking
  - Recommendations for Me section

### UI/UX Features
- **Theme Support**
  - Light and Dark mode toggle
  - Persistent theme preference
  - Smooth theme transitions

- **Real-time Information Display**
  - Current date and time display
  - Live weather information (Dhaka region)
  - Responsive design with mobile optimization

- **Interactive Components**
  - AI Chatbot for user assistance
  - Browse recent queries with Swiper carousel
  - FAQ section with rich content
  - Community section
  - Toast notifications for user feedback
  - Sweet Alert modals for confirmations

- **Accessibility & Performance**
  - Scroll-to-top functionality
  - AOS (Animate on Scroll) animations
  - Optimized bundle with Vite
  - ESLint code quality checks

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    Client["🖥️ React Frontend<br/>(Vite Development Server)"]
    
    subgraph Frontend["Frontend Layer"]
        Router["🔀 React Router<br/>& Route Components"]
        
        subgraph Pages["Page Components"]
            HomePage["🏠 HomePage"]
            AllQueries["📋 AllQueries"]
            QueryDetails["📄 QueryDetails"]
            AddQueries["➕ AddQueries"]
            EditQuery["✏️ EditQuery"]
            Auth["🔐 Login/Register"]
            Dashboard["📊 Dashboard<br/>MyQueries/Recommendations"]
        end
        
        subgraph Shared["Shared Components"]
            Navbar["🧭 Navbar"]
            Footer["🔗 Footer"]
            Cards["🎴 Cards<br/>QueryCard, RecCard"]
            UI["✨ UI Components<br/>Chatbot, FAQ, Banner"]
        end
        
        State["⚙️ State Management<br/>AuthContext<br/>ThemeContext<br/>Local State"]
        
        API["📡 API Layer<br/>useAxiosSecure<br/>Interceptors<br/>Token Management"]
    end
    
    subgraph Services["External Services"]
        Firebase["🔑 Firebase Auth<br/>Email/Password<br/>Google OAuth"]
        Backend["🖧 ProdRec Backend<br/>http://localhost:3000<br/>Queries, Recommendations<br/>User Management"]
        Weather["🌤️ Weather API<br/>WeatherAPI.com<br/>Real-time Data"]
    end
    
    UI2["🎨 Styling<br/>Tailwind CSS<br/>DaisyUI<br/>Custom CSS"]
    
    Client -->|Renders| Frontend
    Router -->|Displays| Pages
    Router -->|Renders| Shared
    Pages -->|Use| State
    Pages -->|Use| API
    Shared -->|Use| State
    State -->|Updates| API
    API -->|HTTP Requests| Backend
    API -->|HTTP Requests| Firebase
    Navbar -->|Fetches| Weather
    Frontend -->|Styled by| UI2
    Firebase -->|Auth| Backend
    
    style Frontend fill:#e1f5ff
    style Pages fill:#fff3e0
    style Shared fill:#f3e5f5
    style State fill:#e8f5e9
    style API fill:#fce4ec
    style Services fill:#f1f8e9
    style UI2 fill:#eceff1
```

### Data Flow Architecture

```mermaid
sequenceDiagram
    participant User as 👤 User/Browser
    participant App as 🖥️ React App
    participant Auth as 🔐 Auth Context
    participant API as 📡 Axios/Hooks
    participant Firebase as 🔑 Firebase
    participant Backend as 🖧 Backend API
    
    rect rgb(200, 220, 255)
    Note over User,Auth: Authentication Flow
    User->>App: Click Login/Register
    App->>Firebase: signInWithEmailAndPassword
    Firebase->>App: User Object
    App->>Auth: Update AuthContext
    Auth->>API: Mount useAxiosSecure
    API->>Backend: POST /jwt (email, name, photo)
    Backend->>API: JWT Token (HTTP-only cookie)
    API->>App: Ready for API calls
    App->>User: Redirect to Dashboard
    end
    
    rect rgb(220, 240, 220)
    Note over User,Backend: Query Management Flow
    User->>App: Browse/Create Queries
    App->>API: useAxiosSecure hook
    API->>Backend: GET/POST /queries
    Backend->>API: Query Data
    API->>App: Update Component State
    App->>User: Render QueryCards/Details
    end
    
    rect rgb(240, 220, 240)
    Note over User,Backend: Theme Management Flow
    User->>App: Toggle Dark/Light Mode
    App->>Auth: Update ThemeContext
    Auth->>App: Provider re-renders
    App->>User: Applied Dark/Light Styles
    end
    
    rect rgb(255, 240, 200)
    Note over User,Backend: Chatbot Interaction
    User->>App: Send Message to Chatbot
    App->>API: POST /api/chatbot/chat
    API->>Backend: Message + User Context
    Backend->>Firebase: Verify User Token
    Backend->>App: AI Response
    App->>User: Display Chatbot Reply
    end
```

### Component Hierarchy & State Flow

```mermaid
graph TD
    App["🎯 App.jsx<br/>Root Component"]
    
    ThemeProvider["🎨 ThemeProvider<br/>Light/Dark Mode"]
    AuthProvider["🔐 AuthProvider<br/>User Auth State"]
    Toaster["📢 React Hot Toast<br/>Notifications"]
    Router["🔀 RouterProvider<br/>Route Management"]
    
    MainLayout["📐 MainLayout<br/>Navbar + Outlet + Footer"]
    
    subgraph Pages["Page Routes"]
        Home["🏠 HomePage"]
        AllQ["📋 AllQueries"]
        QueryD["📄 QueryDetails"]
        AddQ["➕ AddQueries"]
        MyQ["📊 MyQueries"]
        Profile["👤 Profile"]
        Rec["💬 Recommendations"]
    end
    
    subgraph Components["Shared Components"]
        Navbar["🧭 Navbar<br/>Weather + DateTime + Theme"]
        Footer["🔗 Footer"]
        Chatbot["🤖 Chatbot"]
        Cards["🎴 Card Components"]
    end
    
    subgraph ContextState["🎛️ State Management"]
        AuthCtx["AuthContext<br/>user, loading<br/>login, logout, signup"]
        ThemeCtx["ThemeContext<br/>theme state<br/>toggleTheme"]
    end
    
    App --> ThemeProvider
    App --> AuthProvider
    App --> Toaster
    App --> Router
    
    Router --> MainLayout
    MainLayout --> Home
    MainLayout --> AllQ
    MainLayout --> QueryD
    MainLayout --> AddQ
    MainLayout --> MyQ
    MainLayout --> Profile
    MainLayout --> Rec
    
    MainLayout --> Navbar
    MainLayout --> Footer
    MainLayout --> Chatbot
    
    Pages --> AuthCtx
    Pages --> ThemeCtx
    Components --> AuthCtx
    Components --> ThemeCtx
    
    style App fill:#bbdefb
    style Router fill:#fff9c4
    style ContextState fill:#c8e6c9
    style Pages fill:#ffe0b2
    style Components fill:#f8bbd0
```

### Authentication Flow

```mermaid
flowchart LR
    A["👤 User Visits App"] --> B{User<br/>Authenticated?}
    
    B -->|No| C["🔐 Sign In/Register"]
    C --> D["🔑 Firebase Auth"]
    D --> E["✅ Get User Object"]
    
    E --> F["📡 Call JWT Endpoint"]
    F --> G["🖧 Backend Creates Token"]
    G --> H["🍪 Token in HTTP-only Cookie"]
    
    H --> I["🎛️ Update AuthContext"]
    I --> J["📝 useAxiosSecure Ready"]
    J --> K["✅ User Authenticated"]
    
    B -->|Yes| K
    K --> L["🏠 Access Protected Routes"]
    
    L --> M["📋 Browse/Create Queries"]
    M --> N["💬 Give Recommendations"]
    N --> O["🤖 Chat with Chatbot"]
    O --> P["👤 View Profile"]
    
    M --> Q{User Action}
    Q -->|Creates| R["➕ POST /queries"]
    Q -->|Reads| S["📖 GET /queries"]
    Q -->|Updates| T["✏️ PUT /query/:id"]
    Q -->|Deletes| U["🗑️ DELETE /query/:id"]
    
    R --> V["🔒 useAxiosSecure<br/>Adds Auth Header"]
    S --> V
    T --> V
    U --> V
    
    V --> W["🖧 Request to Backend"]
    W --> X["🔐 Verify JWT"]
    X --> Y{Valid?}
    Y -->|Yes| Z["⚙️ Process Request"]
    Y -->|No| AA["❌ 401/403 Error"]
    
    AA --> AB["🚪 Force Logout"]
    AB --> C
    
    Z --> AC["📊 Database Operation"]
    AC --> AD["✅ Success Response"]
    AD --> AE["🎨 Update Component"]
    AE --> AF["📢 Toast Notification"]
    
    style A fill:#e3f2fd
    style K fill:#c8e6c9
    style V fill:#fff9c4
    style Z fill:#f8bbd0
    style AF fill:#e8f5e9
```

### State Management Architecture

```mermaid
graph TB
    subgraph AuthProvider["🔐 AuthProvider<br/>Authentication Context"]
        User["user<br/>User object or null"]
        Loading["loading<br/>Auth state"]
        Methods["Methods:<br/>loginUser()<br/>signUpUser()<br/>loginWithGoogle()<br/>logoutUser()"]
    end
    
    subgraph ThemeProvider["🎨 ThemeProvider<br/>Theme Context"]
        Theme["theme<br/>'light' or 'dark'"]
        Toggle["toggleTheme()<br/>Switch & Persist"]
    end
    
    subgraph Components["React Components"]
        Pages["Page Components"]
        NavbarC["Navbar, Footer,<br/>Card Components"]
    end
    
    subgraph LocalState["📝 Component Local State<br/>useState Hook"]
        FormData["Form inputs"]
        UIState["UI toggles/modals"]
        ListData["Fetched data"]
    end
    
    subgraph API["📡 Custom Hooks<br/>API Calls"]
        useAxios["useAxiosSecure<br/>HTTP Client<br/>With Interceptors"]
        Handlers["Event Handlers<br/>Click, Submit,<br/>Change"]
    end
    
    AuthProvider -->|Provides| Components
    ThemeProvider -->|Provides| Components
    Components -->|Uses| LocalState
    Components -->|Calls| API
    API -->|Manages| useAxios
    useAxios -->|Requests| Backend["🖧 Backend<br/>(http://localhost:3000)"]
    
    style AuthProvider fill:#c8e6c9
    style ThemeProvider fill:#bbdefb
    style LocalState fill:#fff9c4
    style API fill:#ffe0b2
    style Components fill:#f8bbd0
```

### API Request Flow with Interceptors

```mermaid
graph LR
    A["Request<br/>Initiated"] --> B["useAxiosSecure<br/>Hook"]
    B --> C["Axios Instance<br/>baseURL: :3000<br/>withCredentials: true"]
    
    C --> D["Request<br/>Interceptor"]
    D --> E["Add Auth<br/>Headers"]
    E --> F["Send to<br/>Backend"]
    
    F --> G{Response<br/>Status}
    
    G -->|200-299| H["Response<br/>Interceptor"]
    G -->|401/403| I["Unauthorized<br/>Error Handler"]
    
    H --> J["Return<br/>Data"]
    J --> K["Update<br/>Component State"]
    K --> L["Re-render<br/>UI"]
    
    I --> M["logoutUser()"]
    M --> N["Clear Auth<br/>Context"]
    N --> O["Redirect to<br/>Login"]
    O --> P["Show Error<br/>Toast"]
    
    style B fill:#fff9c4
    style C fill:#ffe0b2
    style F fill:#f8bbd0
    style J fill:#c8e6c9
    style O fill:#ffcdd2
```

### Design Patterns

- **Component-Based Architecture**: Modular, reusable React components organized by functionality
- **Context API Pattern**: Global state management for Auth and Theme with Provider pattern
- **Custom Hooks**: `useAxiosSecure` for centralized API communication with interceptors
- **Protected Routes**: Private route wrapper (`PrivateRoute`) prevents unauthorized access
- **Provider Pattern**: Multiple context providers wrapped around the app for state distribution
- **Layout Pattern**: Main layout component wraps pages with navbar, footer, and chatbot
- **Compound Component Pattern**: Cards and UI components composed from smaller pieces
- **Fetch-on-Mount Pattern**: Data loading via React Router loaders and useEffect hooks

## 📁 Folder Structure

```
prod_rec/
├── src/
│   ├── pages/                          # Page components
│   │   ├── HomePage.jsx                # Landing page with features
│   │   ├── AllQueries.jsx              # Browse all product queries
│   │   ├── QueryDetails.jsx            # Detailed query view
│   │   ├── AddQueries.jsx              # Create new query
│   │   ├── EditQuery.jsx               # Edit existing query
│   │   ├── MyQueries.jsx               # User's queries dashboard
│   │   ├── MyRecommendations.jsx       # User's given recommendations
│   │   ├── RecommendationsForMe.jsx    # Recommendations received
│   │   ├── Profile.jsx                 # User profile page
│   │   ├── Login.jsx                   # User login
│   │   ├── Register.jsx                # User registration
│   │   └── ErrorPage.jsx               # Error handling page
│   │
│   ├── components/                     # Reusable components
│   │   ├── Banner.jsx                  # Hero banner section
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx              # Navigation bar
│   │   │   └── Navbar.css              # Navbar styles
│   │   ├── Footer.jsx                  # Footer section
│   │   ├── Chatbot.jsx                 # AI chatbot component
│   │   ├── Faq.jsx                     # FAQ section
│   │   ├── Community.jsx               # Community section
│   │   ├── Find.jsx                    # Find/Search section
│   │   ├── RecentQueries.jsx           # Recent queries carousel
│   │   ├── CommentSwiper.jsx           # Comment swiper carousel
│   │   ├── ScrollToTop.jsx             # Scroll to top button
│   │   ├── Slide.jsx                   # Slide component
│   │   └── Cards/                      # Card components
│   │       ├── QueryCard.jsx           # Query card display
│   │       ├── CommentCard.jsx         # Comment card
│   │       ├── MyQueriesCard.jsx       # User's query card
│   │       └── RecommendationCard.jsx  # Recommendation card
│   │
│   ├── layouts/                        # Layout components
│   │   └── MainLayout.jsx              # Main app layout
│   │
│   ├── routes/                         # Routing configuration
│   │   ├── AppRoutes.jsx               # Route definitions
│   │   └── PrivateRoute.jsx            # Protected route wrapper
│   │
│   ├── provider/                       # Context providers
│   │   ├── AuthProvider.jsx            # Authentication context
│   │   └── ThemeProvider.jsx           # Theme context (Light/Dark)
│   │
│   ├── hooks/                          # Custom hooks
│   │   └── useAxiosSecure.jsx          # Secure API call hook
│   │
│   ├── firebase/                       # Firebase configuration
│   │   └── firebase.config.js          # Firebase setup
│   │
│   ├── assets/                         # Static assets
│   │   └── [images, icons, etc.]
│   │
│   ├── App.jsx                         # Root component
│   ├── App.css                         # Root styles
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
│
├── public/
│   └── [static files]
│
├── Configuration Files
│   ├── package.json                    # Dependencies & scripts
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── index.html                      # HTML entry point
│   ├── .env                            # Environment variables
│   └── .gitignore                      # Git ignore rules
```

## � API Integration with Backend

### Frontend-Backend Communication Architecture

```mermaid
graph TB
    subgraph Frontend["🖥️ ProdRec Frontend<br/>React + Vite"]
        Components["React Components<br/>Pages & UI"]
        Hooks["Custom Hooks<br/>useAxiosSecure"]
        Context["Context Providers<br/>AuthContext"]
        Local["Local State<br/>useState, useReducer"]
    end
    
    subgraph APILayer["📡 API Communication Layer"]
        Axios["Axios Instance<br/>baseURL: http://localhost:3000<br/>withCredentials: true"]
        Interceptors["Request/Response<br/>Interceptors<br/>Auth Headers<br/>Error Handling"]
    end
    
    subgraph Backend["🖧 ProdRec Backend<br/>Node.js + Express"]
        Auth["🔐 Authentication<br>/jwt, /logout<br/>/save-user"]
        Queries["📝 Queries<br/>GET /queries<br/>POST /queries<br/>PUT /query/:id<br/>DELETE /query/:id"]
        Recs["💬 Recommendations<br/>POST /recommendations<br/>GET /recommendations/:id<br/>DELETE /recommendations/:id"]
        Chat["🤖 Chatbot<br/>POST /api/chatbot/chat"]
    end
    
    subgraph Database["🗄️ Data Persistence"]
        MongoDB["MongoDB<br/>Collections:<br/>users<br/>queries<br/>recommendations"]
    end
    
    subgraph External["🌐 External Services"]
        Firebase["🔑 Firebase<br/>Authentication"]
        Google["🤖 Google Gemini<br/>AI/Chatbot"]
    end
    
    Components -->|Send/Receive| Hooks
    Hooks -->|Configure| Axios
    Axios -->|Request/Response| Interceptors
    Interceptors -->|HTTP| Backend
    Context -->|Auth State| Hooks
    Local -->|UI State| Components
    
    Backend -->|Verify Token| Firebase
    Backend -->|Query| MongoDB
    Backend -->|AI Request| Google
    
    style Frontend fill:#e1f5ff
    style APILayer fill:#fff9c4
    style Backend fill:#e8f5e9
    style Database fill:#f8bbd0
    style External fill:#f3e5f5
```

### API Endpoint Integration Map

```mermaid
graph LR
    subgraph Pages["Page Components"]
        Home["🏠 HomePage"]
        AllQ["📋 AllQueries"]
        QDetail["📄 QueryDetails"]
        AddQ["➕ AddQueries"]
        EditQ["✏️ EditQuery"]
        MyQ["📊 MyQueries"]
        MyRec["💬 MyRecommendations"]
        RecForMe["📥 RecommendationsForMe"]
        Chat["🤖 Chatbot"]
    end
    
    subgraph Endpoints["Backend Endpoints"]
        GETQ["GET /queries<br/>GET /queries/<br/>limit"]
        GETQID["GET /query/:id"]
        POSTQ["POST /queries"]
        PUTQ["PUT /query/:id"]
        DELQ["DELETE /query/:id"]
        POSTREC["POST /recommendations"]
        GETREC["GET /recommendations/:id"]
        DELREC["DELETE /recommendations/:id"]
        CHAT["POST /api/chatbot/chat"]
        JWT["POST /jwt<br/>POST /logout<br/>GET /user/:email"]
    end
    
    Home --> GETQ
    AllQ --> GETQ
    QDetail --> GETQID
    QDetail --> GETREC
    QDetail --> POSTREC
    AddQ --> POSTQ
    EditQ --> GETQID
    EditQ --> PUTQ
    MyQ --> GETQ
    MyRec --> GETREC
    RecForMe --> GETREC
    Chat --> CHAT
    
    Home --> JWT
    AllQ --> JWT
    QDetail --> JWT
    
    style Pages fill:#bbdefb
    style Endpoints fill:#fff9c4
```

### Request/Response Lifecycle

```mermaid
sequenceDiagram
    participant Component as React Component
    participant Hook as useAxiosSecure Hook
    participant Axios as Axios Instance
    participant Interceptor as Request Interceptor
    participant Backend as Backend API
    participant RespInt as Response Interceptor
    participant Context as AuthContext
    
    rect rgb(200, 220, 255)
    Note over Component,Interceptor: API Request Lifecycle
    
    Component->>Hook: Call hook function<br/>e.g., instance.get()
    Hook->>Axios: Invoke axios method
    Axios->>Interceptor: Trigger request interceptor
    Interceptor->>Interceptor: Add auth headers<br/>JWT token from cookies
    Interceptor->>Backend: Send HTTP request<br/>with credentials
    
    end
    
    rect rgb(220, 240, 220)
    Note over Backend,RespInt: Response Processing
    
    Backend->>Backend: Verify JWT token
    Backend->>Backend: Execute operation
    Backend->>Backend: Query database
    Backend->>RespInt: Return response<br/>200/201 success<br/>or error
    end
    
    rect rgb(240, 220, 240)
    Note over RespInt,Context: Response Handling
    
    RespInt->>RespInt: Check status code
    alt Success 200-299
        RespInt->>Component: Return data
        Component->>Component: Update useState
        Component->>Component: Re-render UI
    else Authentication Error 401/403
        RespInt->>Context: Call logoutUser()
        Context->>Context: Clear user state
        Context->>Component: Redirect to /login
        Component->>Component: Show error toast
    else Other Errors
        RespInt->>Component: Return error
        Component->>Component: Display error message
    end
    
    end
```

### useAxiosSecure Hook Implementation Pattern

```mermaid
graph TD
    A["useAxiosSecure Hook"] --> B["Create Axios Instance<br/>baseURL: localhost:3000<br/>withCredentials: true"]
    B --> C["Setup Request Interceptor"]
    C --> D["Extract Token from<br/>HTTP-only Cookie"]
    D --> E["Add Authorization<br/>Header"]
    E --> F["Send Request"]
    
    F --> G{Response<br/>Received}
    G -->|Success 200| H["Response Interceptor"]
    G -->|Error 401/403| I["Unauthorized Handler"]
    
    H --> J["Return Response Data<br/>to Component"]
    J --> K["Component Uses Data<br/>in useState/render"]
    
    I --> L["Remove JWT Token<br/>Clear Cookies"]
    L --> M["Update AuthContext<br/>user = null"]
    M --> N["Trigger Navigation<br/>to /login"]
    N --> O["Catch re-thrown error<br/>in component"]
    
    style A fill:#fff9c4
    style B fill:#ffe0b2
    style C fill:#f8bbd0
    style H fill:#c8e6c9
    style I fill:#ffcdd2
    style J fill:#e8f5e9
```

## �🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/ferdause-al-mahmud/prod_rec.git
cd prod_rec
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Configuration
Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
```

**Note**: Obtain these credentials from your Firebase project console.

### Step 4: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will open automatically at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
# or
yarn build
```

### Step 6: Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Code Quality Checks
```bash
npm run lint
# or
yarn lint
```

## 📦 Dependencies

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 18.3.1 | UI library |
| `react-dom` | 18.3.1 | DOM rendering |
| `react-router-dom` | 7.1.0 | Client-side routing |
| `vite` | 6.0.3 | Build tool & dev server |

### Authentication & Database
| Package | Version | Purpose |
|---------|---------|---------|
| `firebase` | 11.1.0 | Authentication & backend |

### HTTP & API
| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.13.3 | HTTP client |

### UI & Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | 3.4.17 | Utility-first CSS framework |
| `daisyui` | 4.12.22 | Component library for Tailwind |
| `react-icons` | 5.4.0 | Icon library |
| `lucide-react` | 0.563.0 | SVG icon library |

### Notifications & UI Components
| Package | Version | Purpose |
|---------|---------|---------|
| `react-hot-toast` | 2.4.1 | Toast notifications |
| `sweetalert2` | 11.15.3 | Modal alerts |
| `swiper` | 11.1.15 | Carousel component |
| `react-tooltip` | 5.28.0 | Tooltip component |

### Date & Time
| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | 4.1.0 | Date utilities |
| `react-datepicker` | 7.5.0 | Date picker component |
| `react-date-object` | 2.1.9 | Date object handling |

### Animations & Utilities
| Package | Version | Purpose |
|---------|---------|---------|
| `aos` | 2.3.4 | Scroll animations |

### Development Dependencies
- **ESLint**: Code quality and consistency
- **Autoprefixer**: CSS vendor prefixes
- **PostCSS**: CSS transformations

## 🔌 API Configuration

The application communicates with a backend API at:
```
Base URL: http://localhost:3000
```

### Key API Endpoints (Examples)
- `GET /queries-limit/?limit=6` - Get limited queries
- `GET /query/:id` - Get query details
- `POST /save-user` - Save user data
- `PUT /query/:id` - Update query
- `DELETE /query/:id` - Delete query

**Note**: Update the API base URL in configuration files for different environments (development, staging, production).

## 🛡️ Security Features

- **Firebase Authentication**: Secure user registration and login
- **Google OAuth**: Third-party authentication
- **Protected Routes**: Private route wrapper prevents unauthorized access
- **Axios Interceptors**: Automatic token management and error handling
- **Environment Variables**: Sensitive data stored in `.env` file
- **Token Expiry Handling**: Automatic logout on unauthorized access

## 🎨 Styling & Theme

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Pre-built components on top of Tailwind
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Custom CSS**: Additional styles in respective component files

## 🤖 Chatbot Integration

ProdRec includes an intelligent chatbot component (`Chatbot.jsx`) for:
- User assistance and support
- Product recommendations guidance
- FAQs and help information
- User engagement

## 🌍 Additional Features

### Weather Integration
- Real-time weather display for Dhaka, Bangladesh
- Uses WeatherAPI.com for live weather data
- Displays temperature, condition, and location

### DateTime Display
- Current date and time
- Updates every minute
- Formatted with locale-specific options

### Animations
- AOS (Animate on Scroll) library
- Smooth page transitions
- Interactive component animations
- Hover effects and transitions

## 🎯 Features Architecture

### Feature Organization Map

```mermaid
graph TB
    subgraph Auth["🔐 Authentication Module"]
        FirebaseAuth["Firebase Auth<br/>Email/Password<br/>Google OAuth"]
        JWTAuth["JWT Token<br/>HTTP-only Cookies<br/>Axios Interceptors"]
        ProtectedRoutes["Protected Routes<br/>PrivateRoute Wrapper<br/>Auth Guards"]
    end
    
    subgraph QueryMgmt["📝 Query Management"]
        Browse["Browse Queries<br/>AllQueries.jsx<br/>Search & Filter"]
        Create["Create Query<br/>AddQueries.jsx<br/>Form Validation"]
        View["View Details<br/>QueryDetails.jsx<br/>Recommendations"]
        Edit["Edit Query<br/>EditQuery.jsx<br/>Update Form"]
        MyQueries["My Queries<br/>MyQueries.jsx<br/>User Dashboard"]
    end
    
    subgraph RecMgmt["💬 Recommendation System"]
        GiveRec["Give Recommendation<br/>QueryDetails.jsx<br/>Recommendation Form"]
        ViewRec["View Recommendations<br/>MyRecommendations.jsx<br/>Received Recs"]
        RecForMe["Recommendations for Me<br/>RecommendationsForMe.jsx<br/>User Dashboard"]
        RecStats["Recommendation Stats<br/>Counter + Display<br/>Leaderboard"]
    end
    
    subgraph UI["🎨 UI/UX Features"]
        Theme["Theme Management<br/>Light/Dark Toggle<br/>ThemeContext"]
        Weather["Weather Widget<br/>Real-time Data<br/>Navbar Display"]
        DateTime["Date/Time Display<br/>Live Updates<br/>Locale Formatting"]
        Notifications["Toast Notifications<br/>React Hot Toast<br/>User Feedback"]
        Modal["Sweet Alert Modals<br/>Confirmations<br/>Info Dialogs"]
    end
    
    subgraph Chat["🤖 AI Chatbot"]
        ChatUI["Chat Interface<br/>Message Input<br/>Response Display"]
        Integration["Gemini Integration<br/>Backend API<br/>Context Awareness"]
        History["Message History<br/>User Context<br/>Personalization"]
    end
    
    subgraph Components["🎴 Reusable Components"]
        Cards["Card Components<br/>QueryCard<br/>RecCard<br/>CommentCard"]
        Navbar["Navigation Bar<br/>Theme Toggle<br/>User Info"]
        Footer["Footer<br/>Links<br/>Info"]
        Carousel["Carousel<br/>Swiper Integration<br/>Image Display"]
    end
    
    Auth --> JWTAuth
    QueryMgmt --> Create
    QueryMgmt --> Browse
    RecMgmt --> GiveRec
    RecMgmt --> ViewRec
    UI --> Theme
    UI --> Weather
    Chat --> Integration
    Components --> Cards
    
    style Auth fill:#c8e6c9
    style QueryMgmt fill:#bbdefb
    style RecMgmt fill:#fff9c4
    style UI fill:#ffe0b2
    style Chat fill:#f8bbd0
    style Components fill:#f3e5f5
```

### Feature Implementation Flow

```mermaid
flowchart TD
    A["User Action<br/>Click, Form Submit<br/>Navigation"] --> B["Component<br/>Handles Event"]
    
    B --> C{Action<br/>Type?}
    
    C -->|Read Data| D["GET Request<br/>useAxiosSecure"]
    D --> E["API Call<br/>Axios Hook"]
    E --> F["Backend<br/>Database"]
    F --> G["Response Data"]
    
    C -->|Write Data| H["POST/PUT Request<br/>useAxiosSecure"]
    H --> E
    
    C -->|Delete Data| I["DELETE Request<br/>useAxiosSecure"]
    I --> E
    
    C -->|Auth Action| J["Firebase Auth<br/>Email/Password/OAuth"]
    J --> K["User Object"]
    K --> L["Call JWT Endpoint"]
    L --> F
    
    C -->|UI State| M["Update useState<br/>Local State"]
    M --> N["Context Update<br/>AuthContext/ThemeContext"]
    
    G --> O["Update Component<br/>State"]
    K --> O
    N --> O
    
    O --> P["Re-render<br/>Component"]
    P --> Q["Display Results<br/>UI Update"]
    
    Q --> R["Show Feedback<br/>Toast/Modal<br/>Notification"]
    
    style A fill:#e3f2fd
    style D fill:#fff9c4
    style H fill:#ffe0b2
    style J fill:#f8bbd0
    style M fill:#c8e6c9
    style Q fill:#e8f5e9
    style R fill:#bbdefb
```

### Component Feature Matrix

```mermaid
graph LR
    subgraph Pages["Page Components"]
        HP["HomePage"]
        AQ["AllQueries"]
        QD["QueryDetails"]
        AQP["AddQueries"]
        EQ["EditQuery"]
        MQ["MyQueries"]
        MR["MyRecommendations"]
        RFM["RecommendationsForMe"]
        Prof["Profile"]
        Login["Login"]
        Reg["Register"]
    end
    
    subgraph Features["Features Used"]
        Auth["🔐 Auth"]
        Query["📝 Queries"]
        Rec["💬 Recommendations"]
        Theme["🎨 Theme"]
        API["📡 API"]
    end
    
    subgraph Shared["Shared Components"]
        Nav["Navbar"]
        Footer["Footer"]
        Cards["Cards"]
        Chat["Chatbot"]
    end
    
    HP --> Auth
    HP --> Query
    HP --> API
    HP --> Theme
    HP --> Nav
    
    AQ --> Query
    AQ --> Auth
    AQ --> API
    
    QD --> Auth
    QD --> Rec
    QD --> API
    QD --> Chat
    
    AQP --> Auth
    AQP --> Query
    AQP --> API
    
    Login --> Auth
    Reg --> Auth
    
    MQ --> Auth
    MQ --> Query
    MQ --> API
    
    MR --> Auth
    MR --> Rec
    MR --> API
    
    EMR --> Auth
    RFM --> Rec
    RFM --> API
    
    Prof --> Auth
    Prof --> Theme
    
    style Auth fill:#c8e6c9
    style Query fill:#bbdefb
    style Rec fill:#fff9c4
    style Theme fill:#ffe0b2
    style API fill:#f8bbd0
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers iOS/Android

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer Information

- **Project Name**: ProdRec (Product Recommendation Platform)
- **Repository**: [ferdause-al-mahmud/prod_rec](https://github.com/ferdause-al-mahmud/prod_rec)
- **Backend Repository**: [ferdause-al-mahmud/prod_rec-backend](https://github.com/ferdause-al-mahmud/prod_rec-backend)
- **Current Branch**: mahin
- **Default Branch**: main

## 📞 Support & Contact

For support, questions, or feedback:
- Open an issue on GitHub
- Contact the development team
- Check the FAQ section in the application

## 🗺️ Roadmap

- [ ] Advanced search filters
- [ ] User ratings and reviews
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Performance optimization
- [ ] Internationalization (i18n)

---

**Built with ❤️ using React, Vite, Firebase, and Tailwind CSS**

## 📚 Related Repositories

- **Backend API**: [ProdRec Backend Server](https://github.com/ferdause-al-mahmud/prod_rec-backend)
  - Node.js + Express API
  - MongoDB Database
  - JWT Authentication
  - Google Generative AI Integration
