import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import getLanguageFromParams from "lib/get-language-from-params";
import RenderError from "shared/render-error";

const Routes = ({ language, setLanguage, errored, errorStatus }) => {
  const [] = useState(null);

  return (
    <Switch>
      <Route
        path="/:lang/"
        render={({ match }) => {
          if (!errored) {
            if (!language) {
              const paramLang = getLanguageFromParams(match);
              setLanguage(paramLang);
            }
          }

          // ...
        }}
      />
      {errored && <RenderError status={errorStatus} />}
    </Switch>
  );
};

Routes.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string,
};

Routes.defaultProps = {
  language: null,
};

export default Routes;
