import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { getPhotos } from 'services/getPhotos';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
    const updateComponent = async () => {
      setStatus('pending');
      try {
        const data = await getPhotos(searchQuery, page);
        if (!data.totalHits) {
          setStatus('rejected');
          setError('За даним запитом немає зображень :(');
          return;
        }

        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setStatus('resolved');
        setTotalImages(data.totalHits);
      } catch (error) {
        setStatus('rejected');
        setError(error.message);
      }
    };
    updateComponent();
  }, [page, searchQuery]);

  const handleSearchSubmit = searchQuery => {
    setPage(1);
    setSearchQuery(searchQuery);
    setPictures([]);
    setTotalImages(0);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const showBtn = totalImages !== pictures.length && page * 12 < 500;

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={handleSearchSubmit} />
      </>
    );
  }
  if (status === 'pending')
    return (
      <>
        <Searchbar onSubmit={handleSearchSubmit} />
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        <Loader />
      </>
    );
  if (status === 'rejected')
    return (
      <>
        <Searchbar onSubmit={handleSearchSubmit} />
        <p>{error}</p>
      </>
    );
  if (status === 'resolved')
    return (
      <>
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery pictures={pictures} />
        {showBtn && <Button onClick={handleLoadMoreClick} />}
      </>
    );
};
