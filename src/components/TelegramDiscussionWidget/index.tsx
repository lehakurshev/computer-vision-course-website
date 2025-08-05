import { TelegramPostWidget } from '@baranov-guru/react-telegram-widgets';
import React from 'react';
import { Grid } from '@mui/material';

const TelegramDiscussionWidget: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#c8dcee', height: '2000px'}}>
      <Grid container spacing={1} style={{ backgroundColor: '#c8dcee', height: '100%'}}>
        <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '50px' }}>
          <iframe 
            style={{border: 'none', height: '200%', width: '100%', borderRadius: '10px' }} 
            src={'https://t.me/cvision_course/390?embed=1'}> 
          </iframe>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '90px' }}>
          <iframe 
            style={{border: 'none', height: '200%', width: '100%', borderRadius: '10px' }} 
            src={'https://t.me/cvision_course/372?embed=1'}> 
          </iframe>
        </Grid>
        <Grid item xs={12} sm={6} md={3} style={{ marginLeft: '90px' }}>
          <iframe 
            style={{border: 'none', height: '200%', width: '100%', borderRadius: '10px' }} 
            src={'https://t.me/cvision_course/371?embed=1'}> 
          </iframe>
        </Grid>
      </Grid>
    </div>
  );
};

export default TelegramDiscussionWidget;

