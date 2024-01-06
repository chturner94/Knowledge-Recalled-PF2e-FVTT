import { writable } from "svelte/store"
import GMJournalApplication from "../view/GMJournal/GMJournalApplication"

const Apps = {
    gmJournal: void 0,
}

export default class ViewManager {
    appState = {
        gmJournal: {
            open: false
        }
    }
    static init() {
        ui.KnowledgeRecalled = new ViewManager()

        Apps.gmJournal = new GMJournalApplication

    }
    //Implement a function to pass an application to open and set the AppState to true.
}
