
export function getUuid(target)
{
   try
   {
      return target.uuid;
   }
   catch (error)
   {
      return (`KnowledgeRecalled: getUuid() error: ${error}; target: ${target};`)
   }
}

export function getActor(target)
{
   if (target instanceof Actor)
   { return target; }
   else
   { return `KnowledgeRecalled: getActor() error: ${target} is not an Actor;` }

}