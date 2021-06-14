import { combineReducers } from "redux";

import {reducer as buyDag} from "redux/states/buyDag";

const rootReducer = combineReducers({ buyDag });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
