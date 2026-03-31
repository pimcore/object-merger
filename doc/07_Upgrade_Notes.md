# Upgrade Notes

## 2026.1.0

### Removed Admin Classic / ExtJS Support

- Removed all ExtJS/Admin Classic UI related implementations. The bundle no longer implements
  `PimcoreBundleAdminClassicInterface` and no longer uses the `BundleAdminClassicTrait`.
- Removed `src/Controller/AdminController.php` — the ExtJS-based merge controller is no longer available.
- Removed ExtJS JavaScript assets (`src/Resources/public/js/plugin.js`, `panel.js`, `grideditor.js`)
  and CSS assets (`admin.css`, `icons.css`) along with related image files.
- Removed the ExtJS Admin routing entry from `pimcore/routing.yml`.
- `ObjectMergerBundle` no longer implements `PimcoreBundleAdminClassicInterface` and no longer provides
  `getCssPaths()` / `getJsPaths()` methods. Custom code referencing these must be removed.
- Studio UI configuration (`studio_ui.yaml`) is now always loaded unconditionally,
  removing the previous conditional check for the `pimcore_studio_ui` extension.

### PHP / Platform Requirements

- Added support for `PHP` `8.5`.
- Removed support for `PHP` `8.3` and Symfony `v6`.
