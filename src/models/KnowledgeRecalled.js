

// eslint-disable-next-line no-unused-vars
export default class KnowledgeRecalled extends Application {
    loadedNPCs = [];
    NpcsInEncounters = [];
    npcActors = [];

    static _onReady(listOfFoundryActors) {
        ui.KnowledgeRecalled = new KnowledgeRecalled(listOfFoundryActors);
    }

    getActors() {
        return this.loadedNPCs;
    }

    getEncounteredActors() {
        return this.NpcsInEncounters;
    }

    addToEncounteredActorArray(NPCActor) {
        const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
        if (!isDuplicate) {
            this.encounteredNPCActors.push(NPCActor);
        }
    }

    addToNpcActorsArray(NPCActor) {
        // const isDuplicate = this.checkForDuplicateActor(NPCActor.actorId);
        // if (!isDuplicate)
        // {
        //    this.npcActors.push(NPCActor);
        // }
        this.npcActors.push(NPCActor);
    }

    checkForDuplicateActor(actorId) {
        return this.documentedActors.some((npcActor) => npcActor.actorId === actorId);
    }


}
