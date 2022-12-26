export default interface IAction {
    run(): void;
    undo(): void;
}