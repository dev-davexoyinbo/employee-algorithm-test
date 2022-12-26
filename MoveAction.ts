import EmployeeOrgApp from "./EmployeeOrgApp";
import IAction from "./IAction";

export class MoveAction implements IAction {
    employeeId: number;
    supervisorId: number;
    previousSubordinateIds: number[] = [];
    previousSupervisorId: number | null = null;
    employeeOrgApp: EmployeeOrgApp;

    constructor(employeeOrgApp: EmployeeOrgApp, employeeId: number, supervisorId: number) {
        this.employeeOrgApp = employeeOrgApp;
        this.employeeId = employeeId;
        this.supervisorId = supervisorId;

        // Run the action after creating it
        this.run();
    }//end constructor

    run(): void {
        const employee = this.employeeOrgApp.search(this.employeeId);
        if (employee == null) {
            throw new Error(`Employee with id "${this.employeeId}" not found`)
        }

        const supervisor = this.employeeOrgApp.search(this.supervisorId);
        if (supervisor == null) {
            throw new Error(`Employee with id "${this.supervisorId}" not found`)
        }

        const currentSupervisor = employee.supervisor;

        // Keep track of the previous subordinates of the employee to use in undo
        this.previousSubordinateIds = employee.subordinates.map(employee => employee.uniqueId)

        
        // move all subordinates of employee to the new supervisor
        while(employee.subordinates.length > 0){
            const e = employee.subordinates.pop()
            if(!e) break;
            
            // Change the supervisor to the employees current supervisor
            e.supervisor = currentSupervisor;
            // Add employee to the subordinates of the current supervisor
            if (currentSupervisor)
                currentSupervisor.subordinates.push(e)
        }

        // Make supervisor the supervisor of employee
        employee.supervisor = supervisor
        // Add employee to the subordinates of the supervisor
        supervisor.subordinates.push(employee)

        this.previousSupervisorId = currentSupervisor?.uniqueId || null;
    }//end method run

    undo(): void {
        throw new Error("Method not implemented.");
    }
}