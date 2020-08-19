import './base.scss';
import React, { useRef, useLayoutEffect } from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import useFocusTrap from '@charlietango/use-focus-trap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import useOnClickOutsideOrEscape from 'lib/use-on-click-outside-or-escape';
import classNames from 'classnames';

const ModalBase = ({ children, history, closeModal, isClosing }) => {
    const ref = useRef();
    const focusRef = useFocusTrap();
    const modalOverlayClass = classNames('ModalOverlay', {
        'ModalOverlay--ExitAnimation': isClosing,
    });

    // Body scroll lock when mounted
    useLayoutEffect(() => {
        disableBodyScroll(ref.current);

        return () => clearAllBodyScrollLocks();
    }, [ref]);

    // Close modal when clicked outside of ref, or esc key is hit

    useOnClickOutsideOrEscape(ref, () => closeModal());

    return (
        <div styleName={modalOverlayClass} ref={focusRef}>
            <div
                styleName="AriaWrapper"
                role="dialog"
                aria-modal="true"
                aria-labelledby="aria-labelledby--modal"
                aria-describedby="aria-describedby--modal"
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
};

ModalBase.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    isClosing: PropTypes.bool,
};

ModalBase.defaultProps = {
    isClosing: false,
};

export default withRouter(ModalBase);
