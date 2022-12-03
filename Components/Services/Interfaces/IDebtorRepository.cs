using System.Collections.Generic;
using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface ICustomerRepository
    {
        Task<ICollection<Customer>> GetCustomers();
        Task<Customer> GetCustomerByEmail(string email);
        Task<Customer> GetCustomerByID(string id);
        Task<Customer> Insert(Customer customer);
        Task<Customer> Update(Customer customer);
        Task<bool> Delete(string id);
    }
}
