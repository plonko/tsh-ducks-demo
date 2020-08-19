import './modal-prompt.scss';
import React from 'react';
import PropTypes from 'prop-types';
import AccessibleIcon from 'shared/accessible-icon';
import CloseIcon from 'icons/cross.svg';
import classNames from 'classnames';

const ModalPrompt = ({ children, closeModal, closeModalText, isClosing }) => {
    const modalPromptClass = classNames('ModalPrompt', {
        'ModalPrompt--ExitAnimation': isClosing,
    });
    return (
        <div styleName={modalPromptClass}>
            <AccessibleIcon
                styleName="CloseIcon"
                component="button"
                type="button"
                icon={CloseIcon}
                onClick={closeModal}
            >
                {closeModalText}
            </AccessibleIcon>
            <div styleName="ModalChild">{children}</div>
        </div>
    );
};

ModalPrompt.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
    closeModalText: PropTypes.string,
    isClosing: PropTypes.bool,
};

ModalPrompt.defaultProps = {
    closeModalText: null,
    isClosing: false,
};

export default ModalPrompt;
