import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../api";

export function* handleGetCommentRequest(action) {
  try {
    const { data } = yield call(api.getCommentRequest, action.payload);
    yield put(actions.getCommentSuccess(data));
  } catch (error) {
    yield put(actions.getCommentFailure(error));
  }
}

export default [
  takeLatest(actions.getCommentRequest.toString(), handleGetCommentRequest)
];
