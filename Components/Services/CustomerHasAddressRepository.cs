using CustomersManagementApp.Components.DataContext;
using CustomersManagementApp.Components.Entities;
using CustomersManagementApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomersManagementApp.Components.Services {
	public class CustomerHasAddressRepository : ICustomerHasAddressRepository
    {
		private readonly InvoiceContext _context;

		public CustomerHasAddressRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<ICollection<CustomerHasAddress>> GetAll()
        {
            var response = await _context.CustomerHasAddresses.Include(i => i.Address).ToListAsync();
            return response;
        }

        public async Task<CustomerHasAddress> GetAddressByCustomerId(string id)
        {
            var response = await _context.CustomerHasAddresses.Include(i => i.Address).FirstOrDefaultAsync(q => q.CustomerId == id);
            return response;
        }

        public async Task<ICollection<CustomerHasAddress>> GetAddressesByPostal(string postal)
        {
            var response = await _context.CustomerHasAddresses.Include(i => i.Address).Where(q => q.PostalCode.ToLower() == postal.ToLower()).ToListAsync();
            return response;
        }

        public async Task<CustomerHasAddress> GetAddressByPostalAndNumber(int number, string postal)
        {
            var response = await _context.CustomerHasAddresses.Include(i => i.Address).FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number);
            return response;
        }

        public async Task<CustomerHasAddress> Insert(CustomerHasAddress customerHasAddress)
        {
            var response = _context.CustomerHasAddresses.Add(customerHasAddress);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<bool> Delete(string id, int number, string postal)
        {
            CustomerHasAddress address = await _context.CustomerHasAddresses.FirstOrDefaultAsync(q => q.PostalCode.ToLower() == postal.ToLower() && q.Number == number
                    && q.CustomerId == id);
            _context.CustomerHasAddresses.Remove(address);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
