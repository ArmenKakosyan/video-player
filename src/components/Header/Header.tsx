import { memo } from 'react';
import useStyles from './styles';
import { FiArrowLeft } from 'react-icons/fi';

const Header = () => {
  const classes = useStyles();

  const handleBackClick = () => {
    // TODO: add back click handling
    window.history.back();
  };

  return (
    <header className={classes.container}>
      <FiArrowLeft className={classes.backButton} size={24} onClick={handleBackClick} />
      <h1 className={classes.title}>From Zero to $150 Million: The Risky Journey</h1>
    </header>
  );
};

export default memo(Header);
