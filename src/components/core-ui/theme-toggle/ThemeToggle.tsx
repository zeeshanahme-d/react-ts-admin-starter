import { LuMoon, LuSun } from 'react-icons/lu';

import { Button } from 'antd';
import { useTheme } from 'store/useTheme';
import twc from 'tw-classnames';

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      className={twc(
        'flex items-center justify-center rounded-sm w-7.5 h-7.5 p-0 text-icon-primary hover:bg-surface-hover transition-colors',
        className
      )}
    >
      {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
    </Button>
  );
}

export default ThemeToggle;
