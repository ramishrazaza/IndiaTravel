# India Travel App - Complete Routes & Functionality Summary

## 📋 Project Overview
**India Travel** is a full-stack Node.js/Express web application for travel planning and booking in India. It uses MongoDB for data storage, EJS for templating, and includes an admin dashboard for content management.

---

## 🏗️ Technology Stack
- **Backend**: Node.js + Express.js 5.2.1
- **Database**: MongoDB (Mongoose 9.0.2)
- **Template Engine**: EJS 3.1.10 with ejs-mate
- **Authentication**: Session-based (express-session)
- **Other Dependencies**:
  - bcryptjs (password hashing)
  - axios (HTTP requests)
  - dotenv (environment variables)
  - method-override (PUT/DELETE support)

---

## 📍 Route Structure

### **1. INDEX ROUTES** (`/`)
Public-facing routes for homepage and main features.

| Route | Method | Controller | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `renderHomePage` | Homepage with featured destinations, experiences, blogs, testimonials, and packages |
| `/plan-trip` | GET | `renderPlanTripPage` | Trip planning page with options for travel style, accommodation, transport, and interests |
| `/book-now` | GET | `renderBookNowPage` | Booking page with available packages and reservation form |
| `/ai-trip-planner` | GET | `renderAIPlannerPage` | AI-powered trip planning interface |
| `/api/bookings` | POST | `submitTripBooking` | API to submit trip booking (saves to database) |
| `/api/ai/plan` | POST | `generateAIPlan` | API to generate AI-powered travel plans |
| `/api/testimonials` | GET | `getAllTestimonials` | API to fetch all testimonials |
| `/api/search` | GET | `searchAll` | Global search API across all content |

**Controller**: [controllers/index.js](controllers/index.js)

---

### **2. DESTINATIONS ROUTES** (`/destinations`)
Browse and view travel destinations across India.

| Route | Method | Controller | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `renderDestinationsPage` | List all destinations with filtering by region |
| `/place` | GET | `renderDestinationDetailPage` | Single destination detail page with related destinations and packages |
| `/getAllDestinations` | GET | `getAllDestinations` | API to fetch all destinations (JSON) |
| `/getDestinationById/:id` | GET | `getDestinationById` | API to fetch specific destination by ID |

**Features**:
- Filter destinations by region
- View related destinations
- See packages available for each destination
- Responsive destination listing

**Controller**: [controllers/destinations.js](controllers/destinations.js)

---

### **3. EXPERIENCES ROUTES** (`/experiences`)
Browse travel experiences and activities.

| Route | Method | Controller | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `renderExperiencesPage` | List all experiences with filtering by category and sorting |
| `/experience` | GET | `renderExperienceDetailPage` | Single experience detail page with related experiences |
| `/getAllExperiences` | GET | `getAllExperiences` | API to fetch experiences (with filters & sorting) |
| `/getExperienceById/:id` | GET | `getExperienceById` | API to fetch specific experience by ID |

**Features**:
- Filter experiences by category
- Sort by price (low/high) or rating
- View related experiences
- Display experience details and pricing

**Controller**: [controllers/experiences.js](controllers/experiences.js)

---

### **4. PACKAGES ROUTES** (`/packages`)
Travel package browsing and booking information.

| Route | Method | Controller | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `renderPackagesPage` | List all packages with destination filter and sorting |
| `/:id` | GET | `renderPackageDetailPage` | Single package detail page with related packages |
| `/getAllPackages` | GET | `getAllPackages` | API to fetch all packages (with filters & sorting) |
| `/getPackageById/:id` | GET | `getPackageById` | API to fetch specific package by ID |

**Features**:
- Filter packages by destination
- Sort by price or rating
- View related packages
- Display package details, pricing, and itinerary

**Controller**: [controllers/packages.js](controllers/packages.js)

---

### **5. BLOGS ROUTES** (`/blogs`)
Travel blogs and articles.

