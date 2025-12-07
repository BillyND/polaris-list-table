# Polaris List Table

[![npm version](https://img.shields.io/npm/v/polaris-list-table.svg)](https://www.npmjs.com/package/polaris-list-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete, production-ready data table component for Shopify Polaris with advanced filtering, sorting, pagination, and URL synchronization. Perfect for building admin interfaces with complex data management needs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Client-Side vs Server-Side](#client-side-vs-server-side)
- [API Reference](#api-reference)
- [Custom Model](#custom-model)
- [Advanced Usage](#advanced-usage)
- [TypeScript Support](#typescript-support)
- [Backend Integration](#backend-integration)
- [Troubleshooting](#troubleshooting)

## Features

- ✅ **Full-featured Data Table** - Built on Shopify Polaris `IndexTable` component
- ✅ **Advanced Filtering** - Custom filters with query search, applied filters display
- ✅ **Sorting** - Multi-column sorting support
- ✅ **Pagination** - Built-in pagination with customizable page size
- ✅ **URL Synchronization** - All filters, sorting, and pagination state synced with URL
- ✅ **View Management** - Save, update, delete, and rename custom views
- ✅ **Row Selection** - Single and bulk selection with actions
- ✅ **Local & Remote Data** - Support for both local data arrays and remote API endpoints
- ✅ **Mongoose Integration** - Seamless integration with `mongoose-url-query` for backend queries
- ✅ **TypeScript** - Fully typed with comprehensive TypeScript definitions
- ✅ **Customizable** - Highly configurable with hooks and HOC patterns
- ✅ **Custom Models** - Create custom Mongoose models with additional fields

## Installation

### Basic Installation

```bash
npm install polaris-list-table
# or
yarn add polaris-list-table
# or
pnpm add polaris-list-table
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
# Required
npm install @shopify/polaris react

# Optional: Only needed for server-side view management
npm install mongoose
```

**Version Requirements:**

- `@shopify/polaris`: `^12.0.0 || ^13.0.0`
- `react`: `^18.0.0`
- `mongoose`: `^7.0.0 || ^8.0.0` (optional, server-side only)

## Quick Start

### Basic Example

```tsx
import { ListTable } from 'polaris-list-table';
import { IndexTable } from '@shopify/polaris';

function UsersTable() {
  const headings = [{ title: 'Name' }, { title: 'Email' }, { title: 'Status' }];

  return (
    <ListTable
      endpoint="/api/users"
      queryKey="name"
      headings={headings}
      renderRowMarkup={(item, index, selectedResources) => (
        <IndexTable.Row
          id={item.id}
          selected={selectedResources?.includes(item.id)}
          position={index}
        >
          <IndexTable.Cell>{item.name}</IndexTable.Cell>
          <IndexTable.Cell>{item.email}</IndexTable.Cell>
          <IndexTable.Cell>{item.status}</IndexTable.Cell>
        </IndexTable.Row>
      )}
    />
  );
}
```

### With Custom Filters

```tsx
import { ListTable } from 'polaris-list-table';
import { ChoiceList } from '@shopify/polaris';

function UsersTable() {
  const headings = [{ title: 'Name' }, { title: 'Email' }, { title: 'Status' }];

  const filters = [
    {
      key: 'status',
      label: 'Status',
      shortcut: true,
      filter: {
        Component: ChoiceList,
        props: {
          title: 'Status',
          choices: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
      },
    },
  ];

  return (
    <ListTable
      endpoint="/api/users"
      queryKey="name"
      headings={headings}
      filters={filters}
      renderRowMarkup={(item, index, selectedResources) => (
        <IndexTable.Row
          id={item.id}
          selected={selectedResources?.includes(item.id)}
          position={index}
        >
          <IndexTable.Cell>{item.name}</IndexTable.Cell>
          <IndexTable.Cell>{item.email}</IndexTable.Cell>
          <IndexTable.Cell>{item.status}</IndexTable.Cell>
        </IndexTable.Row>
      )}
    />
  );
}
```

### With Local Data

```tsx
import { ListTable } from 'polaris-list-table';

function LocalDataTable() {
  const localData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <ListTable
      onlyLocalData
      localData={localData}
      queryKey="name"
      headings={[{ title: 'Name' }, { title: 'Email' }]}
      renderRowMarkup={(item, index) => (
        <IndexTable.Row id={item.id} position={index}>
          <IndexTable.Cell>{item.name}</IndexTable.Cell>
          <IndexTable.Cell>{item.email}</IndexTable.Cell>
        </IndexTable.Row>
      )}
    />
  );
}
```

## Client-Side vs Server-Side

This library includes both **client-side** and **server-side** code. It's crucial to understand the distinction to avoid bundling issues.

### Client-Side Exports (Main Entry)

**Import from:** `polaris-list-table`

These can be safely used in React components, browser code, and client-side bundles:

```tsx
// ✅ Safe for client-side
import {
  ListTable,
  useDataSource,
  useSelection,
  usePagination,
  VIEW_ACTIONS,
} from 'polaris-list-table';

import type { ListTableProps, ListTableView, ListTableFilter } from 'polaris-list-table';
```

**Available Exports:**

- `ListTable` - Main table component
- `useDataSource` - Hook for data fetching and state management
- `useSelection` - Hook for row selection
- `usePagination` - Hook for pagination
- `VIEW_ACTIONS` - Constants for view actions
- All TypeScript types

### Server-Side Exports (Subpath)

**Import from:** `polaris-list-table/server` or specific subpaths

⚠️ **IMPORTANT**: These utilities are **SERVER-SIDE ONLY** and should **NOT** be imported in client-side code:

```typescript
// ✅ Server-side only (API routes, Express handlers, Next.js API routes)
import {
  ViewModel,
  createViewModel,
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from 'polaris-list-table/server';

// Or import from specific subpaths
import { ViewModel } from 'polaris-list-table/models/View';
import { createViewModel } from 'polaris-list-table/models/createViewModel';
import { serverGetViews } from 'polaris-list-table/server/views';
```

**Available Subpath Exports:**

| Subpath                                     | Exports                      | Use Case                   |
| ------------------------------------------- | ---------------------------- | -------------------------- |
| `polaris-list-table/server`                 | All server-side exports      | Full server-side utilities |
| `polaris-list-table/models/View`            | `ViewModel`, `IView`         | Default Mongoose model     |
| `polaris-list-table/models/createViewModel` | `createViewModel`, utilities | Custom model factory       |
| `polaris-list-table/server/views`           | Server utility functions     | View CRUD operations       |

**Where to use server-side code:**

- ✅ Express.js API routes
- ✅ Next.js API routes (`/pages/api/*` or `/app/api/*`)
- ✅ Node.js backend services
- ✅ Server-side middleware

**Where NOT to use server-side code:**

- ❌ React components
- ❌ Client-side hooks
- ❌ Browser bundles
- ❌ Frontend JavaScript files

## API Reference

### ListTable Component

The main component for rendering data tables.

#### Props

| Prop                  | Type                                                     | Default        | Required | Description                                                              |
| --------------------- | -------------------------------------------------------- | -------------- | -------- | ------------------------------------------------------------------------ |
| `endpoint`            | `string`                                                 | -              | No\*     | API endpoint for fetching data (\*required if not using `onlyLocalData`) |
| `queryKey`            | `string`                                                 | -              | Yes      | Field name used for search queries                                       |
| `headings`            | `NonEmptyArray<IndexTableHeading>`                       | -              | Yes      | Table column headings                                                    |
| `renderRowMarkup`     | `(item, idx, selectedResources?, context?) => ReactNode` | -              | Yes      | Function to render table rows                                            |
| `filters`             | `ListTableFilter[]`                                      | `[]`           | No       | Array of filter definitions                                              |
| `views`               | `ListTableView[]`                                        | -              | No       | Pre-defined views                                                        |
| `defaultViews`        | `ListTableView[]`                                        | `[]`           | No       | Default views to show                                                    |
| `viewsEndpoint`       | `string`                                                 | -              | No       | API endpoint for view management                                         |
| `limit`               | `number`                                                 | `50`           | No       | Items per page                                                           |
| `condensed`           | `boolean`                                                | `false`        | No       | Use condensed table layout                                               |
| `selectable`          | `boolean`                                                | `false`        | No       | Enable row selection                                                     |
| `showBorder`          | `boolean`                                                | `true`         | No       | Show card border                                                         |
| `showFilter`          | `boolean`                                                | `true`         | No       | Show filter bar                                                          |
| `showPagination`      | `boolean`                                                | `true`         | No       | Show pagination controls                                                 |
| `bulkActions`         | `BulkActionsProps['actions']`                            | -              | No       | Bulk action buttons                                                      |
| `promotedBulkActions` | `BulkActionsProps['promotedActions']`                    | -              | No       | Promoted bulk actions                                                    |
| `sortOptions`         | `IndexFiltersProps['sortOptions']`                       | -              | No       | Available sort options                                                   |
| `resourceName`        | `{ singular: string; plural: string }`                   | -              | No       | Resource names for bulk actions                                          |
| `emptyState`          | `ReactNode`                                              | -              | No       | Custom empty state component                                             |
| `localData`           | `T[]`                                                    | -              | No       | Local data array (for local mode)                                        |
| `onlyLocalData`       | `boolean`                                                | `false`        | No       | Use local data only                                                      |
| `syncWithUrl`         | `boolean`                                                | `true`         | No       | Sync state with URL parameters                                           |
| `fetchFunction`       | `(url, options?) => Promise<Response>`                   | `defaultFetch` | No       | Custom fetch function                                                    |
| `fetchFn`             | `(url, options?) => Promise<Response>`                   | -              | No       | Alias for `fetchFunction`                                                |
| `queryPlaceholder`    | `string`                                                 | -              | No       | Placeholder text for search input                                        |
| `loadingComponent`    | `ReactNode`                                              | -              | No       | Custom loading component                                                 |
| `onDataChange`        | `(data: ListTableData) => void`                          | -              | No       | Callback when data changes                                               |
| `setListTableData`    | `Dispatch<SetStateAction<ListTableData>>`                | -              | No       | State setter for table data                                              |
| `error`               | `Error`                                                  | -              | No       | Error object to display                                                  |
| `renderFilterLabel`   | `(key: string, value: string \| any[]) => string`        | -              | No       | Custom filter label renderer                                             |

### Hooks

#### useDataSource

Hook for managing data fetching, filtering, sorting, and pagination.

```tsx
import { useDataSource } from 'polaris-list-table';

const {
  // State
  items,
  total,
  loading,
  firstLoad,
  error,
  state,

  // Actions
  setPage,
  setQueryValue,
  setFilter,
  setFilters,
  clearFilters,
  setSort,
  setSelectedView,
  setViewSelected,
  refresh,

  // Polaris helpers
  tabs,
  sortOptions,
  sortSelected,
  onSort,

  // Pagination helpers
  pagination,
} = useDataSource({
  endpoint: '/api/users',
  queryKey: 'name',
  defaultSort: { field: 'createdAt', direction: 'desc' },
  defaultLimit: 50,
  syncWithUrl: true,
  fetchFn: customFetch,
});
```

**Options:**

- `endpoint` (string, required) - API endpoint URL
- `queryKey` (string, required) - Field name for search queries
- `defaultSort` (SortDefinition, optional) - Default sort configuration
- `defaultLimit` (number, optional) - Default items per page
- `defaultViews` (ViewDefinition[], optional) - Default views
- `syncWithUrl` (boolean, optional) - Enable URL synchronization
- `localData` (T[], optional) - Local data array
- `transformResponse` (function, optional) - Transform API response
- `fetchFn` (function, optional) - Custom fetch function
- `debounceMs` (number, optional) - Debounce delay for search (default: 300ms)

#### useSelection

Hook for managing row selection in tables.

```tsx
import { useSelection } from 'polaris-list-table';

const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
  useSelection(items);
```

#### usePagination

Hook for managing pagination state and actions.

```tsx
import { usePagination } from 'polaris-list-table';

const { page, totalPages, hasPrevious, hasNext, onPrevious, onNext, goToPage, label } =
  usePagination({
    page: 1,
    limit: 50,
    total: 100,
    onPageChange: (page) => setPage(page),
  });
```

## Custom Model

You can create custom Mongoose models with additional fields using the `createViewModel` factory function.

### Basic Custom Model

```typescript
import { createViewModel } from 'polaris-list-table/server';
import { Schema } from 'mongoose';

// Create custom model with additional fields
const CustomViewModel = createViewModel({
  modelName: 'CustomView',
  collectionName: 'custom_views',
  schemaOptions: {
    description: { type: String },
    category: { type: String, index: true },
    isPublic: { type: Boolean, default: false },
  },
});
```

### Advanced Custom Model

```typescript
import { createViewModel } from 'polaris-list-table/server';
import { Schema } from 'mongoose';

const ExtendedViewModel = createViewModel({
  modelName: 'ExtendedView',
  collectionName: 'extended_views',

  // Add multiple custom fields - no limit!
  schemaOptions: {
    // String fields
    description: { type: String },
    category: { type: String, index: true },
    status: { type: String, default: 'active' },

    // Number fields
    priority: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5 },

    // Boolean fields
    isPublic: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },

    // Array fields
    tags: [{ type: String }],
    permissions: [{ type: String }],
    relatedIds: [{ type: Schema.Types.ObjectId }],

    // Object/Mixed fields
    metadata: { type: Schema.Types.Mixed, default: {} },
    settings: { type: Schema.Types.Mixed },
    config: { type: Schema.Types.Mixed },

    // Reference fields
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },

    // Date fields
    lastAccessed: { type: Date },
    expiresAt: { type: Date, index: true },
    publishedAt: { type: Date },

    // Nested objects
    location: {
      country: { type: String },
      city: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
  },

  // Add custom indexes
  additionalIndexes: [
    { fields: { category: 1, isPublic: 1 } },
    { fields: { tags: 1 } },
    { fields: { createdBy: 1, priority: -1 } },
    { fields: { expiresAt: 1 }, options: { expireAfterSeconds: 0 } }, // TTL index
  ],

  // Custom schema options
  mongooseSchemaOptions: {
    timestamps: true,
    // ... other Mongoose schema options
  },
});

// Use the custom model
const views = await ExtendedViewModel.find({ path: '/admin/users' });
```

### Using Base Schema Utilities

```typescript
import {
  createViewModel,
  baseViewSchemaDefinition,
  createBaseViewIndexes,
} from 'polaris-list-table/server';
import { Schema } from 'mongoose';

// Extend base schema manually
const customSchema = new Schema(
  {
    ...baseViewSchemaDefinition,
    customField: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Add base indexes
createBaseViewIndexes(customSchema);

// Create model
const CustomViewModel = model('CustomView', customSchema);
```

## Advanced Usage

### Custom Fetch Function

```tsx
const customFetch = async (url: string, options?: RequestInit) => {
  const token = getAuthToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

<ListTable
  endpoint="/api/users"
  queryKey="name"
  fetchFn={customFetch}
  // ...
/>;
```

### Transform Response

```tsx
const { items, total } = useDataSource({
  endpoint: '/api/users',
  queryKey: 'name',
  transformResponse: (response: any) => ({
    items: response.data,
    total: response.meta.total,
  }),
});
```

### Custom Filter Labels

```tsx
<ListTable
  renderFilterLabel={(key, value) => {
    if (key === 'status') {
      return `Status: ${value.join(', ')}`;
    }
    return `${key}: ${value}`;
  }}
  // ...
/>
```

### Disable URL Synchronization

```tsx
<ListTable
  syncWithUrl={false}
  // ...
/>
```

### With View Management

```tsx
<ListTable
  endpoint="/api/users"
  queryKey="name"
  viewsEndpoint="/api/views"
  headings={headings}
  renderRowMarkup={renderRowMarkup}
/>
```

## TypeScript Support

This library is fully typed with TypeScript. All exports include type definitions.

### Type Definitions

```typescript
// Component props
import type { ListTableProps } from 'polaris-list-table';

// Data types
import type {
  ListTableView,
  ListTableFilter,
  ListTableData,
  ListTableState,
} from 'polaris-list-table';

// Hook types
import type {
  UseDataSourceOptions,
  UseDataSourceReturn,
  UseSelectionReturn,
  UsePaginationReturn,
} from 'polaris-list-table';

// Server-side types
import type { IView, CreateViewModelOptions } from 'polaris-list-table/server';
```

### Generic Types

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

function UsersTable() {
  return (
    <ListTable<User>
      endpoint="/api/users"
      queryKey="name"
      headings={headings}
      renderRowMarkup={(item: User, index) => (
        // item is typed as User
      )}
    />
  );
}
```

## Backend Integration

### API Response Format

Your backend API should return data in the following format:

```json
{
  "items": [...],
  "total": 100
}
```

### Query Parameters

This library uses `mongoose-url-query` format for query parameters:

- **Pagination**: `?page=1&limit=50`
- **Sorting**: `?sort=name|asc` or `?sort=createdAt|desc`
- **Filters**: `?filter_status=active&filter_category=electronics`
- **Query Search**: `?query=search+term`

### Example Backend Route (Express)

```typescript
import express from 'express';
import { buildQuery } from 'mongoose-url-query';
import { User } from './models/User';

const app = express();

app.get('/api/users', async (req, res) => {
  const { page, limit, sort, filters, query } = req.query;

  // Build query using mongoose-url-query
  const mongooseQuery = buildQuery(User.find(), {
    page: Number(page) || 1,
    limit: Number(limit) || 50,
    sort: sort as string,
    filters: filters as Record<string, any>,
    query: query as string,
    queryKey: 'name', // Field to search
  });

  const [items, total] = await Promise.all([
    mongooseQuery.exec(),
    User.countDocuments(mongooseQuery.getQuery()),
  ]);

  res.json({ items, total });
});
```

### View Management API

The library expects a views endpoint that handles the following actions:

#### GET /api/views

Get all views for a path.

**Query Parameters:**

- `path` (required) - The path to get views for
- `action` (optional) - Action to perform (`deleteView`, `renameView`)

**Response:**

```json
{
  "items": [
    {
      "name": "My View",
      "filters": {
        "queryValue": "search",
        "status": "active"
      }
    }
  ]
}
```

#### POST /api/views

Create a new view.

**Query Parameters:**

- `path` (required)
- `action=createView` (required)
- `name` (required) - View name

**Body:**

```json
{
  "queryValue": "search",
  "status": "active"
}
```

#### PUT /api/views

Update an existing view.

**Query Parameters:**

- `path` (required)
- `action=updateView` (required)
- `name` (required) - View name

**Body:**

```json
{
  "queryValue": "new search",
  "status": "inactive"
}
```

### Example Backend Implementation

```typescript
// ✅ Server-side only - import in your API routes
import {
  ViewModel,
  VIEW_ACTIONS,
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from 'polaris-list-table/server';

// GET /api/views
app.get('/api/views', async (req, res) => {
  const { path, action, name, oldName, newName } = req.query;
  const ownerId = req.user?.id; // Get from auth middleware

  if (action) {
    switch (action) {
      case VIEW_ACTIONS.DELETE:
        await serverDeleteView(path as string, name as string, ViewModel, ownerId);
        return res.json({ success: true });
      case VIEW_ACTIONS.RENAME:
        await serverRenameView(
          path as string,
          oldName as string,
          newName as string,
          ViewModel,
          ownerId
        );
        return res.json({ success: true });
    }
  }

  // Default: get all views
  const views = await serverGetViews(path as string, ViewModel, ownerId);
  res.json({ items: views });
});

// POST /api/views
app.post('/api/views', async (req, res) => {
  const { path, action, name } = req.query;
  const ownerId = req.user?.id;

  if (action === VIEW_ACTIONS.CREATE) {
    await serverCreateView(path as string, name as string, req.body, ViewModel, ownerId);
    return res.json({ success: true });
  }

  res.status(400).json({ error: 'Invalid action' });
});

// PUT /api/views
app.put('/api/views', async (req, res) => {
  const { path, action, name } = req.query;
  const ownerId = req.user?.id;

  if (action === VIEW_ACTIONS.UPDATE) {
    await serverUpdateView(path as string, name as string, req.body, ViewModel, ownerId);
    return res.json({ success: true });
  }

  res.status(400).json({ error: 'Invalid action' });
});
```

### Next.js API Route Example

```typescript
// pages/api/views.ts or app/api/views/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ViewModel,
  VIEW_ACTIONS,
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from 'polaris-list-table/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path, action, name, oldName, newName } = req.query;
  const ownerId = req.session?.user?.id; // Get from session

  try {
    if (req.method === 'GET') {
      if (action === VIEW_ACTIONS.DELETE) {
        await serverDeleteView(path as string, name as string, ViewModel, ownerId);
        return res.json({ success: true });
      }
      if (action === VIEW_ACTIONS.RENAME) {
        await serverRenameView(
          path as string,
          oldName as string,
          newName as string,
          ViewModel,
          ownerId
        );
        return res.json({ success: true });
      }
      const views = await serverGetViews(path as string, ViewModel, ownerId);
      return res.json({ items: views });
    }

    if (req.method === 'POST' && action === VIEW_ACTIONS.CREATE) {
      await serverCreateView(path as string, name as string, req.body, ViewModel, ownerId);
      return res.json({ success: true });
    }

    if (req.method === 'PUT' && action === VIEW_ACTIONS.UPDATE) {
      await serverUpdateView(path as string, name as string, req.body, ViewModel, ownerId);
      return res.json({ success: true });
    }

    res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Mongoose Error in Client-Side Code

**Error:** `The requested module 'mongoose' does not provide an export named 'models'`

**Solution:** Make sure you're importing server-side code only in server-side files. Use subpath exports:

```typescript
// ❌ Wrong - in client-side code
import { ViewModel } from 'polaris-list-table';

// ✅ Correct - in server-side code
import { ViewModel } from 'polaris-list-table/server';
```

#### 2. Bundle Size Issues

**Problem:** Client bundle includes mongoose code

**Solution:** The library now separates client and server code. Make sure you're using the correct imports:

```typescript
// ✅ Client-side (no mongoose)
import { ListTable } from 'polaris-list-table';

// ✅ Server-side (with mongoose)
import { ViewModel } from 'polaris-list-table/server';
```

#### 3. TypeScript Errors

**Problem:** Type errors when using custom types

**Solution:** Use generic types:

```tsx
<ListTable<YourType>
// ...
/>
```

#### 4. View Management Not Working

**Problem:** Views endpoint not responding correctly

**Solution:**

- Check that your API endpoint matches the expected format
- Ensure `viewsEndpoint` prop is set correctly
- Verify server-side utilities are imported correctly
- Check that MongoDB connection is established

#### 5. URL Synchronization Issues

**Problem:** URL parameters not updating

**Solution:**

- Ensure `syncWithUrl={true}` (default)
- Check browser URL encoding
- Verify router compatibility (works with Next.js, React Router, etc.)

## Performance Considerations

- **Debouncing**: Search queries are debounced (default: 300ms) to reduce API calls
- **Request Cancellation**: Previous requests are automatically cancelled when new ones are made
- **Memoization**: Hooks use React memoization to prevent unnecessary re-renders
- **Optimized Queries**: Server utilities use optimized Mongoose queries with proper indexing
- **Tree Shaking**: Library supports tree shaking - only import what you need

## Browser Support

This library supports all modern browsers that support:

- ES6+ features
- Fetch API
- URLSearchParams API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Changelog

### 1.2.0

- ✨ Added `createViewModel` factory function for custom models
- ✨ Added subpath exports for better client/server separation
- 🐛 Fixed mongoose import issues in client-side bundles
- 📚 Improved documentation and examples
- 🔧 Better TypeScript support

### 1.1.5

- 🐛 Fixed mongoose models access in ESM environments
- 🔧 Improved error handling

### 1.1.4

- 🐛 Fixed mongoose import error in browser environments
- 🔧 Better handling of mongoose.default in ESM

### 1.1.3

- 🐛 Fixed mongoose.models import issue

### 1.1.1

- Initial release
- Full TypeScript support
- View management
- URL synchronization
- Local and remote data support
