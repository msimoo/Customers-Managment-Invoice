using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<int> GetCount();
        Task<ICollection<Invoice>> GetInvoices();
        Task<ICollection<Invoice>> GetByCreationDate(DateTime date);
        Task<ICollection<Invoice>> GetNearlyExpired();
        Task<ICollection<Invoice>> GetByCustomerId(string id);
        Task<Invoice> GetByNumber(string number);
        Task<Invoice> Insert(Invoice invoice);
        Task<Invoice> Update(Invoice invoice);
        Task<bool> Delete(string id);
        Task<bool> DeleteByCustomerId(string id);
    }
}
