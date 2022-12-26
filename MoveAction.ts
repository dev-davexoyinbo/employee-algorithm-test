import Employee from "./Employee";
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
        while (employee.subordinates.length > 0) {
            const e = employee.subordinates.pop()
            if (!e) break;

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
        const employee = this.employeeOrgApp.search(this.employeeId)
        if (employee == null) {
            throw new Error(`Employee with id "${this.employeeId}" not found`)
        }

        const previousSupervisor = this.previousSupervisorId ? this.employeeOrgApp.search(this.previousSupervisorId) : null

        if (previousSupervisor == null) throw new Error("The previous supervisor does not exist");

        // Create hashmap of previous subordinate ids to avoid nested loops
        const previousSubordinateIdHash: { [key: number]: boolean } = {}
        for (let subordinateId of this.previousSubordinateIds) {
            previousSubordinateIdHash[subordinateId] = true
        }

        // // Get previous subordinates and add them back to employees
        // const indexOfOldSubordinates: number[] = []
        // for (let i = 0; i < previousSupervisor.subordinates.length; i++) {
        //     const subordinate = previousSupervisor.subordinates[i]
        //     if (previousSubordinateIdHash[subordinate.uniqueId]) indexOfOldSubordinates.push(i)
        // }

        // // Remove subordinates with index in indexOfOldSubordinates and add them to the current employee's subordinates
        // for (let i = indexOfOldSubordinates.length - 1; i >= 0; i--) {
        //     previousSupervisor.subordinates.splice(i, 1).forEach((removedEmployee: Employee) => {
        //         // make employee the supervisor of the removed employee
        //         removedEmployee.supervisor = employee
        //         // Add the removed employees from the list of employee's subordinates
        //         employee.subordinates.push(removedEmployee)
        //     })
        // }

        // Make Previous supervisor the current supervisor
        EmployeeOrgApp.swapEmployeeSupervisor(employee, previousSupervisor);

        // Make all previous subordinates to have employee as their supervisor
        previousSupervisor.subordinates.filter((e: Employee) => previousSubordinateIdHash[e.uniqueId])
            .forEach(e => {
                EmployeeOrgApp.swapEmployeeSupervisor(e, employee)
            })

    }//end method undo
}