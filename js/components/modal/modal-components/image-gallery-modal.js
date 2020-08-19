import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'components/c02.02_image-gallery';

const ImageGalleryModal = ({ data }) => {
    return <ImageGallery imageGalleryItems={data} />;
};

ImageGalleryModal.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ImageGalleryModal;
