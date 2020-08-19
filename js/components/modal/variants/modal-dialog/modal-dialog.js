import React from 'react';
import PropTypes from 'prop-types';
import './modal-dialog.scss';

const ModalDialog = ({ children }) => {
    return <div styleName="ModalDialog">{children}</div>;
};

ModalDialog.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalDialog;
