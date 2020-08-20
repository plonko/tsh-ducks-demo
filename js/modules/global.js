import getBrowserLanguage from "../lib/get-browser-language/get-browser-language";
import { MODAL_TYPE_LANGUAGE_SELECTION_ON_LOAD } from "../lib/constants/modal";
import { STORAGE_PREFERRED_LANGUAGE } from "../lib/constants/local-storage";
import { showModal, hideModal } from "./modal";

export const SET_VALID_LANGUAGE = "global/SET_VALID_LANGUAGE";
export const SET_DEFAULT_LANGUAGE = "global/SET_DEFAULT_LANGUAGE";

const SET_PREFERED_LANGUAGE_STORAGE_FAILED =
  "global/SET_PREFERED_LANGUAGE_STORAGE_FAILED";
const SET_PREFERED_LANGUAGE_STORAGE_SUCCESS =
  "global/SET_PREFERED_LANGUAGE_STORAGE_SUCCESS";

const initialState = {
  loading: false,
  errored: false,
  loaded: false,
  language: undefined,
  languageSelector: {
    languages: [],
    defaultLanguage: "en",
  },
};

export const loadingSelector = (state) => state.global.loading;
export const erroredSelector = (state) => state.global.errored;
export const loadedSelector = (state) => state.global.loaded;
export const languageSelector = (state) => state.global.language;

// Language selector

export const languageSelectorSelector = (state) =>
  state.global.languageSelector;

export const validLanguagesSelector = (state) => {
  const languageSelectorState = languageSelectorSelector(state);
  return languageSelectorState ? languageSelectorState.languages : null;
};

export const defaultLanguageSelector = (state) => {
  const languageSelectorState = languageSelectorSelector(state);
  return languageSelectorState ? languageSelectorState.defaultLanguage : null;
};

export const currentLanguageTitleSelector = (state) => {
  const currentLanguage = languageSelector(state);
  const validLanguages = validLanguagesSelector(state);

  if (currentLanguage && validLanguages) {
    const currentLanguageSearch = validLanguages.filter(
      (validLanguagesObj) => validLanguagesObj.code === currentLanguage
    );

    if (currentLanguageSearch.length > 0 && currentLanguageSearch[0].name) {
      return currentLanguageSearch[0].name;
    }
  }

  return null;
};

export function setDefaultLanguage(language) {
  return {
    type: SET_DEFAULT_LANGUAGE,
    language,
  };
}

export function setValidLanguage(language) {
  return {
    type: SET_VALID_LANGUAGE,
    language,
  };
}

function setLanguageLocalStorageErrored() {
  return {
    type: SET_PREFERED_LANGUAGE_STORAGE_FAILED,
  };
}

function setLanguageLocalStorageSuccess() {
  return {
    type: SET_PREFERED_LANGUAGE_STORAGE_SUCCESS,
  };
}

export function setLanguageLocalStorage(language) {
  return (dispatch) => {
    try {
      localStorage.setItem(STORAGE_PREFERRED_LANGUAGE, language);
      dispatch(setLanguageLocalStorageSuccess());
    } catch (e) {
      console.error(e);
      dispatch(setLanguageLocalStorageErrored());
      throw new Error(e);
    }
  };
}

export function showLanguageSelectModal() {
  return (dispatch) => {
    dispatch(showModal(MODAL_TYPE_LANGUAGE_SELECTION_ON_LOAD));
  };
}

export function setPreferredLanguage(language) {
  return (dispatch) => {
    dispatch(setValidLanguage(language));
    dispatch(setLanguageLocalStorage(language));
    dispatch(hideModal());
  };
}

export function setLanguage(language) {
  return (dispatch, getState) => {
    const state = getState();
    const validLanguages = validLanguagesSelector(state);
    const defaultLanguage = defaultLanguageSelector(state);
    const browserLanguage = getBrowserLanguage();

    // If preferred language storage is set, use it
    if (typeof localStorage.STORAGE_PREFERRED_LANGUAGE !== "undefined") {
      dispatch(setValidLanguage(localStorage.STORAGE_PREFERRED_LANGUAGE));
      return;
    }

    // If url doesn't contain a valid language, set default
    if (!validLanguages.includes(language)) {
      dispatch(setDefaultLanguage(defaultLanguage));
      return;
    }

    // If the browser language isn't a valid language, show modal
    if (validLanguages.every(({ code }) => code !== browserLanguage)) {
      dispatch(showLanguageSelectModal());
      return;
    }

    // Otherwise set the url path language as the language
    dispatch(setValidLanguage(language));
  };
}

export default function global(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VALID_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case SET_DEFAULT_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}
