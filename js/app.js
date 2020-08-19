import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import { useEditMode } from 'lib/use-edit-mode';
import Modal from './components/shared/modal/modal';
import { loadingSelector, loadedSeletor, erroredSelector } from './modules/index';
import { bootstrapApp, initialisedSelector, inEditModeSelector } from './modules/bootstrap';
import {
    getHotelData as getHotelDataAction,
    loadingSelector as hotelDataLoadingSelector,
    loadedSelector as hotelDataLoadedSelector,
    erroredSelector as hotelDataErroredSelector,
    activeHotelCodeSelector,
    hotelUnsetActive,
} from './modules/hotels';

import {
    setLanguage,
    languageSelector,
    startPageIdSelector,
    startPageUrlSelector,
    hotelsSelector,
    isStartPageSelector,
    languageSelectorCloseTextSelector,
} from './modules/global';
import { activePageIdSelector, activePageTypeSelector, errorStatusSelector, cmsUpdate } from './modules/pages';
import { hideModal, typeSelector, dataSelector } from './modules/modal';

import MasterLayout from './components/layouts/master/master';
import BookingLayout from './components/layouts/booking/booking';
import Routes from './routes';

const App = props => {
    const {
        language,
        initialised,
        loaded,
        setLanguage: languageSetter,
        bootstrap,
        startPageId,
        startPageUrl,
        loading,
        errored,
        errorStatus,
        editMode,
        activePage,
        cmsUpdated,
        closeModal,
        modalType,
        modalData,
        modalCloseText,
        hotels,
        getHotelData,
        hotelDataLoading,
        hotelDataLoaded,
        hotelDataErrored,
        activeHotelCode,
        unsetHotel,
        activePageType,
    } = props;

    const getLayout = pageType => {
        switch (pageType) {
            case 'BookingPage':
                return BookingLayout;
            default:
                return MasterLayout;
        }
    };

    const Layout = getLayout(activePageType);
    const isBooking = activePageType === 'BookingPage';

    useEffect(() => {
        if (language && !initialised) {
            bootstrap(editMode);
        }
    }, [language, initialised, bootstrap, editMode]);

    useEditMode(editMode, activePage, cmsUpdated);

    return (
        <Layout loading={loading} initialised={initialised} errored={errored}>
            <Routes
                startPageId={startPageId}
                startPageUrl={startPageUrl}
                language={language}
                setLanguage={languageSetter}
                editMode={editMode}
                loading={loading}
                loaded={loaded}
                errored={errored}
                errorStatus={errorStatus}
                hotels={hotels}
                getHotelData={getHotelData}
                hotelDataLoading={hotelDataLoading}
                hotelDataLoaded={hotelDataLoaded}
                hotelDataErrored={hotelDataErrored}
                activeHotelCode={activeHotelCode}
                unsetHotel={unsetHotel}
                isBooking={isBooking}
            />
            {modalCloseText && (
                <Modal closeModal={closeModal} closeModalText={modalCloseText} type={modalType} data={modalData} />
            )}
        </Layout>
    );
};

App.propTypes = {
    language: PropTypes.string,
    initialised: PropTypes.bool.isRequired,
    bootstrap: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    startPageId: PropTypes.number,
    startPageUrl: PropTypes.string,
    editMode: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    errored: PropTypes.bool.isRequired,
    errorStatus: PropTypes.number,
    activePage: PropTypes.number,
    cmsUpdated: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalType: PropTypes.string,
    modalData: PropTypes.shape({}),
    modalCloseText: PropTypes.string,
    hotels: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    getHotelData: PropTypes.func.isRequired,
    hotelDataLoading: PropTypes.bool.isRequired,
    hotelDataLoaded: PropTypes.bool,
    hotelDataErrored: PropTypes.bool.isRequired,
    activeHotelCode: PropTypes.string,
    unsetHotel: PropTypes.func.isRequired,
    activePageType: PropTypes.string,
};

App.defaultProps = {
    language: null,
    editMode: false,
    activePage: null,
    startPageId: null,
    startPageUrl: null,
    errorStatus: null,
    modalType: null,
    modalData: null,
    modalCloseText: null,
    hotelDataLoaded: null,
    activeHotelCode: null,
    activePageType: null,
};

const mapStateToProps = state => ({
    initialised: initialisedSelector(state),
    language: languageSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSeletor(state),
    editMode: inEditModeSelector(state),
    activePage: activePageIdSelector(state),
    startPageId: startPageIdSelector(state),
    startPageUrl: startPageUrlSelector(state),
    errored: erroredSelector(state),
    errorStatus: errorStatusSelector(state),
    modalType: typeSelector(state),
    modalData: dataSelector(state),
    modalCloseText: languageSelectorCloseTextSelector(state),
    isStartPage: isStartPageSelector(state),
    hotels: hotelsSelector(state),
    hotelDataLoading: hotelDataLoadingSelector(state),
    hotelDataLoaded: hotelDataLoadedSelector(state),
    hotelDataErrored: hotelDataErroredSelector(state),
    activeHotelCode: activeHotelCodeSelector(state),
    activePageType: activePageTypeSelector(state),
});

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(setLanguage(language));
        },
        bootstrap: editMode => {
            dispatch(bootstrapApp(editMode));
        },
        cmsUpdated: (id, changed, contentLink) => {
            dispatch(cmsUpdate(id, changed, contentLink));
        },
        closeModal: () => {
            dispatch(hideModal());
        },
        getHotelData: hotelCode => {
            dispatch(getHotelDataAction(hotelCode));
        },
        unsetHotel: () => {
            dispatch(hotelUnsetActive());
        },
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
