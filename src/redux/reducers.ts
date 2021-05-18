import { combineReducers } from "redux";

import buyDag from "@redux/slices/buy-dag";

const rootReducer = combineReducers({ buyDag });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
