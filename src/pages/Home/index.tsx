import PageTree from '../../components/PageTree';
import TelegramPostWidget from '../../components/TelegramDiscussionWidget';
import { Button, Modal, Box, Backdrop, Fade } from '@mui/material';
import React, { useState } from 'react';
import './styles.css';

// Component definition
function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div style={{ backgroundColor: '#c8dcee' }}>
        <div className="course-info-section">
          <h1>Онлайн-курс</h1>
          <h1 style={{ marginBottom: '100px' }}>Основы компьютерного зрения</h1>
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
          style={{ width: '50%', height: '400px', margin: '0 auto', position: 'absolute' }}
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
