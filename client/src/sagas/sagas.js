import { call, all, put, takeLatest } from 'redux-saga/effects'
import { Buffer } from 'buffer'
import config from '../utils/config.json'

//const delay = (ms) => new Promise(res => setTimeout(res, ms))

function fetchData () {
    return fetch(`${config.API_URL}`, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ComicClanVettIO2019'}})  
}

function* hydrateComicState() {
    let response = yield call (fetchData)
    let result = yield response.json()

    //This hydrates the store once the data has been recieved
    //from the fetch
    yield put({ type: 'update-comics', data: result})
}

function* getComicsSaga() {
    //After catching the "update-saga-pusher", we call the
    //generator to make the fetch call
    yield takeLatest('update-comics-saga-pusher', hydrateComicState)
}

export default function* rootSaga() {
    //Saga Root. Used to call sagas
    yield all([
        getComicsSaga(),
    ]);
}