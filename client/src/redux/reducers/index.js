import {combineReducers} from "redux";
import user from "./user";
import article from "./article";
import bookSection from "./bookSection";
import publication from "./publication";
import technicalReport from "./technicalReport";
import conference from "./conference";


export default combineReducers({user, article, bookSection, publication,technicalReport,conference});
