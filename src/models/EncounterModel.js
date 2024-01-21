export default class EncounterManager {
    // encounters should be created at startup, and not stored.
    /**
     * @class
     *
     * @param combat - it's expected that combat will be game.combats[0]. Likely  need to iterate through if multiple
     * combats are available.
     */


    constructor() {
        if (!ui.KnowledgeRecalled.EncounterManger) {
            ui.KnowledgeRecalled.EncounterManager = this;
            this.encounters = new Map();
            this.activeEncounters = new Map();
        }
        return ui.KnowledgeRecalled.EncounterManager;
    }

    /**
     * Intnded to be called when Foundry is Ready i.e. Hooks.on Ready
     * @method
     * @static
     * @description
     * Embeds the View Manger into the applications primary class which is embeded in Foundry's UI global variable.
     * Accessible at ui.KnowledgeRecalled.ViewManager
     */
    static _onReady() {
        ui.KnowledgeRecalled.EncounterManger = new EncounterManager;
    }

    /**
     * List Foundry Encounters
     * @method
     */
    listAllEncounters() {
        console.debug(game.combats);
        return game.combats;
    };

    /**
     * List currently viewed encounter.
     * @method
     */
    listCurrentEncounter() {
        console.debug(game.combat);
        return game.combat;
    };

}

/**
 * @typedef game 
 */
