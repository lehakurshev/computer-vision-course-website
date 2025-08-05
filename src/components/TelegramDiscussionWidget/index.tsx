import { TelegramPostWidget } from '@baranov-guru/react-telegram-widgets';
import React from 'react';
import styles from './index.module.scss';
import { Grid } from '@mui/material';

const TelegramDiscussionWidget: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#c8dcee', paddingBottom: '50px'}}>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '50px' }}>
        <TelegramPostWidget
          post='cvision_course/390'
          width='120%' // Width для адаптивности внутри Grid
          dark={false}
          onLoad={() => console.log('Post loaded successfully!')}
          onError={error => console.error('Failed to load post:', error)}
        />
      </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '90px' }}>
        <TelegramPostWidget
          post='cvision_course/372'
          width='120%'
          dark={false}
          onLoad={() => console.log('Post loaded successfully!')}
          onError={error => console.error('Failed to load post:', error)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '90px' }}>
        <TelegramPostWidget
          post='cvision_course/371'
          width='120%'
          dark={false}
          onLoad={() => console.log('Post loaded successfully!')}
          onError={error => console.error('Failed toload post:', error)}
        />
      </Grid>
    </Grid>
    </div>
  );
};

export default TelegramDiscussionWidget;

