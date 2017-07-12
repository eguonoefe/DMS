import * as actionTypes from '../actions/actionTypes';

const documentReducer =
  (state = { documentList: [], document: {} }, action) => {
    switch (action.type) {
      case actionTypes.VIEW_DOCUMENT:
      case actionTypes.DOCUMENT_CREATED:
      case actionTypes.DOCUMENT_UPDATED:
        return { ...state, document: action.document, message: action.message };
      case actionTypes.USER_DOCUMENTS:
      case actionTypes.DOCUMENTS_LIST:
      case actionTypes.SEARCH_DOCUMENTS:
        return {
          ...state,
          documentList: action.documentList,
          metaData: action.metaData,
          message: action.message
        };
      case actionTypes.DELETE_USER:
        return {
          ...state,
          documentList: state.documentList.filter(
            item => item.id !== action.documentId),
          message: action.message
        };
      case actionTypes.DOCUMENT_ERROR:
      case actionTypes.DOCUMENT_EXISTS:
        return {
          message: action.message
        };
      default:
        return state;
    }
  };

export default documentReducer;