import ViewManager from "./control/ViewManager";


// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application {
    activeEncounters = [];
    constructor() {
        super();
    }

    static _onReady() {
        ui.KnowledgeRecalled = new KnowledgeRecalled();
    }
    /**
    * Method to get and set all active encounters and store them at this.activeEncounters<Array>
    * @method
    * @description intended to fire during  appropriate hooks. Investigate appropriate hooks
    */
    getActiveEncounters() {
        const encounters = game.combats.combats;
        this.activeEncounters = [];
        for (let index = 0; index < encounters.length; index++) {
            const testEncounter = encounters[index];
            if (testEncounter.isActive) {
                this.activeEncounters.push(testEncounter)
            }
        }
    }
    // Depricate
    getActors() {
        return this.loadedNPCs;
    }

    // Depricate
    getEncounteredActors() {
        return this.NpcsInEncounters;
    }

    // Depricate
    addToEncounteredActorArray(NPCActor) {
        const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
        if (!isDuplicate) {
            this.encounteredNPCActors.push(NPCActor);
        }
    }

    // Depricate
    addToNpcActorsArray(NPCActor) {
        // const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
        // if (!isDuplicate)
        // {
        //    this.npcActors.push(NPCActor);
        // }
        this.npcActors.push(NPCActor);
    }

    // Depricate
    checkForDuplicateActor(actorId) {
        return this.documentedActors.some((npcActor) => npcActor.actorId === actorId);
    }


}
