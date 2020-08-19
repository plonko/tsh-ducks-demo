import './modal-fullscreen.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { GridContainer } from 'shared/grid';
import useGetWindowInnerHeight from 'lib/use-get-window-inner-height';
import AccessibleIcon from 'shared/accessible-icon';
import CloseIcon from 'icons/cross.svg';

const ModalFullscreen = ({ title, children, closeModal, closeModalText }) => {
    const windowHeight = useGetWindowInnerHeight();

    return (
        <div styleName="ModalFullscreen" style={{ height: `${windowHeight}px` }}>
            <GridContainer fluid maxWidth={1440}>
                <div styleName="ExpandToContainer">{children}</div>
            </GridContainer>
        </div>
    );
};

ModalFullscreen.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
    closeModalText: PropTypes.string,
    title: PropTypes.string,
};

ModalFullscreen.defaultProps = {
    closeModalText: 'Close modal',
    title: null,
};

export default ModalFullscreen;
