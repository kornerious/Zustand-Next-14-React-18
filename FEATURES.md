# Project Features and Functionality

This document outlines the core features and components built within the Zustand-Next-14-React-18 project.

## Core Technologies

*   **Next.js 14:** Framework for React applications, providing Server-Side Rendering (SSR), Static Site Generation (SSG), routing, image optimization, and API routes.
*   **React 18:** JavaScript library for building user interfaces.
*   **Zustand:** Lightweight state management library for React.
*   **Material-UI (MUI):** Component library for building visually appealing UIs.
*   **TypeScript:** Superset of JavaScript adding static typing.
*   **Tailwind CSS / DaisyUI:** Utility-first CSS framework and component library (used alongside MUI).
*   **ESLint/Prettier:** Code linting and formatting tools.

## Key Features & Components

### 1. E-commerce Frontend

*   **Product Display:**
    *   **Homepage (`app/page.tsx`):** Displays a hero section and a grid of featured products. Uses dynamic imports for `ProductGrid`. Includes client-side caching for featured products. Optimized hero image quality and loading.
    *   **Shop Page (`app/shop/page.tsx`):** Displays all products with category filtering tabs. Fetches product data from an external source (JSONbin). Includes client-side caching.
    *   **Category Pages (`app/shop/[category]/page.tsx`):** Displays products filtered by a specific category from the URL. Fetches product data.
    *   **Product Grid (`components/ProductGrid/ProductGrid.tsx`):** Reusable component to display products in a responsive grid. Dynamically loads `ProductCard`. Handles loading and error states.
    *   **Product Card (`components/ProductCard/ProductCard.tsx`):** Displays individual product details (image, title, rating, price). Uses `next/image` with optimized `sizes` prop for efficient image loading. Includes "Add to Cart" and "View Details" functionality. Provides user feedback via Snackbar notifications. Memoized for performance.
*   **Shopping Cart (`store/cartStore.ts`, `app/cart/page.tsx`):
    *   Uses Zustand for managing cart state (items, count, total).
    *   State is persisted to `localStorage`.
    *   Includes actions for adding, removing, updating quantity, and clearing the cart.
    *   Provides selectors for cart data (e.g., `getItem`, `isItemInCart`).
    *   Cart page displays items, allows quantity updates/removals, and shows the total.
*   **Checkout Process:**
    *   **Checkout Page (`app/checkout/page.tsx`):** Simple form for checkout simulation.
    *   **Checkout Success Page (`app/checkout/success/page.tsx`):** Confirmation page after "checkout".
    *   **API Route (`app/api/checkout/route.ts`):** Placeholder API endpoint for handling checkout logic (currently basic).
*   **Order Management (`store/orderStore.ts`):
    *   Zustand store for managing past orders (persisted to `localStorage`).
    *   Placeholder functionality for adding and loading orders.
*   **Static Pages:**
    *   About (`app/about/page.tsx`)
    *   Contact (`app/contact/page.tsx`)
    *   FAQ (`app/faq/page.tsx`)
    *   Warranty (`app/warranty/page.tsx`)
    *   Shipping (`app/shipping/page.tsx`)
    *   Privacy Policy (`app/privacy/page.tsx`)
    *   Terms of Service (`app/terms/page.tsx`)
    *   Cookie Policy (`app/cookie/page.tsx`)

### 2. Theming & UI

*   **Layout (`components/Layout/Layout.tsx`):** Main application wrapper including Header and Footer. Uses dynamic imports for Header/Footer components. Includes `Suspense` for loading states.
*   **Header (`components/Header/Header.tsx`):** Application header with navigation and theme toggle.
*   **Footer (`components/Footer/Footer.tsx`):** Application footer.
*   **Theme Store (`store/themeStore.ts`):** Zustand store to manage UI theme (light/dark mode, primary color). Persisted to `localStorage`.
*   **Theme Provider (`app/providers/ThemeProvider.tsx`):** Applies the MUI theme based on the `themeStore` state. Uses `useMemo` for performance.
*   **Storybook Design System Parity:** Storybook now uses the app's real ThemeProvider and design system. All components in Storybook match the live site visually, including button colors, typography, and layout. No more generic MUI theme in Storybook.
*   **Page Container (`components/PageContainer/PageContainer.tsx`):** Reusable component for consistent page structure and styling.

