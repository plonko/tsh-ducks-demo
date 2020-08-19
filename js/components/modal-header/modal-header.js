import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './modal-header.scss';
import { useDevice } from 'lib/responsive-utils';
import NavigationHeader from 'shared/navigation-header';
import { Grid, GridColumn } from 'shared/grid';
import AccessibleIcon from 'shared/accessible-icon';
import CloseIcon from 'icons/cross.svg';
import ArrowIcon from 'icons/arrow.svg';

const ModalHeader = ({ children, className, closeButtonText, onCloseClick, backText, onBackClick, renderAside }) => {
    const device = useDevice();
    const isMobile = device === 'mobile';

    if (isMobile) {
        return (
            <div className={className}>
                <Grid>
                    <GridColumn all={12}>
                        <NavigationHeader
                            styleName="Primary"
                            buttonIcon={CloseIcon}
                            buttonText={closeButtonText}
                            buttonOnClick={onCloseClick}
                            secondaryIcon={ArrowIcon}
                            secondaryIconText={backText}
                            secondaryOnClick={onBackClick}
                        >
                            {children}
                        </NavigationHeader>
                    </GridColumn>
                    {renderAside && (
                        <GridColumn all={12}>
                            <aside styleName="Aside">{renderAside()}</aside>
                        </GridColumn>
                    )}
                </Grid>
            </div>
        );
    }

    const desktopTitle = (
        <h2 styleName="Title" id="aria-labelledby--modal">
            {children}
        </h2>
    );

    return (
        <div className={className}>
            <AccessibleIcon
                styleName="CloseIcon"
                component="button"
                type="button"
                icon={CloseIcon}
                onClick={onCloseClick}
            >
                {closeButtonText}
            </AccessibleIcon>
            <Grid>
                {renderAside ? (
                    <Fragment>
                        <GridColumn md={3}>
                            <aside styleName="Aside">{renderAside()}</aside>
                        </GridColumn>
                        <GridColumn md={6}>{desktopTitle}</GridColumn>
                    </Fragment>
                ) : (
                    <GridColumn md={8} mdOffset={2}>
                        {desktopTitle}
                    </GridColumn>
                )}
            </Grid>
        </div>
    );
};

ModalHeader.propTypes = {
    children: PropTypes.node.isRequired,
    closeButtonText: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func,
    renderAside: PropTypes.func,
    className: PropTypes.string,
    backText: PropTypes.string,
    onBackClick: PropTypes.func,
};

ModalHeader.defaultProps = {
    onCloseClick: null,
    renderAside: null,
    className: null,
    backText: null,
    onBackClick: null,
};

export default ModalHeader;
