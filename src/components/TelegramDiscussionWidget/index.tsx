import { TelegramPostWidget } from '@baranov-guru/react-telegram-widgets';
import React from 'react';
import styles from './index.module.scss';
import { Tree } from 'react-arborist';
import { colors, withTheme } from '@mui/material';

interface TgPost {
  post?: string; // Для добавления внешних стилей
}

const TelegramDiscussionWidget: React.FC<TgPost> = ({ post }) => {
  return (
    <div >

      <TelegramPostWidget
        post='cvision_course/61'
        width='100%'
        
        dark={true}
        onLoad={() => console.log('Post loaded successfully!')}
        onError={error => console.error('Failed to load post:', error)}
      />
    </div>
  );
};

export default TelegramDiscussionWidget;
