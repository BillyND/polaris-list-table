// Server-side exports only - includes mongoose dependencies
// ⚠️ IMPORTANT: These exports should ONLY be used in server-side code

// Types (no mongoose dependency)
export type { IView } from './models/View';
export type { ListTableView, ListTableFilter, ListTableState } from './types';

// Mongoose Model (SERVER-SIDE ONLY)
export { ViewModel } from './models/View';

// Factory function for creating custom models
export {
  createViewModel,
  baseViewSchemaDefinition,
  createBaseViewIndexes,
} from './models/createViewModel';
export type { CreateViewModelOptions } from './models/createViewModel';

// Server utilities (SERVER-SIDE ONLY)
export {
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from './server/views';
