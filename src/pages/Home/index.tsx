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
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Введение формирование изображений</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Цвет</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Морфологические операции</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Знакомство с OpenCV</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Методы улучшения изображений</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Фильтрация</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Сглаживание</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Поиск контуров</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Поиск лиц</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Анализ фона и движения на видео</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="course-program__part">
              <p className="course-program__part-title">Вторая часть</p>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Поиск по шаблону</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Ключевые точки</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Сглаживание с сохранением границ</li>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Сегментация изображений</li>
                  </ul>
                </div>
              </div>
              <div className="course-program__list-container">
                <div style={{ width: '20px', textAlign: 'left'}}>
                </div>
                <div>
                  <ul style={{ paddingTop: '30px'}}>
                    <li style={{ paddingTop: '0', paddingBottom: '0' }}>Стереосопоставление</li>
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
          style={{ width: '50%', height: '400px', margin: '0 auto' }}
        >
          <Fade in={open} >
            <Box className="modal-box" style={{ height: '0' }}>
              <iframe className="modal-iframe" style={{ backgroundColor: 'white', border: 'none', marginTop: '50px', borderRadius: '10px' }}
                src={`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACK_PORT}/get-yookassa-widget`} width="100%" height="750px"></iframe>
            </Box>
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
