import KnowledgeRecalled from "./models/KnowledgeRecalled.js";
import NPCModel from "./models/NPCModel.js";
import { isEqual } from 'lodash';
import { insertKnowledgeRecalledbuttons } from "./foundryUiOverrides.js";
import ViewManager from "./control/ViewManager.js";

KnowledgeRecalled._onReady();
ViewManager.init();


// Remove for production
const isDev = true;
Hooks.once("init", () => {
    CONFIG.debug.hooks = isDev;
});

Hooks.on("ready", () => {
    console.log("Foundry is Ready");

});

Hooks.on('getSceneControlButtons', (controls) => {
    insertKnowledgeRecalledbuttons(controls);
});

