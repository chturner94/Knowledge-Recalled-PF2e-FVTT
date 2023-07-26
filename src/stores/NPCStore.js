import {KnowledgeRecalledStore} from "./KnowledgeRecalledStore.js";
import {readable, writable} from "svelte/store";
import * as Utilities from "../API/FoundryMethods.js";

export default class NPCStore extends KnowledgeRecalledStore
{
   constructor(...args)
   {
      super(...args);
      this.actor = Utilities.getActor(this.source);
      this.defaultDC = readable({});
      this.modifiedDC = writable({});
      this.baseCharacterInfo = writable({});
      this.rarity = writable({});
      this.alignment = writable({});
      this.privateInfo = writable({});
      this.traits = writable({});
      this.fortSave = writable({});
      this.refSave = writable({});
      this.willSave = writable({});
      this.lowestSave = writable({});
      this.immunities = writable({});
      this.resistances = writable({});
      this.weaknesses = writable({});
      this.passiveAbilities = writable({});
      this.actionAbilities = writable({});
      this.passiveAbilities = writable({});
      this.difficultyAdjustmentByPlayerID = writable({});
   }
}
