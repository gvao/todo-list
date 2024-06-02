import Route from "../../../shared/domain/Route";

export default interface Controller {
    controller(): Route
}