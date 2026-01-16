const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// 1. CHECK IF EMPLOYEE EXISTS
async function checkIfEmployeeExists(email) {
  const employee = await prisma.employee.findUnique({
    where: {
      employee_email: email,
    },
  });

  return employee ? true : false;
}

// 2. ADD EMPLOYEE
async function addEmployee(employee) {
  try {
    const hashedPassword = await bcrypt.hash(employee.employee_password, 10);

    const newEmployee = await prisma.employee.create({
      data: {
        employee_email: employee.employee_email,
        active_employee: employee.active_employee || 1,

        // employee_info
        employee_info: {
          create: {
            employee_first_name: employee.employee_first_name,
            employee_last_name: employee.employee_last_name,
            employee_phone: employee.employee_phone,
          },
        },

        // employee_pass
        employee_pass: {
          create: {
            employee_password_hashed: hashedPassword,
          },
        },

        // employee_role  ✅ FIXED
        employee_roles: {
          create: {
            company_role: {
              connectOrCreate: {
                where: {
                  company_role_name: employee.company_role_name || "Employee",
                },
                create: {
                  company_role_name: employee.company_role_name || "Employee",
                },
              },
            },
          },
        },
      },
    });

    return newEmployee;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create employee");
  }
}

//  a function that perform find the employee data by ts email
async function getEmployeeByItsEmail(employee_email) {
  const employee = await prisma.employee.findFirst({
    where: { employee_email: employee_email },
    include: {
      employee_info: true,
      employee_pass: true,
      employee_roles: {
        include: {
          company_role: true,
        },
      },
    },
  });

  return employee;
}

module.exports = {
  checkIfEmployeeExists,
  addEmployee,
  getEmployeeByItsEmail,
};
