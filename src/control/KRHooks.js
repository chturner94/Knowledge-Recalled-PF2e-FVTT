import KnowledgeRecalled from "../KnowledgeRecalled";
import ViewManager from "./ViewManager";
export default async function registerHooks() {
    Hooks.on("ready", () => {
        console.log("Foundry is Ready");
        KnowledgeRecalled._onReady();
        console.log("KnowledgeRecalled - registered")
        ViewManager._onReady();
        console.log("Knowledge Recalled - Viewmanager and AppService Registered")
        ui.KnowledgeRecalled.ViewManager.init();
        console.log("KnowledgeRecalled - ViewManager setup")
    });

    Hooks.on('getSceneControlButtons', (controls) => {
        insertKnowledgeRecalledbuttons(controls);
    });

};


