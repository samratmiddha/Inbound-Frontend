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
import candidateMarksReducer from "./features/candidateMarksSlice";
import questionReducer from "./features/questionSlice";
import csvUploadPopOverReducer from "./features/csvUploadPopOverSlice";
import questionAddModalReducer from "./features/questionAddModalSlice";
import questionEditModalReducer from "./features/questionEditModalSlice";
import sectionAddModalReducer from "./features/sectionAddModalSlice";
import sectionEditModalReducer from "./features/sectionEditModalSlice";
import seasonEditModalReducer from "./features/seasonEditModalSlice";
import userListReducer from "./features/userListSlice";
import filterPopOverReducer from "./features/filterPopOverSlice";
import profilePopOverReducer from "./features/profilePopOverSlice";
import panelEditModalReducer from "./features/panelEditModalSlice";
import chatReducer from "./features/chatSlice";
import addPanelModalReducer from "./features/addPanelModalSlice";
import themeReducer from "./features/themeSlice";
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
    addPanelModal: addPanelModalReducer,
    roundModal: roundModalReducer,
    section: sectionReducer,
    assessmentModal: assessmentModalReducer,
    roundMovePopOver: roundMovePopOverReducer,
    seasonCandidateList: seasonCandidateListReducer,
    candidateSelection: candidateSelectionReducer,
    questionPaperModal: questionPaperModalReducer,
    candidateMarks: candidateMarksReducer,
    question: questionReducer,
    csvUploadPopOver: csvUploadPopOverReducer,
    questionAddModal: questionAddModalReducer,
    questionEditModal: questionEditModalReducer,
    sectionAddModal: sectionAddModalReducer,
    sectionEditModal: sectionEditModalReducer,
    seasonEditModal: seasonEditModalReducer,
    userList: userListReducer,
    filterPopOver: filterPopOverReducer,
    profilePopOver: profilePopOverReducer,
    panelEditModal: panelEditModalReducer,
    chat: chatReducer,
    panelModal: panelModalReducer,
    theme: themeReducer,
  },
});
