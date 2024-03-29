import { dcByLevel, rarityMap } from "../constants/constants"
import { getActor, getProperty } from "../control/utilities";

// If this is the manager, it should be independent of any actor, but we can register actors? and maybew
// look them up based on their actorID?
/**
 * NPCModel
 * @class
 * @property {actor} actor
 */
export class NPCModel {
   // hasn't been tested
   constructor(actor) {
      this.actor = actor;
      this.flags = {};
   };
   /*
    * Maybe the object itself should appear as object = {
    * actor: { PF2E Actor Object },
    * flags: { flags },
    *
    * TODO: IDEA
    * When we are working on the actual object itself we can reference the actor on the object
    * and the flags will apear under the actor key as well, but that represents the flags when 
    * stored on the object in the database at rest. When we are working the object during `edit`
    * we fetch that and store it at the top level of the object. Then our Set flags method can
    * simply merge down the flags at the top level into the actual actor object to be written to the
    * database.
    * }
    */

   /*
    * TODO: Maybe we should remove the static nature of the createAbilitiyItems??? I do think we
    * may need a static method getActor, which will provide a means to get an Actorby ID, and 
    * return the object we are pondering above. Then that could have the create done on itself
    * and then simply stored inside of the this.flags.
    */

   init() {
      if (this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags')) {
         this.flags = this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      } else {
         this.initializeFlags();
      }
      return this;
      /*
      if (this.getFlags(this.actor.id)) {
          return this;
      } else {
          this.initializeFlags(actor);
          console.debug(this);
          return this;
      }
      */
   }

   /**
    * @method
    * @private
    */
   initializeFlags() {
      if (this.actor.type != 'npc') {
         return console.debug(`Actor is not of the NPC type.`);
      }
      this.flags = {
         actorID: this.actor.id,
         defaultDC: 0,
         modifiedDC: 0,
         baseCharacterInfo: {
            visibility: false,
            discoveredBy: '',
         },
         rarity: {
            visibility: false,
            discoveredBy: '',
         },
         privateInfo: {
            visibility: false,
            discoveredBy: '',
         },
         traits: {},
         armorClass: {
            visibility: false,
            discoveredBy: '',
         },
         fortSave: {
            visibility: false,
            discoveredBy: '',
         },
         willSave: {
            visibility: false,
            discoveredBy: '',
         },
         refSave: {
            visibility: false,
            discoveredBy: '',
         },
         lowestSave: {
            visibility: false,
            discoveredBy: '',
         },
         immunities: {},
         resistances: {},
         weaknesses: {},
         attacks: new Map,
         passiveAbilities: new Map,
         actionAbilities: new Map,
         spellAbilities: new Map,
         difficultyAdjustmentByPlayerId: new Map,
      };
      this.setFlags(this.flags, this.actor);

   };

   /**
   * method for taking Actor object and changes diff, and updating the flags accordingly, intended to be attached
   * to the updateActor hook, and returns both the actor and the diff.
   * @method
   * @param {Actor} actor - actor object, can resolve if string of id is passed
   * @param {Object} diff - value passed by the updateActor hook as a diff of the changed values.
   * @returns {void} Updates flags on object
   */
   updateDiff(actor, diff) {
      if (typeof actor === 'string') {
         try {
            actor = getActor(actor);
         } catch (error) {
            return console.error(`Invalid actor or actorId`, error)
         };
      };
      const actorId = actor.id;
      for (let [key, value] of Object.entries(diff)) {
         // If value is an object call recursively
         if (typeof value === 'object') {
            this.updateDiff(actor, value);
         } else {
            let flag = this.getFlags(actorId);
            if (flag[key]) {
               flag.value = getProperty(actor, key);
            }
         }
      }
   };

   /**
    * Method for return flags on an actor Object.
    * @method
    * @param {Actor.id} actorId
    * @returns {flags}
    */
   getFlags(actorOrId) {
      let actor;
      let actorId
      if (typeof actorOrId === 'string') {
         actorId = actorOrId;
         actor = game.actors.get(actorId);
      } else {
         actor = actorOrId;
         actorId = actor.id;
      }
      const flags = this.actor.getFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags');
      if (!flags) {
         console.debug('No flags initialized, please initialize this actor.')
      }
      else {
         return flags;
      }
   };

