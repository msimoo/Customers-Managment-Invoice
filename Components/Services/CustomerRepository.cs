using CustomersManagementApp.Components.DataContext;
using CustomersManagementApp.Components.Entities;
using CustomersManagementApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomersManagementApp.Components.Services {
	public class CustomerRepository : ICustomerRepository
    {
		private readonly InvoiceContext _context;

		public CustomerRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<ICollection<Customer>> GetCustomers()
        {
            var response = await _context.Customers.Include(i => i.Addresses).Include(i => i.Invoices).ToListAsync();
            return response;
        }

        public async Task<Customer> GetCustomerByEmail(string email)
        {
            var response = await _context.Customers.Include(i => i.Addresses).Include(i => i.Invoices).FirstOrDefaultAsync(q => q.Email.ToLower() == email.ToLower());
            return response;
        }

        public async Task<Customer> GetCustomerByID(string id)
        {
            var response = await _context.Customers.Include(i => i.Addresses).Include(i => i.Invoices).FirstOrDefaultAsync(q => q.Id == id);
            return response;
        }

        public async Task<Customer> Insert(Customer customer)
        {
            var response = _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return response.Entity;
        }

        public async Task<Customer> Update(Customer customer)
        {
            var customerBeforeUpdate = await _context.Customers.FindAsync(customer.Id);
            if (customerBeforeUpdate == null)
            {
                return null;
            }

            _context.Entry(customerBeforeUpdate).CurrentValues.SetValues(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<bool> Delete(string id)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(q => q.Id == id);
            _context.Customers.Remove(customer);

            var result = await _context.SaveChangesAsync();
            return result == 1 ? true : false;
        }
    }
}
