import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from './c01.09_footer';
import { MODAL_TYPE_LANGUAGE_SELECTION, MODAL_TYPE_SEARCH_AND_AUTOCOMPLETE } from '../../../lib/constants/modal';
import {
    copyrightTextSelector,
    legalLinksSelector,
    downloadTitleSelector,
    appStoreLinkSelector,
    googlePlayLinkSelector,
    globalLinksTitleSelector,
    globalLinksSelector,
    searchButtonTextSelector,
    taglineSelector,
    currentLanguageTitleSelector,
} from '../../../modules/global';
import { showModal } from '../../../modules/modal';

import {
    contactTitleSelector,
    contactDescriptionSelector,
    contactLinksSelector,
    hashTagSelector,
    socialLinksSelector,
} from '../../../modules/index';

import { activeHotelSelector, hotelIconSelector, hotelNameSelector } from '../../../modules/hotels';

export const SiteFooterRenderer = ({ activeHotel, ...rest }) => {
    const isLocationSpecific = activeHotel && true;

    return <Footer {...rest} isLocationSpecific={isLocationSpecific} />;
};

SiteFooterRenderer.propTypes = {
    activeHotel: PropTypes.shape({}),
};

SiteFooterRenderer.defaultProps = {
    activeHotel: null,
};

const mapStateToProps = state => {
    return {
        activeHotel: activeHotelSelector(state),
        contactTitle: contactTitleSelector(state),
        contactDescription: contactDescriptionSelector(state),
        contactLinks: contactLinksSelector(state),
        hashTag: hashTagSelector(state),
        copyrightText: copyrightTextSelector(state),
        legalLinks: legalLinksSelector(state),
        downloadTitle: downloadTitleSelector(state),
        socialLinks: socialLinksSelector(state),
        appStoreLink: appStoreLinkSelector(state),
        googlePlayLink: googlePlayLinkSelector(state),
        globalLinksTitle: globalLinksTitleSelector(state),
        globalLinks: globalLinksSelector(state),
        tagline: taglineSelector(state),
        searchButtonText: searchButtonTextSelector(state),
        languageButtonText: currentLanguageTitleSelector(state),
        locationIcon: hotelIconSelector(state),
        locationName: hotelNameSelector(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLanguageButtonClick: () => {
            dispatch(showModal(MODAL_TYPE_LANGUAGE_SELECTION));
        },
        onSearchButtonClick: () => {
            dispatch(showModal(MODAL_TYPE_SEARCH_AND_AUTOCOMPLETE));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteFooterRenderer);