   /**
   * Method to set the flags on NPC Actor objects
   * @method
   * @param {Object} flags - flags listed in the initializeFlags methods
   * @param {Actor} actor - Foundry Actor object.
   */
   setFlags(flags) {
      this.actor.setFlag('fvtt-knowledge-recalled-pf2e', 'npcFlags', flags);
      console.info(`Set flags on ${this.actor.name}:`, this.flags, this.actor);
   };

   /**
   * Method for constructing flags for abilities. In pathfinder, this includes Attacks, abilities, passive abilities, and spells/rituals.
   * Expected as a response of the updateActors Hook.
   * @method
   * @param {MeleePF2e} meleePf2e - Returned from PreCreateItem Hook value[0] in the array
   * @returns {AbilityData}
   * 
   */
   constructAbilitiesFlags(meleePf2e) {
      const id = meleePf2e.id;
      if (this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} already exists`)
         return
      }
      const visibility = false;
      const gmDescription = '';
      const discoveredBy = '';
      const name = meleePf2e.name;
      let type;
      if (meleePf2e.isMelee) {
         type = 'melee';
      }
      if (meleePf2e.isRanged || meleePf2e.isThrown) {
         type = 'ranged';
      };
      const data = {
         name: name,
         type: type,
         gmDescription: gmDescription,
         visibility: visibility,
         discoveredBy: discoveredBy
      };
      // map does not work, throws an iterator error. This may be fine though
      // previously `const abilityData = new Map(id, data);`
      const abilityData = [id, data];
      console.info(`Knowledge Recalled new ability property link created for ${id}, ${name}`,
         abilityData);
      this.flags.attacks.push(abilityData)
      this.setFlags(this.flags);
      // need to determin if we will set this, or hand
   };
   /**
    * Method for updating Attacks
    * @method
    * @param {MeleePF2e} MeleePF2e - Returned from UpdateCreateItem Hook value[0] in the array
    * @returns {AbilityData}
    */
   updateAttacksFlags(meleePf2e) {
      const id = meleePf2e.id;
      if (!this.checkForDuplicateDocuments(id, 'attacks')) {
         console.debug(`${id} doesn't exit please debug.`)
         return
      };
      const name = meleePf2e.name;
      let type;
      if (meleePf2e.isMelee) {
         type = 'melee';
      }
      if (meleePf2e.isRanged || meleePf2e.isThrown) {
         type = 'ranged';
      };
      const tempData = {
         name: name,
         type: type,
      };
      //debug found error here
      const existingData = this.flags.attacks.find(item => item[0] === id)[1];
      const mergedData = { ...existingData, ...tempData };
      this.flags.attacks = this.flags.attacks.map(item => {
         if (item[0] === id) {
            return [id, mergedData];
         }
         return item;
      });
      console.info(`Knowledge Recalled updated ability ${id}, ${name}`, mergedData)
      this.setFlags(this.flags)
   }

   /**
    * Method for checking against a map for a duplicate.
    * @private
    * @param {Object} actor - Actor object we are checking for duplicate
    * @param {string} path - Starting at the Actor, the dot notation path to the item
    * @param {string} itemId - string item id
    * @returns {boolean}
    */
   checkForDuplicateDocuments(documentId, property) {
      const prop = this.flags[property];
      const duplicateFlag = prop.some(item => item[0].includes(documentId));
      if (duplicateFlag) {
         console.info(`Document with ${documentId} already exist`)
         return true
      } else {
         return false
      }

   };

   calculateDC() {

   };

   checkForDuplicate() {

   }

}

/**
 * @typedef {{img: string, name: string, id: string, system: object, type: string, isMelee: boolean, isRanged: boolean, isThrown: boolean, description: string}} MeleePF2e
 * Item document for abilities, attacks, and passive abilities for the pathfinder2e system. @link https://github.com/foundryvtt/pf2e/blob/acd79e87c94b24b79d23ce7edb9ce4a027ffc636/src/module/item/melee/document.ts#L14
 */

/**
 * @typedef abilityData
 * @type {Object}
 * @param {string} name
 * @param {string} type
 * @param {string} description
 * @param {string} gmDescription
 * @param {boolean} visibility
 * @param {string} discoveredBy
 */

/**
 * @typedef AbilityData
 * @type {Map<string, abilityData>}
 */

// TODO: Investigate the event where items are created, I noticed that we are creating every item
// which may be okay, but if their is a more effecient way lets try and use that. Let's inspect what
// events occur when an item is created, edited, and deleted and see if we can hone in on something that
// is more specific with the Actor itself.
//
// TODO: Let's investigate the observer pattern for keeping the store and the data at rest in sync
//