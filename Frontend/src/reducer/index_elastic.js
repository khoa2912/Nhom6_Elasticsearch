import {  indexConstants, userConstants } from "../action/constants";
const initState = {
  index_details:'',
  scroll_id:'',
};
export default (state = initState, action) => {
    switch (action.type) {
      case indexConstants.GET_INDEX_DETAILS_SUCCESS:
        state = {
          ...state,
          index_details:action.payload.data,
          scroll_id:action.payload.scroll_id
        };
        break;
        case indexConstants.NEXTPAGE_SUCCESS:
        state = {
          ...state,
          scroll_id:action.payload.scroll_id
        };
        break;
        case userConstants.RESETINDEX:
          state = {
            ...initState
          };
          break;
      
    }
    return state;
}