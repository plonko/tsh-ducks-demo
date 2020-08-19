import React, { Suspense, lazy, useState } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorBoundary from "shared/error-boundary";
import ModalDialog from "./variants/modal-dialog/modal-dialog";
import ModalFullscreen from "./variants/modal-fullscreen/modal-fullscreen";
import ModalPrompt from "./variants/modal-prompt/modal-prompt";
import ModalBase from "./base/base";
import {
  MODAL_TYPE_LANGUAGE_SELECTION,
  MODAL_TYPE_LANGUAGE_SELECTION_ON_LOAD,
  MODAL_TYPE_SEARCH_AND_AUTOCOMPLETE,
  MODAL_TYPE_LOCATION_SELECTOR,
  MODAL_TYPE_FILTERS,
  MODAL_TYPE_BASIC,
  MODAL_TYPE_IMAGE_GALLERY,
} from "../../../lib/constants/modal";

import { closeModalTextSelector } from "../../../modules/global";

const MODAL_COMPONENTS = {
  [MODAL_TYPE_BASIC]: {
    variant: ModalPrompt,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `./modal-components/basic.js`
      )
    ),
  },
  [MODAL_TYPE_IMAGE_GALLERY]: {
    variant: ModalPrompt,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `./modal-components/image-gallery-modal.js`
      )
    ),
  },
  [MODAL_TYPE_LANGUAGE_SELECTION]: {
    variant: ModalFullscreen,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `../../modules/c01.06_language-selector/c01.06_language-selector.js`
      )
    ),
  },
  [MODAL_TYPE_LANGUAGE_SELECTION_ON_LOAD]: {
    variant: ModalDialog,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `../../modules/c01.06_language-selector-on-load/c01.06_language-selector-on-load.js`
      )
    ),
  },
  [MODAL_TYPE_SEARCH_AND_AUTOCOMPLETE]: {
    variant: ModalFullscreen,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `../../modules/c01.02_search-and-autocomplete/c01.02_search-and-autocomplete.js`
      )
    ),
  },
  [MODAL_TYPE_LOCATION_SELECTOR]: {
    variant: ModalFullscreen,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `../../modules/c01.07_location-selector/c01.07_location-selector.js`
      )
    ),
  },
  [MODAL_TYPE_FILTERS]: {
    variant: ModalFullscreen,
    component: lazy(() =>
      import(
        /* webpackChunkName: "component--[request]" */ `../../shared/listing/filters-modal.js`
      )
    ),
  },
};

const Modal = ({ type, data, closeModal, closeModalText, portal }) => {
  const [isClosing, setIsClosing] = useState(false);
  const setTimeoutDuration = 800;

  if (!type) {
    return null;
  }

  const closeTimeout = () => {
    setIsClosing(true);

    setTimeout(() => {
      closeModal();
      setIsClosing(false);
    }, setTimeoutDuration);
  };

  const componentObj = MODAL_COMPONENTS[type];

  if (componentObj !== undefined) {
    const {
      component: ModalComponent,
      variant: ModalVariant = ModalDialog,
    } = componentObj;

    const modalFragment = (
      <ModalBase
        closeModal={closeTimeout}
        isClosing={isClosing}
        timeoutDuration={setTimeoutDuration}
      >
        <ModalVariant
          closeModal={closeTimeout}
          closeModalText={closeModalText}
          isClosing={isClosing}
          timeoutDuration={setTimeoutDuration}
        >
          <ErrorBoundary>
            <Suspense fallback="Loading...">
              <ModalComponent closeModal={closeModal} {...data} />
            </Suspense>
          </ErrorBoundary>
        </ModalVariant>
      </ModalBase>
    );

    if (portal) {
      return createPortal(modalFragment);
    }

    return modalFragment;
  }

  console.error(`${type} is not valid Modal`);

  return null;
};

Modal.propTypes = {
  type: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  closeModalText: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
  portal: PropTypes.bool,
};

Modal.defaultProps = {
  type: null,
  data: null,
  portal: true,
};

const mapStateToProps = (state) => ({
  closeModalText: closeModalTextSelector(state),
});

export default connect(mapStateToProps, {})(Modal);
