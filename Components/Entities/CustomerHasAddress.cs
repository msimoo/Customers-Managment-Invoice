namespace CustomersManagementApp.Components.Entities
{
    public partial class CustomerHasAddress
    {
        public string CustomerId { get; set; }
        public string PostalCode { get; set; }
        public int Number { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Address Address { get; set; }
    }
}
