using CustomersManagementApp.Components.Entities;

using Newtonsoft.Json;

namespace CustomersManagementApp.Controllers.Viewmodels
{
    public class CustomerHasAddressViewModel
    {
        [JsonProperty("customer_id")]
        public string CustomerId { get; set; }
        [JsonProperty("address_postal")]
        public string PostalCode { get; set; }
        [JsonProperty("address_number")]
        public int Number { get; set; }

        public CustomerHasAddressViewModel()
        {

        }

        public void SetProperties(CustomerHasAddress model)
        {
            this.CustomerId = model.CustomerId;
            this.Number = model.Number;
            this.PostalCode = model.PostalCode;
        }
    }
}
