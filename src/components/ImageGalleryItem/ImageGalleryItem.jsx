import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ picture }) => {
  const [showModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(prev => !prev);
  };

  const { webformatURL, tags } = picture;

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={onModal}
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
      {showModal && <Modal picture={picture} onClose={onModal} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.object.isRequired,
};
