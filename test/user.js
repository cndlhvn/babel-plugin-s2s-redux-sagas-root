import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api";

export function* handleGetUserRequest(action) {
  try {
    const { data } = yield call(api.getUserRequest, action.payload);
    yield put(actions.getUserSuccess(data));
  } catch (error) {
    yield put(actions.getUserFailure(error));
  }
}

export default [
  takeLatest(actions.getUserRequest.toString(), handleGetUserRequest)
];
