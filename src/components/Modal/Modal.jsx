import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({ picture, onClose }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={onOverlayClick} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={picture.largeImageURL} alt={picture.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  picture: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
