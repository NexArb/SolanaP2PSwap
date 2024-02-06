'use client';
import React, { useMemo } from 'react';
import { useConfigSelector } from '@/hooks/store';
import FormSwitch from '../Form/Switch';
import Typography from '../Typography';
import UserConfigService from '@/services/UserConfigService';

export type ThemeSwitchPropsType = {
  /** Forces dark or light variant */
  variant?: 'dark' | 'light';
};

/** Renders a switch used to toggle the theme */
export default function ThemeSwitch({
  variant,
}: Readonly<ThemeSwitchPropsType>) {
  const { dark: configDark } = useConfigSelector();

  const handleChange = UserConfigService.toggleTheme;

  const dark = useMemo(() => {
    if (!variant) return configDark;
    return variant === 'dark';
  }, [variant, configDark]);

  return (
    <FormSwitch
      checked={configDark}
      onChange={handleChange}
      left={
        <span className={dark ? 'text-typographyDark' : 'text-typography'}>
          <Typography subtle={configDark} text="Light" disableDefaultColor />
        </span>
      }
      right={
        <span className={dark ? 'text-typographyDark' : 'text-typography'}>
          <Typography subtle={!configDark} text="Dark" disableDefaultColor />
        </span>
      }
    />
  );
}
