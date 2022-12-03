using System.Collections.Generic;
using CustomersManagementApp.Components.Entities;

using Newtonsoft.Json;

namespace CustomersManagementApp.Controllers.ViewModels
{
    public class PaginationResultViewModel<T>
    {
        [JsonProperty("current_page")]
        public int CurrentPage { get; set; }
        [JsonProperty("total_pages")]
        public int TotalPages { get; set; }
        [JsonProperty("data")]
        public List<T> Data { get; set; }
    }
}
