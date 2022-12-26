import ActionStack from "./ActionStack";
import Employee from "./Employee";
import IAction from "./IAction";
import { MoveAction } from "./MoveAction";

interface IEmployeeOrgApp {
    ceo: Employee;
    /**
    * Moves the employee with employeeID (uniqueId) under a supervisor
    (another employee) that has supervisorID (uniqueId).
    * E.g. move Bob (employeeID) to be subordinate of Georgina
    (supervisorID). * @param employeeID
    * @param supervisorID
    */
    move(employeeID: number, supervisorID: number): void;
    /** Undo last move action */
    undo(): void;
    /** Redo last undone action */
    redo(): void;
}

export default class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;
    actionStack: ActionStack<IAction>;

    constructor(ceo: Employee) {
        this.ceo = ceo;
        this.actionStack = new ActionStack<IAction>();
    }

    move(employeeID: number, supervisorID: number): void {
        this.actionStack.add(new MoveAction(this, employeeID, supervisorID));
    }

    undo(): void {
        throw new Error("Method not implemented.");
    }
    redo(): void {
        throw new Error("Method not implemented.");
    }

    // Add Employee
    add(employee: Employee, supervisor: Employee = this.ceo){
        employee.supervisor = supervisor
        supervisor.subordinates.push(employee)
    }//end method add

    // Searches for the employee below a supervisor recursively
    public search(employeeId: number, currentEmployee: Employee = this.ceo): Employee | null{ 
        if(currentEmployee.uniqueId == employeeId) return currentEmployee;
        if(currentEmployee.subordinates.length == 0) return null;

        for(let employee of currentEmployee.subordinates){
            const foundEmployee = this.search(employeeId, employee);
            if(foundEmployee !== null) return foundEmployee
        }

        return null
    }//end method search
}//end class EmployeeOrgApp