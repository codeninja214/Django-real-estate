import axios from "axios";
const baseUrl = "http://localhost:4000";

const FETCH_ALL_EXTRAS = "FETCH_ALL_EXTRAS";
const ONE_EXTRA_ADDED = "ONE_EXTRA_ADDED";
const ONE_EXTRA_REMOVED = "ONE_EXTRA_REMOVED";

const fetchExtrasSuccess = extras => ({
  type: FETCH_ALL_EXTRAS,
  extras
});

export const fetchExtras = () => (dispatch, getState) => {
  axios
    .get(`${baseUrl}/extra/all`)
    .then(response => {
      dispatch(fetchExtrasSuccess(response.data));
    })
    .catch(console.error);
};

const addExtrasSuccess = extra => ({
  type: ONE_EXTRA_ADDED,
  extra
});

export const addExtra = text => (dispatch, getState) => {
  const { advertReducer, userReducer } = getState();
  const { selectedAdvert } = advertReducer;
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .post(`${baseUrl}/extra/add/${selectedAdvert.id}`, { text })
    .then(response => {
      dispatch(addExtrasSuccess(response.data));
    })
    .catch(console.error);
};

const ExtraRemoveSuccess = extra => ({
  type: ONE_EXTRA_REMOVED,
  extra
});

export const removeExtra = extraId => (dispatch, getState) => {
  const { advertReducer, userReducer } = getState();
  const { selectedAdvert } = advertReducer;
  const { jwt } = userReducer;
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  axios
    .delete(`${baseUrl}/extra/${extraId}/remove/${selectedAdvert.id}`)
    .then(response => {
      dispatch(ExtraRemoveSuccess(response.data));
    })
    .catch(console.error);
};
