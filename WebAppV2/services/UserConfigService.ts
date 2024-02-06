import store from '@/store';
import { configActions } from '@/store/actions';
import { IConfigState } from '@/store/state/config.state';
import StorageService from './StorageService';

const KEY_BASE = 'CONFIG';
const KEY_DARK_MODE = [KEY_BASE, 'DARK_MODE'].join('_');
const KEY_SIDEBAR_COLLAPSED = [KEY_BASE, 'SIDEBAR_COLLAPSED'].join('_');

/** Service that manages user config */
class UserConfigService extends StorageService {
  constructor() {
    super();
    const dark = this.getData(KEY_DARK_MODE) === 'true';
    const sidebarCollapsed = this.getData(KEY_SIDEBAR_COLLAPSED) === 'true';
    store.dispatch(configActions.set({ dark, sidebarCollapsed }));
  }

  /** Sets state of a dark mode to false */
  turnDarkModeOf() {
    store.dispatch(configActions.set({ 'dark': false }));
    this.saveData(KEY_DARK_MODE, false.toString());
  }

  /** Sets state of dark mode to given value
   * @param key The key to set state of
   * @param value The value to set the key to
   */
  private set(key: keyof IConfigState, value: number | string | boolean) {
    store.dispatch(configActions.set({ [key]: value }));
    const storageKey = key === 'dark' ? KEY_DARK_MODE : KEY_SIDEBAR_COLLAPSED;
    this.saveData(storageKey, value.toString());
  }

  /** Toggles state of given key
   * @param key The key of data to toggle state of
   */
  private toggle(key: keyof IConfigState) {
    const state = store.getState().config[key];
    this.set(key, !state);
    return !state;
  }

  /** Toggles dark mode on or off */
  toggleTheme = () => this.toggle('dark');

  /** Toggles sidebar collapse state */
  toggleSidebar = () => this.toggle('sidebarCollapsed');
}

export default new UserConfigService();
