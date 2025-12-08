// Mongoose Models (SERVER-SIDE ONLY)
export { ViewModel } from './models/View';

// Factory function for creating custom models
export {
  createViewModel,
  baseViewSchemaDefinition,
  createBaseViewIndexes,
} from './models/createViewModel';

// Server utilities (SERVER-SIDE ONLY)
export {
  serverGetViews,
  serverCreateView,
  serverUpdateView,
  serverDeleteView,
  serverRenameView,
} from './utils/views.server';
