import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

interface NavigationButtonsProps {
  className?: string; // Для добавления внешних стилей
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ className }) => {
  return (
    <Grid container spacing={2} className={`${styles.navigationButtons} ${className || ''}`}>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          component={Link}
          to="/home" // Или "/" - смотрите, что вам нужно
          variant="contained"
          color="primary"
          fullWidth
        >
          Главная
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          component={Link}
          to="/course-program"
          variant="contained"
          color="primary"
          fullWidth
        >
          Программа Курса
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          component={Link}
          to="/about-author"
          variant="contained"
          color="primary"
          fullWidth
        >
          Об Авторе
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          component={Link}
          to="/get-consultation"
          variant="contained"
          color="primary"
          fullWidth
        >
          Получить Консультацию
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavigationButtons;
