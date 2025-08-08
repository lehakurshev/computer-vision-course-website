import React from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.scss';

const TelegramDiscussionWidget: React.FC = () => {
  return (
    <div className={styles.widgetContainer}>
      <Grid container spacing={1} className={styles.gridContainer}>
        <Grid item xs={12} sm={6} md={3} className={styles.gridItem}>
          <iframe
            className={styles.iframe}
            src={'https://t.me/cvision_course/390?embed=1'}
          >
          </iframe>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.gridItem}>
          <iframe
            className={styles.iframe}
            src={'https://t.me/cvision_course/372?embed=1'}
          >
          </iframe>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.gridItem}>
          <iframe
            className={styles.iframe}
            src={'https://t.me/cvision_course/371?embed=1'}
          >
          </iframe>
        </Grid>
      </Grid>
    </div>
  );
};

export default TelegramDiscussionWidget;