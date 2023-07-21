<script>
import {setContext} from "svelte";
import {TJSDocument} from "#runtime/svelte/store/fvtt/document";
import {DynReducerHelper} from "@typhonjs-fvtt/runtime/svelte/store/reducer";



// let module = ui.knowledgeRecalled;
// let npcArray = module?.npcActors;
// let selectedNPC = npcArray ? npcArray[-1] : null;
// console.log("KnowledgeRecalled: ", module, npcArray, selectedNPC);

export let elementRoot;
const NPCArray = ui.KnowledgeRecalled?.npcActors
console.log("Knowledge Recalled: View Array", NPCArray);

const selectedNPC = NPCArray[0];


const NPCData = {
   baseInfo : selectedNPC.flags.baseCharacterInfo,
   defaultDC : selectedNPC.flags.defaultDC,
   modified: selectedNPC.flags.modifiedDC,
   rarity: selectedNPC.flags.rarity,
   privateInfo: selectedNPC.flags.privateInfo,
   traits: selectedNPC.flags.traits,
   armorClass: selectedNPC.flags.armorClass,
   saves: {
      fort: selectedNPC.flags.fortSave,
      ref: selectedNPC.flags.refSave,
      will: selectedNPC.flags.willSave,
      lowestSave: selectedNPC.flags.lowestSave,
   },
   immunities: selectedNPC.flags.immunities,
   resistances: selectedNPC.flags.resistances,
   weaknesses: selectedNPC.flags.weaknesses,
   passiveAbilities: selectedNPC.flags.passiveAbilities,
   actionAbilities: selectedNPC.flags.actionAbilities,
   attackAbilities: selectedNPC.flags.attackAbilities,
   spellAbilities: selectedNPC.flags.spellAbilities,
   difficultyAdjustmentByPlayerID: selectedNPC.flags.difficultyAdjustmentByPlayerID,
}

// cycle through the array of NPCs with a selected NPC that is changed by a button

// $ requires a store

</script>
<main>
   {#if NPCArray}
         <div class="npcProfileWrapper">
            <div class="infoHeader">
               <h2>{NPCData.baseInfo.name}</h2>
               <!-- hard codded need to not hardcode -->
               <ul>
                  {#each NPCData.traits as trait}
                     <li>{trait.value}</li>
                  {/each}
                  {#if NPCData.baseInfo.creatureType}
                     <li>{NPCData.baseInfo.creatureType}</li>
                  {/if}
                  {#if NPCData.baseInfo.size}
                     <li>{NPCData.baseInfo.size}</li>
                  {/if}
               </ul>
            </div>
            <div class="npcProfileImg">
               <img src={NPCData.baseInfo.img} alt="NPC Image">
            </div>
            <div class="npcProfileSettings">
               <h3>Profile Settings</h3>
            </div>
            <div class="abilities-dmgIRW">
               {#if NPCData.actionAbilities}
                  <h3>Abilities</h3>
               {/if}
               {#if NPCData.attackAbilities}
                  <h3>Attacks</h3>
               {/if}
               {#if NPCData.spellAbilities}
                  <h3>Spells</h3>
               {/if}
            </div>
         </div>
   {/if}
</main>

<style>
   .npcProfileWrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 5px 5px;
      grid-template-areas:
         "infoHeader infoheader npcProfileImg"
         "abilities-dmgIRW abilities-dmgIRW npcProfileSettings"
         "abilities-dmgIRW abilities-dmgIRW npcProfileSettings";
   }
   .infoHeader {
      grid-area: infoHeader;
   }
   .npcProfileImg {
      grid-area: npcProfileImg;
   }
   .npcProfileSettings {
      grid-area: npcProfileSettings;
   }
   .abilities-dmgIRW {
      grid-area: abilities-dmgIRW;
   }
</style>