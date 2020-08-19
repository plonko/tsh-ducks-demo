const initialState = {
    type: null,
    isOpen: false,
    data: null,
};

// Actions
export const SHOW_MODAL = 'modal/SHOW_MODAL';
export const HIDE_MODAL = 'modal/HIDE_MODAL';

// Selectors
export const typeSelector = state => state.modal.type;
export const dataSelector = state => state.modal.data;
export const isModalOpenSelector = state => state.modal.isOpen;

// Reducer
export default function modal(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                type: action.payload.type,
                data: action.payload.data,
                isOpen: true,
            };
        case HIDE_MODAL:
            return {
                ...state,
                type: null,
                data: null,
                isOpen: false,
            };
        default:
            return state;
    }
}

// Action Creators
export function showModal(type, data = null) {
    return {
        type: SHOW_MODAL,
        payload: {
            type,
            data,
        },
    };
}

export function hideModal() {
    return {
        type: HIDE_MODAL,
    };
}