### 3. Performance & Optimization

*   **Next.js Image Optimization:** Utilized `next/image` component in `ProductCard.tsx` and `app/page.tsx` with appropriate `sizes` and `quality` props. Removed `unoptimized` prop where applicable.
*   **Dynamic Imports:** Components like `ProductGrid`, `Header`, and `Footer` are dynamically imported to reduce initial bundle size.
*   **Code Splitting:** Next.js handles automatic code splitting by page.
*   **Memoization:** React's `memo` is used on components like `Layout` and `ProductCard` to prevent unnecessary re-renders. `useCallback` and `useMemo` hooks are used for optimizing functions and values.
*   **Bundle Analysis (`@next/bundle-analyzer`):** Configured in `next.config.js` to allow analysis of bundle sizes via `ANALYZE=true npm run build`.
*   **Client-Side Caching:** Simple caching implemented in `app/page.tsx` and `app/shop/page.tsx` for product data.
*   **Performance Monitoring (`src/performance.ts`):** Contains utility functions like `measureRenderTime` and `lazyLoadImage`. The `withPerformanceMonitoring` HOC is currently commented out due to a TypeScript issue.
*   **Efficient State Management (Zustand):** Zustand selectors (`useThemeMode`, `useThemeColor`, etc.) are used to prevent components from re-rendering when unrelated state slices change. Cart calculations are memoized.

### 4. Development & Tooling

*   **ESLint/Prettier:** Configured for code quality and consistency.
*   **TypeScript:** Project fully typed.
    *   Handled `product.description` possibly undefined in `ShopPageClient` using nullish coalescing (`?? ''`). (Fix for lint ID: `d1240e5f-3a82-44f4-8703-651b5f660bdc`).
    *   Resolved prop mismatch (`onAddToCart`) in `app/shop/[category]/page.tsx` during Server/Client component refactoring. (Fix for lint ID: `2eb7f3c9-d1ea-4c11-9ef6-18cf180f64c4`).
*   **Environment Variables:** Uses `.env.local` for `NEXT_PUBLIC_JSONBIN_ID` and potentially `NEXT_PUBLIC_JSONBIN_API_KEY`.
*   **Data Fetching Module (`lib/dataFetch.ts`):** Centralized fetch logic for products and categories.

## Next Steps / Pending Issues

*   **Storybook:**
    *   Storybook is fully configured and running for all major components and pages, including all PageClient components (CategoryPageClient, HomePageClient, ShopPageClient).
    *   All required addons are installed and working (`@storybook/addon-links`, `@storybook/addon-a11y`, etc.).
    *   Story files exist for all core components in `components/`.
    *   All PageClient components are robust against missing or undefined props (e.g., products, featuredProducts, categories) and will not throw errors if story args are missing or malformed.
    *   Defensive programming practices were applied to all page and grid components to ensure safe rendering in all environments.
    *   Storybook now uses the app's real ThemeProvider and design system, guaranteeing 1:1 visual parity with the live site. No more generic MUI theme in Storybook.
    *   No errors or warnings remain. Storybook is now an integral part of the development workflow for UI review and documentation.
*   **Fix `withPerformanceMonitoring` HOC:** Resolve the TypeScript error preventing its usage in `src/performance.ts`.
*   **Investigate Product Data Fetching:** Ensure robustness and potentially improve error handling/fallback logic for the JSONbin API calls.
*   **Testing:** All components now have test files. Additional test coverage could be expanded.