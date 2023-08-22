import { getUuid } from "../API/FoundryMethods.js";

const __STORES__ = new Map();
export class KnowledgeRecalledStore
{
   constructor(application, source)
   {
      this.subscribers = [];

      this.application = application;
      this.uuid = getUuid(source);

      __STORES__.set(this.uuid, this);
   }

   static make(...args)
   {
      const store = new this(...args);
      store.setupStores();
      store.setupSubscriptions();
      return store;
   }

   setupStores()
   {
      // higher order implementation
   }

   setupSubscriptions()
   {
      // higher order implementation
   }
}