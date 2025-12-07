# Polaris List Table

[![npm version](https://img.shields.io/npm/v/polaris-list-table.svg)](https://www.npmjs.com/package/polaris-list-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A complete, production-ready data table component for Shopify Polaris with advanced filtering, sorting, pagination, and URL synchronization. Perfect for building admin interfaces with complex data management needs.

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

## Installation

```bash
npm install polaris-list-table
# or
yarn add polaris-list-table
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install @shopify/polaris react
# Optional: for server-side view management
npm install mongoose
```

## Server-Side vs Client-Side Code

This library includes both **client-side** and **server-side** code. It's important to understand the distinction:

### Client-Side Code (React Components & Hooks)

These can be used in your React components, browser code, and client-side bundles:

- ✅ `ListTable` component
- ✅ `useDataSource` hook
- ✅ `useSelection` hook
- ✅ `usePagination` hook
- ✅ `withDataSource` HOC
- ✅ All TypeScript types

### Server-Side Code (Node.js Only)

⚠️ **IMPORTANT**: These utilities are **SERVER-SIDE ONLY** and should **NOT** be imported in client-side code:

- ❌ `ViewModel` - Mongoose model (requires MongoDB connection)
- ❌ `serverGetViews` - Database query function
- ❌ `serverCreateView` - Database write function
- ❌ `serverUpdateView` - Database update function
- ❌ `serverDeleteView` - Database delete function
- ❌ `serverRenameView` - Database update function

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

## Quick Start

### Basic Usage

```tsx
import { ListTable } from 'polaris-list-table';
import { IndexTable } from '@shopify/polaris';

function MyTable() {
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
import { TextField, ChoiceList } from '@shopify/polaris';

function MyTable() {
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

function MyTable() {
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

### With View Management

```tsx
import { ListTable } from 'polaris-list-table';

function MyTable() {
  return (
    <ListTable
      endpoint="/api/users"
      queryKey="name"
      viewsEndpoint="/api/views"
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

## API Reference

### ListTable Component

The main component for rendering data tables.

#### Props

| Prop                  | Type                                                   | Default        | Description                        |
| --------------------- | ------------------------------------------------------ | -------------- | ---------------------------------- |
| `endpoint`            | `string`                                               | -              | API endpoint for fetching data     |
| `queryKey`            | `string`                                               | **required**   | Field name used for search queries |
| `headings`            | `NonEmptyArray<IndexTableHeading>`                     | **required**   | Table column headings              |
| `renderRowMarkup`     | `(item, idx, selectedResources, context) => ReactNode` | **required**   | Function to render table rows      |
| `filters`             | `ListTableFilter[]`                                    | `[]`           | Array of filter definitions        |
| `views`               | `ListTableView[]`                                      | -              | Pre-defined views                  |
| `defaultViews`        | `ListTableView[]`                                      | `[]`           | Default views to show              |
| `viewsEndpoint`       | `string`                                               | -              | API endpoint for view management   |
| `limit`               | `number`                                               | `50`           | Items per page                     |
| `condensed`           | `boolean`                                              | `false`        | Use condensed table layout         |
| `selectable`          | `boolean`                                              | `false`        | Enable row selection               |
| `showBorder`          | `boolean`                                              | `true`         | Show card border                   |
| `showFilter`          | `boolean`                                              | `true`         | Show filter bar                    |
| `showPagination`      | `boolean`                                              | `true`         | Show pagination controls           |
| `bulkActions`         | `BulkActionsProps['actions']`                          | -              | Bulk action buttons                |
| `promotedBulkActions` | `BulkActionsProps['promotedActions']`                  | -              | Promoted bulk actions              |
| `sortOptions`         | `IndexFiltersProps['sortOptions']`                     | -              | Available sort options             |
| `resourceName`        | `{ singular: string; plural: string }`                 | -              | Resource names for bulk actions    |
| `emptyState`          | `ReactNode`                                            | -              | Custom empty state component       |
| `localData`           | `T[]`                                                  | -              | Local data array (for local mode)  |
| `onlyLocalData`       | `boolean`                                              | `false`        | Use local data only                |
| `syncWithUrl`         | `boolean`                                              | `true`         | Sync state with URL parameters     |
| `fetchFunction`       | `(url, options?) => Promise<Response>`                 | `defaultFetch` | Custom fetch function              |
| `fetchFn`             | `(url, options?) => Promise<Response>`                 | -              | Alias for `fetchFunction`          |
| `queryPlaceholder`    | `string`                                               | -              | Placeholder text for search input  |
| `loadingComponent`    | `ReactNode`                                            | -              | Custom loading component           |
| `defaultSort`         | `{ field: string; direction: 'asc' \| 'desc' }`        | -              | Default sort configuration         |
| `t`                   | `(key: string, options?) => string`                    | `defaultT`     | Translation function               |
| `onDataChange`        | `(data: ListTableData) => void`                        | -              | Callback when data changes         |
| `setListTableData`    | `Dispatch<SetStateAction<ListTableData>>`              | -              | State setter for table data        |
| `error`               | `Error`                                                | -              | Error object to display            |
| `renderFilterLabel`   | `(key: string, value: string \| any[]) => string`      | -              | Custom filter label renderer       |

### Hooks

#### useDataSource

Hook for managing data fetching, filtering, sorting, and pagination.

```tsx
import { useDataSource } from 'polaris-list-table';

const {
  items,
  total,
  loading,
  firstLoad,
  error,
  state,
  setPage,
  setQueryValue,
  setFilter,
  setFilters,
  clearFilters,
  setSort,
  setSelectedView,
  setViewSelected,
  refresh,
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

### Higher-Order Component

#### withDataSource

HOC that provides data source functionality to any component.

```tsx
import withDataSource from 'polaris-list-table/hoc/withDataSource';

const MyTable = withDataSource((props) => {
  // props now include: items, total, loading, page, etc.
  return <div>...</div>;
});
```

### Server Utilities

⚠️ **SERVER-SIDE ONLY**: These utilities are designed to run on the server side only. They require direct access to MongoDB via Mongoose and should NOT be imported in client-side code.

Server-side utilities for managing views with Mongoose.

```tsx
// ✅ Server-side only (API route, Express handler, Next.js API route, etc.)
import {
  ViewModel,
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from 'polaris-list-table';

// Get views for a path
const views = await serverGetViews('/admin/users', ViewModel, ownerId);

// Create a view
await serverCreateView('/admin/users', 'My View', { status: 'active' }, ViewModel, ownerId);

// Update a view
await serverUpdateView('/admin/users', 'My View', { status: 'inactive' }, ViewModel, ownerId);

// Delete a view
await serverDeleteView('/admin/users', 'My View', ViewModel, ownerId);

// Rename a view
await serverRenameView('/admin/users', 'Old Name', 'New Name', ViewModel, ownerId);
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
  transformResponse: (response) => ({
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

## Type Definitions

### ListTableView

```typescript
type ListTableView = {
  _id?: string;
  name: string;
  filters: {
    queryValue?: string;
    [key: string]: any;
  };
  allowActions?: ('createView' | 'updateView' | 'deleteView' | 'renameView' | 'duplicateView')[];
};
```

### ListTableFilter

```typescript
type ListTableFilter = {
  key: string;
  label: string;
  shortcut: boolean;
  filter:
    | ReactNode
    | {
        Component: React.ComponentType<any>;
        props: any;
      };
};
```

## Backend Integration

This library integrates seamlessly with `mongoose-url-query` for backend data fetching. The query format follows the mongoose-url-query specification:

- **Pagination**: `?page=1&limit=50`
- **Sorting**: `?sort=name|asc` or `?sort=createdAt|desc`
- **Filters**: `?filter_name=John&filter_status=active`
- **Query Search**: `?query=search+term`

### Example Backend Route

```typescript
import { buildQueryUrl } from 'mongoose-url-query';
import { User } from './models/User';

app.get('/api/users', async (req, res) => {
  const { page, limit, sort, filters } = req.query;

  // Use mongoose-url-query to build query
  const query = buildQuery(User.find(), {
    page,
    limit,
    sort,
    filters,
  });

  const [items, total] = await Promise.all([query.exec(), User.countDocuments(query.getQuery())]);

  res.json({ items, total });
});
```

## View Management API

The library expects a views endpoint that handles the following actions:

- `GET /api/views?path=/admin/users` - Get all views for a path
- `POST /api/views?path=/admin/users&action=createView&name=My+View` - Create a view
- `PUT /api/views?path=/admin/users&action=updateView&name=My+View` - Update a view
- `GET /api/views?path=/admin/users&action=deleteView&name=My+View` - Delete a view
- `GET /api/views?path=/admin/users&action=renameView&oldName=Old&newName=New` - Rename a view

### Example Backend Implementation

```typescript
// ✅ Server-side only - import in your API routes, Express handlers, or Next.js API routes
import {
  ViewModel,
  VIEW_ACTIONS,
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from 'polaris-list-table';

// GET /api/views?path=/admin/users - Get all views for a path
// GET /api/views?path=/admin/users&action=deleteView&name=My+View - Delete a view
// GET /api/views?path=/admin/users&action=renameView&oldName=Old&newName=New - Rename a view
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

// POST /api/views?path=/admin/users&action=createView&name=My+View - Create a view
app.post('/api/views', async (req, res) => {
  const { path, action, name } = req.query;
  const ownerId = req.user?.id;

  if (action === VIEW_ACTIONS.CREATE) {
    await serverCreateView(path as string, name as string, req.body, ViewModel, ownerId);
    return res.json({ success: true });
  }

  res.status(400).json({ error: 'Invalid action' });
});

// PUT /api/views?path=/admin/users&action=updateView&name=My+View - Update a view
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

## URL Parameters

When `syncWithUrl` is enabled, the following URL parameters are automatically managed:

- `page` - Current page number
- `sort` - Sort field and direction (e.g., `name|asc`)
- `query` - Search query value
- `filter_*` - Custom filter values (e.g., `filter_status=active`)
- `viewSelected` - Selected view name or ID

## Performance Considerations

- **Debouncing**: Search queries are debounced (default: 300ms) to reduce API calls
- **Request Cancellation**: Previous requests are automatically cancelled when new ones are made
- **Memoization**: Hooks use React memoization to prevent unnecessary re-renders
- **Optimized Queries**: Server utilities use optimized Mongoose queries with proper indexing

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

### 1.1.1

- Initial release
- Full TypeScript support
- View management
- URL synchronization
- Local and remote data support
