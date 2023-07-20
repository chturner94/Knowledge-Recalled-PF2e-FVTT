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

// cycle through the array of NPCs with a selected NPC that is changed by a button

// $ requires a store

</script>
<main>
   {#if NPCArray}
      {#each NPCArray as npc}
         <div class="npc">
            <h2>{npc.flags.baseCharacterInfo.name}</h2>
         </div>
      {/each}
   {/if}
</main>