| Route | Method | Controller | Purpose |
|-------|--------|-----------|---------|
| `/` | GET | `renderBlogsPage` | List all blogs with category filter, search, and sorting |
| `/:id` | GET | `renderBlogDetailPage` | Single blog detail page with related blogs and view counter |
| `/getAllBlogs` | GET | `getAllBlogs` | API to fetch blogs (with filters & sorting) |
| `/getBlogById/:id` | GET | `getBlogById` | API to fetch specific blog by ID |

**Features**:
- Filter blogs by category
- Search blogs by title or excerpt
- Sort by latest, popular, or rating
- Auto-increment view count
- Display related blog posts

**Controller**: [controllers/blogs.js](controllers/blogs.js)

---

### **6. ADMIN ROUTES** (`/admin`)
Admin dashboard and content management (protected with login).

#### **Authentication**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/login` | GET | `renderLoginPage` | Admin login page | Not logged in only |
| `/login` | POST | `adminLogin` | Process login credentials | Not logged in only |
| `/logout` | GET | `adminLogout` | Logout and destroy session | Logged in only |

#### **Dashboard**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/dashboard` | GET | `renderDashboard` | Admin dashboard with stats | Logged in only |

#### **Destinations Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/destinations` | GET | `renderDestinationsList` | List all destinations | Logged in only |
| `/destinations/:id` | GET | `renderDestinationForm` | Create/Edit destination form | Logged in only |
| `/destinations/:id` | POST | `saveDestination` | Save destination (create/update) | Logged in only |
| `/destinations/:id` | DELETE | `deleteDestination` | Delete destination | Logged in only |

#### **Experiences Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/experiences` | GET | `renderExperiencesList` | List all experiences | Logged in only |
| `/experiences/:id` | GET | `renderExperienceForm` | Create/Edit experience form | Logged in only |
| `/experiences/:id` | POST | `saveExperience` | Save experience (create/update) | Logged in only |
| `/experiences/:id` | DELETE | `deleteExperience` | Delete experience | Logged in only |

#### **Packages Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/packages` | GET | `renderPackagesList` | List all packages | Logged in only |
| `/packages/:id` | GET | `renderPackageForm` | Create/Edit package form | Logged in only |
| `/packages/:id` | POST | `savePackage` | Save package (create/update) | Logged in only |
| `/packages/:id` | DELETE | `deletePackage` | Delete package | Logged in only |

#### **Blogs Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/blogs` | GET | `renderBlogsList` | List all blogs | Logged in only |
| `/blogs/:id` | GET | `renderBlogForm` | Create/Edit blog form | Logged in only |
| `/blogs/:id` | POST | `saveBlog` | Save blog (create/update) | Logged in only |
| `/blogs/:id` | DELETE | `deleteBlog` | Delete blog | Logged in only |

#### **Testimonials Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/testimonials` | GET | `renderTestimonialsList` | List all testimonials | Logged in only |
| `/testimonials/:id` | GET | `renderTestimonialForm` | Create/Edit testimonial form | Logged in only |
| `/testimonials/:id` | POST | `saveTestimonial` | Save testimonial (create/update) | Logged in only |
| `/testimonials/:id` | DELETE | `deleteTestimonial` | Delete testimonial | Logged in only |

#### **Bookings Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/bookings` | GET | `renderBookingsList` | List all trip bookings | Logged in only |
| `/bookings/:id` | GET | `viewBooking` | View single booking details | Logged in only |
| `/bookings/:id` | DELETE | `deleteBooking` | Delete booking | Logged in only |

#### **AI Plans Management**
| Route | Method | Controller | Purpose | Protection |
|-------|--------|-----------|---------|-----------|
| `/aiplans` | GET | `renderAIPlansList` | List all AI-generated plans | Logged in only |
| `/aiplans/:id` | GET | `viewAIPlan` | View single AI plan | Logged in only |
| `/aiplans/:id` | DELETE | `deleteAIPlan` | Delete AI plan | Logged in only |

**Controller**: [controllers/admin.js](controllers/admin.js)
**Middleware**: [middleware/admin.js](middleware/admin.js) - `isAdminLoggedIn`, `isAdminNotLoggedIn`

---

## 🗄️ Database Models

