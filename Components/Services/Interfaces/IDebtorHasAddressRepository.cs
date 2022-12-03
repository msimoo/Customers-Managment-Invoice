using System.Collections.Generic;
using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface ICustomerHasAddressRepository
    {
        Task<ICollection<CustomerHasAddress>> GetAll();
        Task<CustomerHasAddress> GetAddressByCustomerId(string id);
        Task<ICollection<CustomerHasAddress>> GetAddressesByPostal(string postal);
        Task<CustomerHasAddress> GetAddressByPostalAndNumber(int number, string postal);
        Task<CustomerHasAddress> Insert(CustomerHasAddress customerHasAddress);
        Task<bool> Delete(string id, int number, string postal);
    }
}
