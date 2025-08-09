import React from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.scss';
import Iframe from 'react-iframe';

const TelegramDiscussionWidget: React.FC = () => {
  return (
    <div className={styles.widgetContainer}>
      <Grid container spacing={0} className={styles.gridContainer}> {/* Убрали spacing */}
        <Grid item xs={12} sm={6} md={4} className={styles.gridItem}> {/*  Изменили md */}
          <Iframe
            className={styles.iframe}
            url={'https://t.me/cvision_course/390?embed=1'}
            title="Telegram Post 1" // Добавил title для доступности
            height='1250px'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.gridItem}> {/*  Изменили md */}
          <Iframe
            className={styles.iframe}
            url={'https://t.me/cvision_course/372?embed=1'}
            title="Telegram Post 2" // Добавил title для доступности
            height='600px'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.gridItem}> {/*  Изменили md */}
          <Iframe
            className={styles.iframe}
            url={'https://t.me/cvision_course/371?embed=1'}
            title="Telegram Post 3" // Добавил title для доступности
            height='1200px'
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TelegramDiscussionWidget;