| Model | Purpose |
|-------|---------|
| **Destination** | Travel destinations in India (name, region, description, images, etc.) |
| **Experience** | Activities and experiences (category, pricing, rating, etc.) |
| **Package** | Travel packages (destination, duration, price, itinerary, etc.) |
| **Blog** | Travel articles (category, content, view count, rating, etc.) |
| **Testimonial** | Customer reviews and testimonials (rating, quote, featured status) |
| **TripBooking** | User trip bookings (passenger info, dates, preferences, etc.) |
| **AIPlan** | AI-generated travel plans |
| **Admin** | Admin users (username, password hashed, role, permissions) |

---

## 🔧 Key Features

### **Public Features**
1. **Homepage** - Showcase destinations, experiences, blogs, testimonials, and packages
2. **Destinations Browse** - Filter and view Indian travel destinations
3. **Experiences** - Browse activities with filtering and sorting
4. **Packages** - View and book pre-made travel packages
5. **Blogs** - Read travel articles with search functionality
6. **Trip Planning** - AI-powered trip customization
7. **Booking System** - Reserve trips with personal preferences
8. **Search** - Global search across all content

### **Admin Features**
1. **Dashboard** - Overview stats of all content
2. **CRUD Operations** - Full management of:
   - Destinations
   - Experiences
   - Packages
   - Blogs
   - Testimonials
3. **Booking Management** - View and manage customer bookings
4. **AI Plans** - View and manage AI-generated travel plans
5. **Admin Authentication** - Secure login/logout

---

## 🛡️ Middleware & Security

- **Session Management**: express-session for user authentication
- **Admin Middleware**: 
  - `isAdminLoggedIn` - Protects admin routes
  - `isAdminNotLoggedIn` - Redirects logged-in admins from login page
- **Password Security**: bcryptjs for hashing admin passwords
- **Error Handling**: Global error handler for all routes

---

## 📊 Request Flow Example

### **Booking a Trip** (Public User Flow)
1. User visits `/book-now`
2. User fills booking form with preferences
3. Form submits to `/api/bookings` (POST)
4. Controller saves booking to TripBooking model
5. Confirmation sent to user

### **Managing Destinations** (Admin Flow)
1. Admin logs in via `/admin/login`
2. Session created with admin credentials
3. Admin navigates to `/admin/destinations`
4. Can create, edit, or delete destinations
5. Changes saved to Destination model
6. Admin logs out via `/admin/logout`

---

## 🚀 Server Configuration

- **Port**: 3000 (or `process.env.PORT`)
- **View Engine**: EJS with ejs-mate layout support
- **Static Files**: Served from `/public` directory
- **Database**: MongoDB (connection in [config/db.js](config/db.js))
- **Session Secret**: From environment variables or default

---

## 📁 Project Structure Summary

```
IndiaTravel/
├── app.js                      # Main Express app
├── routes/                     # Route definitions
│   ├── index.js               # Home & booking routes
│   ├── destinations.js        # Destination routes
│   ├── experiences.js         # Experience routes
│   ├── packages.js            # Package routes
│   ├── blogs.js               # Blog routes
│   └── admin.js               # Admin management routes
├── controllers/               # Route handlers
│   ├── index.js
│   ├── destinations.js
│   ├── experiences.js
│   ├── packages.js
│   ├── blogs.js
│   └── admin.js
├── models/                    # Mongoose schemas
├── middleware/                # Express middleware
├── services/                  # Business logic (e.g., aiGeneration, aiPlanner)
├── config/                    # Configuration files
├── views/                     # EJS templates
│   ├── pages/                # Public pages
│   ├── admin/                # Admin dashboard pages
│   └── includes/             # Reusable components
├── public/                    # Static assets
└── package.json              # Dependencies
```

---

## 🔄 API Response Format

All API endpoints follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* requested data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

---

## 📝 Notes

- Admin routes use session-based authentication
- All public pages render using EJS templates
- Database queries use Mongoose ODM
- Error handling is centralized in app.js global error handler
- Supports filtering, sorting, and searching across most collections
- AI features available for trip planning and customization
