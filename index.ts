import Employee from "./Employee";
import EmployeeOrgApp from "./EmployeeOrgApp";

const ceo: Employee = Employee.createWithIdAndNameFactory(1, "Mark Zuckerberg");
const employeeApp = new EmployeeOrgApp(ceo);

const sarah: Employee = Employee.createWithIdAndNameFactory(2, "Sarah Donald:");
const tyler: Employee = Employee.createWithIdAndNameFactory(8, "Tyler simpson");
const bruce: Employee = Employee.createWithIdAndNameFactory(13, "Bruce Willis");
const georgina: Employee = Employee.createWithIdAndNameFactory(14, "Georgina Flangy:");

employeeApp.add(sarah);
employeeApp.add(tyler)
employeeApp.add(bruce)
employeeApp.add(georgina)

const cassandra: Employee = Employee.createWithIdAndNameFactory(3, "Cassandra Reynolds");
employeeApp.add(cassandra, sarah)

const mary: Employee = Employee.createWithIdAndNameFactory(4, "Mary Blue");
const bob: Employee = Employee.createWithIdAndNameFactory(5, "Bob Saget");
employeeApp.add(mary, cassandra)
employeeApp.add(bob, cassandra)

const tina: Employee = Employee.createWithIdAndNameFactory(6, "Tina Teff:");
employeeApp.add(tina, bob)

const will: Employee = Employee.createWithIdAndNameFactory(7, "Will Turner");
employeeApp.add(will, tina)

const harry: Employee = Employee.createWithIdAndNameFactory(9, "Harry Tobs");
const george: Employee = Employee.createWithIdAndNameFactory(11, "George Carrey");
const gary: Employee = Employee.createWithIdAndNameFactory(12, "Gary Styles");
employeeApp.add(harry, tyler)
employeeApp.add(george, tyler)
employeeApp.add(gary, tyler)

const thomas: Employee = Employee.createWithIdAndNameFactory(10, "Thomas Brown");
employeeApp.add(thomas, harry)

const sophie: Employee = Employee.createWithIdAndNameFactory(15, "Sophie Turner");
employeeApp.add(sophie, georgina)


employeeApp.move(cassandra.uniqueId, tyler.uniqueId)
employeeApp.undo()
employeeApp.redo()

console.log(sarah)