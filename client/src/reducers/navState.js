const defaultState = {
    comics: {},
    bookpage: false
}

const navState = (state = defaultState, action) => {
    switch (action.type) {
        case 'update-comics':
            return {
                ...state,
                comics: action.data
            }
        case 'update-bookpage-signal':
            return {
                ...state,
                bookpage: action.data
            }
        case 'update-comics-saga-pusher':
            return state
        default:
            return state
    }
}

export default navState