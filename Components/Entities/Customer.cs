using System.Collections.Generic;

namespace CustomersManagementApp.Components.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            this.Addresses = new HashSet<CustomerHasAddress>();
            this.Invoices = new HashSet<Invoice>();
        }

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string BankAccount { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<CustomerHasAddress> Addresses { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
