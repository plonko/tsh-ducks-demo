import React from 'react';
import PropTypes from 'prop-types';
import ContentArea from 'shared/content-area';
import EpiField from 'lib/epi-field';

const Basic = ({ contentArea }) => {
    return (
        <EpiField epiProperty="modalContentArea" component="div">
            <ContentArea area={contentArea} />
        </EpiField>
    );
};

Basic.propTypes = {
    contentArea: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default Basic;
