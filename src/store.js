import { configureStore } from "@reduxjs/toolkit";
import seasonReducer from "./features/seasonSlice";
import seasonModalReducer from "./features/seasonModalSlice";
import drawerReducer from "./features/drawerSlice";
import userReducer from "./features/userSlice";
import roundReducer from "./features/roundSlice";
import informationReducer from "./features/informationSlice";
import roundTabReducer from "./features/roundTabSlice";
import candidateListReducer from "./features/candidateListSlice";
import panelListReducer from "./features/panelListSlice";
import panelModalReducer from "./features/panelModalSlice";
import roundModalReducer from "./features/roundModalSlice";
import sectionReducer from "./features/sectionSlice";
import assessmentModalReducer from "./features/assessmentModalSlice";
import roundMovePopOverReducer from "./features/roundMovePopOverSlice";
import seasonCandidateListReducer from "./features/seasonCandidateListSlice";
import candidateSelectionReducer from "./features/candidateSelectionSlice";
import questionPaperModalReducer from "./features/questionPaperModalSlice";
export default configureStore({
  reducer: {
    season: seasonReducer,
    seasonModal: seasonModalReducer,
    drawer: drawerReducer,
    user: userReducer,
    round: roundReducer,
    information: informationReducer,
    roundTab: roundTabReducer,
    candidateList: candidateListReducer,
    panelList: panelListReducer,
    panelModal: panelModalReducer,
    roundModal: roundModalReducer,
    section: sectionReducer,
    assessmentModal: assessmentModalReducer,
    roundMovePopOver: roundMovePopOverReducer,
    seasonCandidateList: seasonCandidateListReducer,
    candidateSelection: candidateSelectionReducer,
    questionPaperModal: questionPaperModalReducer,
  },
});
