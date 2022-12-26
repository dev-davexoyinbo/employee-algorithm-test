export default class ActionStack<T> {
    private _actions: Array<T> = [];
    private _pointer: number = -1;

    public add(action: T) {
        // Move pointer forward one step and assign action to it
        this._pointer++;
        this._actions[this._pointer] = action;

        // Remove all elements after the pointer position
        this._actions.splice(this._pointer + 1)
    }//end method add

    public rollback(): T | null {
        if(this._pointer <= -1) return null;

        const action = this._actions[this._pointer]
        this._pointer--
        return action;
    }//end method rollback

    public fastForward(): T | null {
        // return null if the pointer is already at the end of the list
        if(this._pointer == this._actions.length - 1) return null;
        this._pointer++;
        return this._actions[this._pointer];
    }//end method fastForward
}//end class ActionStack