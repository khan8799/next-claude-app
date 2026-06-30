---

name: feature-scaffold
description: Scaffold a new feature following this project's module/route architecture. Creates the app route, module folder, interface file, and barrel export in the correct locations.

---

When the user asks to scaffold, create, or add a new feature/module, follow this exact structure. Never deviate unless the user explicitly overrides a rule.

## Project Architecture Overview

```
app/
├── (roles)/
│   ├── admin/
│   │   └── <feature>/
│   │       └── page.tsx          ← Route page (thin, delegates to view)
│   └── manager/
│       └── <feature>/
│           └── page.tsx
├── auth/
│   └── <route>/
│       └── page.tsx
├── layout.tsx
└── page.tsx

modules/
└── <role>/                        ← Mirrors the role from app/(roles)/<role>
    └── <feature>/
        ├── <feature>.interface.ts ← TypeScript interfaces for this feature
        └── components/
            └── index.ts           ← Barrel export

shared/
├── components/                    ← Reusable across all features
├── constants/                     ← Static data, never inline in components
└── interfaces/                    ← Interfaces reused across features
```

---

## Step-by-Step Scaffolding Rules

### Step 1 — Determine the role and feature name

Ask or infer from context:
- **role**: `admin`, `manager`, or another role that exists under `app/(roles)/`
- **feature**: the domain being added (e.g., `branch`, `employee`, `report`)

### Step 2 — Create the route page

**Path:** `app/(roles)/<role>/<feature>/page.tsx`

```tsx
export default function <Feature>Page() {
  return <div><Feature> page</div>;
}
```

Rules:
- Component name must be `<Feature>Page` (PascalCase feature + "Page")
- Keep pages thin — no UI logic, no inline data
- Server Component by default (no `'use client'`)

### Step 3 — Create the module folder

**Path:** `modules/<role>/<feature>/`

#### 3a. Interface file

**Path:** `modules/<role>/<feature>/<feature>.interface.ts`

```ts
export interface <Feature> {
  id: string
  // add domain-specific fields
}
```

Naming: `<feature>.interface.ts` (lowercase, dot-separated)

#### 3b. Components barrel export

**Path:** `modules/<role>/<feature>/components/index.ts`

```ts
// Export feature-specific components here
// export { default as <Feature>Card } from './<Feature>Card'
```

Start with a commented example export. Add real exports as components are created.

---

## Path Alias Reference

| Alias | Resolves to | Example import |
|-------|-------------|----------------|
| `@/*` | `./app/*` | `import Navbar from '@/shared/components/Navbar'` |
| `@admin/*` | `./modules/admin/*` | `import { Branch } from '@admin/branch/branch.interface'` |

When importing from `modules/admin/`, use the `@admin/` alias.
For other roles (e.g., manager), use relative imports until a dedicated alias is added to `tsconfig.json`.

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|------------|---------|
| Page component | `<Feature>Page` | `BranchPage` |
| Interface file | `<feature>.interface.ts` | `branch.interface.ts` |
| Interface type | `<Feature>` | `Branch` |
| Constants file | `<feature>.constant.ts` | `branch.constant.ts` |
| Component file | PascalCase | `BranchCard.tsx` |
| Folder names | lowercase | `branch/`, `components/` |
| Route groups | `(<group>)` | `(roles)/` |

---

## What Goes Where

| Content | Location |
|---------|----------|
| Route pages | `app/(roles)/<role>/<feature>/page.tsx` |
| Feature interfaces | `modules/<role>/<feature>/<feature>.interface.ts` |
| Feature components | `modules/<role>/<feature>/components/` |
| Shared/reusable UI | `shared/components/` |
| Cross-feature interfaces | `shared/interfaces/` |
| Static/constant data | `shared/constants/<feature>.constant.ts` |

---

## Client vs Server Components

- Default to **Server Components** (no directive needed)
- Add `'use client'` only when the component uses:
  - `useState` / `useEffect` / other React hooks
  - Browser event handlers (`onClick`, `onChange`, etc.)
  - Browser-only APIs

---

## Validation Checklist Before Generating

1. [ ] Role folder exists under `app/(roles)/` — create if missing
2. [ ] Page component name matches `<Feature>Page`
3. [ ] Interface file uses `<feature>.interface.ts` naming
4. [ ] No static data inlined in the page — extract to `shared/constants/`
5. [ ] `components/index.ts` barrel file created
6. [ ] Correct path alias used in imports (`@admin/*` for admin modules)

---

## Example — Scaffolding an "employee" feature under "admin"

Files to create:

```
app/(roles)/admin/employee/page.tsx
modules/admin/employee/employee.interface.ts
modules/admin/employee/components/index.ts
```

`app/(roles)/admin/employee/page.tsx`
```tsx
export default function EmployeePage() {
  return <div>Employee page</div>;
}
```

`modules/admin/employee/employee.interface.ts`
```ts
export interface Employee {
  id: string
  name: string
  role: string
}
```

`modules/admin/employee/components/index.ts`
```ts
// export { default as EmployeeCard } from './EmployeeCard'
```
