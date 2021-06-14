
/////////////////////////////
// ANCHOR Actions
/////////////////////////////

function setPaymentInfo(state, { payload }) {
  return {
    ...state,
    ...payload,
  };
}

/////////////////////////////
// ANCHOR Exports
/////////////////////////////

export default {
  setPaymentInfo,
}