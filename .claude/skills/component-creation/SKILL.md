---

name: component-creation
description: Automatically enforce Next.js architecture standards when generating pages, components, interfaces, reusable UI, and static data.

---

When creating or modifying pages, components, interfaces, shared UI, or static data, automatically apply the following standards.

## 1. Page Naming Convention

* Every page component must follow:

```ts
FeatureNamePage
```

Examples:

```ts
HomePage
ProfilePage
DashboardPage
```

Rules:

* Never use generic page names:

  * `Page`
  * `Index`
  * `Screen`
  * `Main`
* Page component names must match the feature.

Example:

```tsx
export default function DashboardPage() {
  return <DashboardView />;
}
```

---

## 2. Next.js App Router Structure

* All pages must be created under:

```plaintext
app/
```

Example:

```plaintext
app/
├── dashboard/
│   └── page.tsx
├── profile/
│   └── page.tsx
```

Rules:

* Follow App Router conventions.
* Respect nested routes.
* Never generate pages under `pages/`.

---

## 3. Static / Dummy Data Management

Do not place static, mock, or constant data inside components or pages.

Move all static content into:

```plaintext
shared/constants/
```

Examples:

```plaintext
shared/constants/navbar.ts
shared/constants/home.ts
shared/constants/profile.ts
```

Extract:

* Arrays
* Menu items
* Labels
* Tabs
* Mock data
* Display configuration

Example:

```tsx
import { MENU_ITEMS } from "@/shared/constants/navbar";
```

---

## 4. Shared Component Architecture

If a component can be reused:

Move it into:

```plaintext
shared/components/
```

Examples:

```plaintext
shared/components/Navbar/
shared/components/Button/
shared/components/Card/
```

Rules:

* Detect repeated UI.
* Extract duplicated JSX.
* Prefer reusable components.

---

## 5. Interface Organization

Store shared interfaces in:

```plaintext
shared/interfaces/
```

Naming convention:

```plaintext
<ComponentName>.interface.ts
```

Examples:

```plaintext
shared/interfaces/navbar.interface.ts
shared/interfaces/button.interface.ts
```

Rules:

* Avoid inline interfaces.
* Reuse existing interfaces.

---

## 6. Reusable Component Detection

Before generating code:

1. Detect reusable UI.
2. Extract repeated JSX.
3. Move reusable parts into `shared/components`.

Avoid duplication.

---

## 7. Page Responsibility Rules

Pages should only contain:

* Routing
* Composition
* Data orchestration

Move out:

* UI rendering
* Static data
* Shared interfaces

Example:

```tsx
function DashboardPage() {
  return <DashboardContainer />;
}

export default DashboardPage;
```

---

## 8. Validation Before Generation

Before generating output:

1. Validate page naming.
2. Validate App Router placement.
3. Extract static data.
4. Extract shared components.
5. Generate interfaces under `shared/interfaces`.

Preferred structure:

```plaintext
app/
shared/
├── components/
├── interfaces/
└── constants/
```

Avoid:

```plaintext
pages/
components/common/
types/
constants/
```

unless explicitly requested.
