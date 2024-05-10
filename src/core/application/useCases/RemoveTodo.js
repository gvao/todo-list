const Repository= require( "../Repository.interface.js");

module.exports = class RemoveTodo {
    /** @param {Repository} todoRepository */
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    /**@param {string} id  */
    execute(id){
        this.todoRepository.deleteById(id)
    }
}