import { KnowledgeRecalledStore } from "./KnowledgeRecalledStore.js";
import { writable } from "svelte/store";
import * as Utilities from "../API/FoundryMethods.js";
import { TJSDocument } from "#runtime/svelte/store/fvtt/document";
import { getFlag } from "../control/data.js";

export default class NPCStore extends KnowledgeRecalledStore
{
   constructor(...args)
   {
      super(...args);
      this.actor = Utilities.getActor(this.source);
      this.actorStore = new TJSDocument(this.actor);
      this.defaultDC = writable({});
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
   setupStores()
   {
   const flagPath = "npcFlags";
   this.defaultDC.set(getFlag(this.actor, `${flagPath}.defaultDC.value`));
   this.modifiedDC.set(getFlag(this.actor, `${flagPath}.modifiedDC.value`));
   this.baseCharacterInfo.set(getFlag(this.actor, `${flagPath}.baseCharacterInfo`));
   this.rarity.set(getFlag(this.actor, `${flagPath}.rarity.value`));
   this.alignment.set(getFlag(this.actor, `${flagPath}.alignment.value`));
   this.privateInfo.set(getFlag(this.actor, `${flagPath}.privateInfo`));
   this.traits.set(getFlag(this.actor, `${flagPath}.traits`));
   this.fortSave.set(getFlag(this.actor, `${flagPath}.fortSave.value`));
   this.refSave.set(getFlag(this.actor, `${flagPath}.refSave.value`));
   this.willSave.set(getFlag(this.actor, `${flagPath}.willSave.value`));
   this.lowestSave.set(getFlag(this.actor, `${flagPath}.lowestSave.value`));
   this.immunities.set(getFlag(this.actor, `${flagPath}.immunities`));
   this.resistances.set(getFlag(this.actor, `${flagPath}.resistances`));
   this.weaknesses.set(getFlag(this.actor, `${flagPath}.weaknesses`));
   this.passiveAbilities.set(getFlag(this.actor, `${flagPath}.passiveAbilities`));
   this.actionAbilities.set(getFlag(this.actor, `${flagPath}.actionAbilities`));
   this.passiveAbilities.set(getFlag(this.actor, `${flagPath}.passiveAbilities`));
   this.difficultyAdjustmentByPlayerID.set(getFlag(this.actor, `${flagPath}.difficultyAdjustmentByPlayerID`));
   }

   setupSubscriptions()
   {
   this.actorStore.subscribe((actor) => {
   this.actor = actor;
   this.actorStore.set(actor);
   });
   }
   static make(...args)
   {
   const store = new this(...args);
   store.setupStores();
   store.setupSubscriptions();
   return store;
   }
}
