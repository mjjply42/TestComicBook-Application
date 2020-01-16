const defaultState = {
    comics: {}
}

const navState = (state = defaultState, action) => {
    switch (action.type) {
        case 'update-test-saga':
            return {
                ...state,
                comics: action.data
            }
        case 'update-saga-pusher':
            return state
        default:
            return state
    }
}

export default navState