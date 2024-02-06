import React, { HTMLProps, useCallback, useEffect, useState } from 'react';
import Stack from '../Stack';

/** Type for tab item */
export type TabsItemType = {
  /** Label of the tab */
  label: string;
  /** Unique ID of the tab */
  key: string;
  /** If the tab should be disabled */
  disabled?: boolean;
};

/** Props for single tab item component */
export type TabItemPropsType<T extends HTMLElement = HTMLElement> =
  HTMLProps<T> & {
    /** Data for the tab */
    item: TabsItemType;
    /** If the tab is active */
    active: boolean;
  };

/** Type for TabsBase component props */
export type TabsBasePropsType<T extends HTMLElement = HTMLElement> = {
  /** List of tabs to render */
  tabs: TabsItemType[];
  /** Called when active tab is changed
   * @param key Key of the new active tab
   * @param prev Key of the previous active tab
   */
  onChange?: (key: string, prev: string) => void;
  /** If the tabs should take full horizontal space */
  fullWidth?: boolean;
  /** Component that shows a tab item */
  Tab: (props: TabItemPropsType<T>) => React.ReactNode;
};

/** Provides base component for horizontal tab list items.
 * Handles state management while allowing custom tab components
 * to be plugged in through the `Tab` prop.
 */
export default function TabsBase<T extends HTMLElement>({
  tabs,
  onChange,
  fullWidth,
  Tab,
}: TabsBasePropsType<T>) {
  const [active, _setActive] = useState(tabs[0]?.key || '');

  /** Used to set active state. Triggers onChange event */
  const setActive = useCallback(
    (key: string) => {
      if (
        key === active ||
        tabs.length === 0 ||
        tabs.find((t) => t.key === key)?.disabled
      )
        return;
      onChange?.(key, active);
      _setActive(key);
    },
    [active, onChange, tabs],
  );

  // Adjust active tab whenever tabs state is changed
  useEffect(() => {
    if (tabs.length === 0) {
      setActive('');
      return;
    }
    const isDisabled = tabs.find((t) => t.key === active)?.disabled;
    const firstActive = tabs.find((t) => !t.disabled);
    if (!firstActive) {
      setActive('');
      return;
    }
    if (isDisabled) {
      setActive(firstActive.key);
    }
  }, [tabs, setActive, active]);

  return (
    <Stack isRow className={`overflow-x-auto${fullWidth ? ' w-full' : ''}`}>
      {tabs.map((t) => (
        <Tab
          key={t.key}
          item={t}
          active={t.key === active}
          onClick={() => setActive(t.key)}
        />
      ))}
    </Stack>
  );
}
