import NPCActor from "../models/ActorModel.js";


export let getEncounters;
import NPCGlobalActor from "../models/ActorModel.js";
export let Encounters;
export let ActiveEncounters;
export let getActiveEncounters;


// getEncounters = async () =>
// {
//    Encounters = await ui.combat.combats;
//    console.log(Encounters);
// };
//
// getActiveEncounters = async () =>
// {
//    getEncounters.forEach((encounter) =>
//    {
//       if (encounter.isActive)
//       {
//          ActiveEncounters.push(encounter);
//          console.log(ActiveEncounters);
//          return ActiveEncounters;
//       }
//    });
// };

export async function getActorFromID(actorID) {
   return await game.actors.get(actorID);
}


 export async function getNPCActorFromEncounters() {
    const encounters = await ui.combat.combats;
    const activeEncounter = encounters.find((encounter) => encounter.active === true);

    if (!activeEncounter) {
       console.log("No active encounter found.");
       return [];
    }

    const npcCombatants = activeEncounter.combatants.filter(
     (combatant) => combatant.actor.data.type === "npc"
    );

    const npcActors = [];

    for (const npcCombatant of npcCombatants) {
       const foundryNPC = npcCombatant.actor;
       const npcActor = createNPCActor(foundryNPC);
       npcActors.push(npcActor);
    }

    return npcActors;
 }

function createNPCActor(foundryNPC) {
   const npcActor = new NPCActor();




   return npcActor;
}

function KnowledgeRecalledActorFactory(foundryNPC) {
   return new KnowledgeRecalledActor(foundryNPC);
}

/*
   export function getNPCGlobalActor() {

}*/
