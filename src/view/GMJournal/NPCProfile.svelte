<script>
import {setContext} from "svelte";
import {TJSDocument} from "#runtime/svelte/store/fvtt/document";
import {DynReducerHelper} from "@typhonjs-fvtt/runtime/svelte/store/reducer";



// let module = ui.knowledgeRecalled;
// let npcArray = module?.npcActors;
// let selectedNPC = npcArray ? npcArray[-1] : null;
// console.log("KnowledgeRecalled: ", module, npcArray, selectedNPC);

/*
* Features: TODO
*   - Create dropdown of lore skills for the selected PC.
*     - Should auto select the skill that is associated with the NPC's creature type.
*
* */

export let elementRoot;
const NPCArray = ui.KnowledgeRecalled?.npcActors
console.log("Knowledge Recalled: View Array", NPCArray);

let selectedNPC = NPCArray[0];
function nextNPC() {
   let index = NPCArray.indexOf(selectedNPC);
   if (index < NPCArray.length - 1) {
      selectedNPC = NPCArray[index + 1];
   } else {
      selectedNPC = NPCArray[0];
   }
}


const NPCData = {
   baseInfo : selectedNPC.flags.baseCharacterInfo,
   size: selectedNPC.flags.baseCharacterInfo.size,
   defaultDC : selectedNPC.flags.defaultDC,
   modified: selectedNPC.flags.modifiedDC,
   rarity: selectedNPC.flags.rarity,
   alignment: selectedNPC.flags.alignment,
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
//350
</script>
<main>
   {#if NPCArray}
         <div class="npcProfileWrapper">
            <div class="row attributesRow">
               <div class="infoHeader">
                  <h2>{NPCData.baseInfo.name}</h2> <button on:click={nextNPC}>Next</button>
                  <!-- hard codded need to not hardcode -->
                  <ul class = "traitCards">
                     {#if NPCData.baseInfo.size}
                        <li class="traitSize">{NPCData.baseInfo.size.toUpperCase()}</li>
                     {/if}
                     {#if NPCData.baseInfo.alignment}
                        <li class="traitAlignment">{NPCData.baseInfo.alignment.toUpperCase()}</li>
                     {/if}
                     {#if NPCData.baseInfo.creatureType}
                        <li class="traitGeneric">{NPCData.baseInfo.creatureType.toUpperCase()}</li>
                     {/if}
                     {#each NPCData.traits as trait}
                        <li class="traitGeneric">{trait.value.toUpperCase()}</li>
                     {/each}
                  </ul>
               </div>
               <div class="abilities-dmgIRW">
                  {#if NPCData.actionAbilities.length > 0}
                     <div class = "actionAbilityWrapper">
                        <h3>Abilities</h3>
                        <ul class = "abilityCard">
                           {#each NPCData.actionAbilities as ability}
                              <li>
                                 <div class = "abilityCardHeader"> {ability.value} </div>
                                 <div class = "abilityCardDescription"> <textarea> {ability.description} </textarea></div>
                              </li>
                           {/each}
                        </ul>
                     </div>
                  {/if}
                  {#if NPCData.passiveAbilities.length > 0 }
                     <div class = "passiveAbilityWrapper">
                        <h3>Passive Abilities</h3>
                        <ul class = "abilityCard">
                           {#each NPCData.passiveAbilities as ability}
                              <li>
                                 <div class = "abilityCardHeader"> {ability.value} </div>
                                 <div class = "abilityCardDescription"> <textarea> {ability.description} </textarea></div>
                              </li>
                           {/each}
                        </ul>
                     </div>
                  {/if}
                  {#if NPCData.attackAbilities.length > 0}
                     <div class = "attackAbilityWrapper">
                        <h3>Attacks</h3>
                        <ul class = "abilityCard">
                           {#each NPCData.attackAbilities as ability}
                              <li>
                                 <div class = "abilityCardHeader"> {ability.value} </div>
                                 <div class = "abilityCardDescription"> <textarea> {ability.description} </textarea></div>
                              </li>
                           {/each}
                        </ul>
                     </div>
                  {/if}
                  {#if NPCData.spellAbilities.length > 0}
                     <div class = "spellAbilityWrapper">
                        <h3>Spells</h3>
                        <ul class = "abilityCard">
                           {#each NPCData.spellAbilities as ability}
                              <li>
                                 <div class = "abilityCardHeader"> {ability.value} </div>
                                 <div class = "abilityCardDescription"> <textarea> {ability.description} </textarea></div>
                              </li>
                           {/each}
                        </ul>
                     </div>
                  {/if}
               </div>
            </div>
            <div class="columnGap">&nbsp;</div>
            <div class="row optionsRow">
               <div class="npcProfileImg">
                  <img src="{NPCData.baseInfo.actorImg}" alt="NPC Image">
               </div>
               <div class="npcProfileOptionsWrapper">
                  <h3>Recall Options</h3>
                  <table class="npcProfileOptions">

                  </table>
               </div>
            </div>
         </div>
   {/if}
</main>

<style lang="scss">
   $MaximumWidthOptionsRow: 300px;
   @import "../../styles/variables.scss";

   .npcProfileWrapper {
      display: flex;
      flex-direction: row;
      column-gap: 10px;
      flex-grow: 1;

      .row {
         display: flex;
         flex-direction: column;
      }
      .attributesRow {
         flex-basis: 50%;
         flex-grow: 2;
      }
      .optionsRow {
         flex-basis: 50%;
         max-width: $MaximumWidthOptionsRow;
         }
      .columnGap {
         display: block;
         width: 5px;
         background-color: $red;
         border: 1px solid $gold;
      }
   }
   .infoHeader {
      min-height: 100px;
   }
   .npcProfileImg {
      max-height: 300px;
   }
   .npcProfileImg img {
      display: block;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      overflow: hidden;
   }
   .npcProfileOptionsWrapper {
      margin-top: 10px;
   }
   .abilities-dmgIRW {
   }

   .traitCards {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
   }

   .traitCards li {
      padding: 4px;
      margin: 2px;
      border: 2px solid $gold;
      color: white;
      font-size: 0.8em;
   }
   .traitAlignment {
      background-color: $dark-blue;
   }
   .traitSize {
      background-color: $green;
   }
   .traitGeneric {
      background-color: $red;
   }
</style>