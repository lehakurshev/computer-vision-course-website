// Local imports
import { Button, Modal, Box, Backdrop, Fade } from '@mui/material';
import React, { useState } from 'react';
import '../styles.scss';

// Component definition
function GetConsultation() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="home-page">
      <div className="home-page__background">
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
              <div className="modal-wrapper">
                <div className="modal-glass">
                  <iframe className="modal-iframe"
                    src={`http://${process.env.REACT_APP_SERVER_HOST || process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACK_PORT}/get-yookassa-widget`}></iframe>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

// Default export
export default GetConsultation;
