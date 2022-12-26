export interface IEmployee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
    supervisor: Employee | null,
}

export default class Employee implements IEmployee {
    uniqueId: number;
    name: string;
    subordinates: Employee[];
    supervisor: Employee | null;

    constructor(uniqueId: number, name: string, subordinates: Employee[], supervisor: Employee | null) {
        this.uniqueId = uniqueId
        this.name = name
        this.subordinates = subordinates
        this.supervisor = supervisor
    }

    public static createWithIdAndNameFactory(id: number, name: string): Employee {
        return new Employee(id, name, [] as Employee[], null);
    }
}