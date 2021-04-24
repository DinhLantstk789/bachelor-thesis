import {combineReducers} from "redux";
import user from "./user";
import article from "./article";
import bookSection from "./bookSection";
import publication from "./publication";
import technicalReport from "./technicalReport";
import conference from "./conference";
import newUser from "./newUser";
import filter from "./filter";
import statistics from "./statistics";
import impactScore from "./impactScore";


export default combineReducers({user, newUser, article, bookSection, publication, technicalReport, conference, filter, statistics, impactScore});
