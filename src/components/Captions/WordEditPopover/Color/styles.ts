import { createUseStyles } from 'react-jss';

interface ColorPickerItemProps {
  color: string;
  selected: boolean;
}

const useStyles = createUseStyles(
  {
    container: {
      width: 30,
      height: 30,
      borderRadius: 14,
      backgroundColor: ({ color }: ColorPickerItemProps) => color,
      cursor: 'pointer',
      border: ({ selected }: ColorPickerItemProps) => `2px solid ${selected ? '#fff' : 'transparent'}`,
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  },
  { name: 'color-picker-item' },
);

export default useStyles;
