// This file contains the global entity object as well as the 
// global functions required to add / delete entities from the
// game.
console.log("entity-manager.js : loaded");


//List of entites in the game.
const entities = {};


//These are required to manage adding and deleting entities in the game.
//Entities are added at the end of the frame to avoid bugs arising from
//deleting entities while another system is processing the entities.
const entities_to_add = [];
const entities_to_delete = [];


//Global functions
function addEntity(entity_name, components_object){
  const entity = {
    name: entity_name,
    ...components_object
  };


  entities_to_add.push(entity);
  return entity;
}


function deleteEntity(entity_name){
  entities_to_delete.push(entity_name);
}



//System : Update the entities at the end of the render frame.
function updateEntities(){

  //Add entities first.
  entities_to_add.forEach(e => {
    entities[e.name] = e;
  });


  //Remove entities.
  entities_to_delete.forEach(e_name => {
    delete entities[e_name];
  });
}
