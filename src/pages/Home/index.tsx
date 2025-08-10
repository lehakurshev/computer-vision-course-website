import PageTree from '../../components/PageTree';
import TelegramPostWidget from '../../components/TelegramDiscussionWidget';
import { Button, Modal, Box, Backdrop, Fade } from '@mui/material';
import React, { useState } from 'react';
import './styles.scss';

// Component definition
function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="home-page">
      <div className="home-page__background">
        <div className="course-info-section">
          <h1>Онлайн-курс</h1>
          <h1 className="course-info-section__subtitle">Основы компьютерного зрения</h1>
          <div className="course-program">
            <div className="course-program__part">
              <p className="course-program__part-title">Первая часть</p>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Введение формирование изображений</li>
                    <li>Цвет</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Морфологические операции</li>
                    <li>Знакомство с OpenCV</li>
                    <li>Методы улучшения изображений</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Фильтрация</li>
                    <li>Сглаживание</li>
                    <li>Поиск контуров</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Поиск лиц</li>
                    <li>Анализ фона и движения на видео</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="course-program__part">
              <p className="course-program__part-title">Вторая часть</p>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Поиск по шаблону</li>
                    <li>Ключевые точки</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Сглаживание с сохранением границ</li>
                    <li>Сегментация изображений</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div className="course-program__list-marker">
                </div>
                <div>
                  <ul>
                    <li>Стереосопоставление</li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>
        <div className="payment-section">
          <Button variant="contained" className="payment-button" onClick={handleOpen}>
            Оплатить курс
          </Button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          className="payment-modal"
        >
          <Fade in={open} >
            <Box className="modal-box">
              <iframe className="modal-iframe"
                src={`http://${process.env.REACT_APP_SERVER_HOST || process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACK_PORT}/get-yookassa-widget`} width="100%" height="750px"></iframe>            </Box>
          </Fade>
        </Modal>
        <div className="course-info-section">
          <h1 style={{ textAlign: 'right', marginRight: '50px', marginTop: '700px' }}>Новости моего telegram канала</h1>
        </div>
        <TelegramPostWidget />
      </div>
    </div>
  );
}

// Default export
export default HomePage;
