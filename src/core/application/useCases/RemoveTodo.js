import Repository from "../Repository.interface.js";

export default class RemoveTodo {
    /** @param {Repository} todoRepository */
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    /**@param {string} id  */
    execute(id){
        this.todoRepository.deleteById(id)
    }
}