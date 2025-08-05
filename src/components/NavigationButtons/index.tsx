import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from './index.module.scss';
import { ReactComponent as Icon } from './logo.svg';

interface NavigationButtonsProps {
  className?: string; // Для добавления внешних стилей
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ className }) => {
  return (
    // <div style={{ width: '50%' }}></div>
    <div style={{ display: 'flex' }} className={styles.homeGradientBackground}>
      <Icon style={{ width: '120px', height: '50px', marginLeft: '30px', marginTop: '20px'}} />
      <Grid container spacing={0} className={`${styles.navigationButtons} ${className || ''}`} style={{ width: '50%' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Button className={styles.customButton}>
              Главная
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/program" style={{ textDecoration: 'none' }}>
            <Button className={styles.customButton}>
              Программа
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button className={styles.customButton}>
              Об Авторе
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/consultation" style={{ textDecoration: 'none' }}>
            <Button className={styles.customButton}>
              Консультация
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavigationButtons;
