using CustomersManagementApp.Components.Entities;
using CustomersManagementApp.Components.Services.Interfaces;
using CustomersManagementApp.Controllers.ViewModels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CustomersManagementApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/customers")]
    public class CustomersController : Controller
    {
		private readonly ICustomerRepository _repo;
		private readonly ICustomerHasAddressRepository _customerHasAddressRepo;
		private readonly IAddressRepository _addressRepository;

		public CustomersController(ICustomerRepository repo, ICustomerHasAddressRepository customerHasAddressRepo, IAddressRepository addressRepository)
        {
			this._repo = repo;
			this._customerHasAddressRepo = customerHasAddressRepo;
            this._addressRepository = addressRepository;
        }

        /// <summary>
        /// Customer pagination.
        /// </summary>
        /// <param name="page">Page</param>
        /// <param name="pageSize">Amount of items on one page</param>
        [HttpGet("index")]
        [ProducesResponseType(typeof(PaginationResult<CustomerViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Index(int? page, int? pageSize)
        {
            if (!page.HasValue || !pageSize.HasValue)
            {
                return StatusCode(400, String.Format("Invalid parameter(s)."));
            }

            //Get data
            var data = await _repo.GetCustomers();
            if (data == null)
            {
                return StatusCode(500, "Customers could not be found.");
            }

            //Convert to viewmodel
            var result = new List<CustomerViewModel>();
            foreach (var customer in data)
            {
                //Customer --> Address
                var hasAddress = customer.Addresses.ToList()[0];
                var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

                //Address model
                var addressViewModel = new AddressViewModel();
                addressViewModel.SetProperties(address);

                //Customer model
                var customerModel = new CustomerViewModel();
                customerModel.Address = addressViewModel;
                customerModel.SetProperties(customer, false, false);

                result.Add(customerModel);
            }

            var totalPages = ((result.Count() - 1) / pageSize.Value) + 1;
            var requestedData = result.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();

            var paging = new PaginationResult<CustomerViewModel>(page.Value, totalPages, requestedData);
            var pagingResult = new PaginationResultViewModel<CustomerViewModel>
            {
                Data = paging.Data,
                TotalPages = paging.TotalPages,
                CurrentPage = paging.CurrentPage
            };

            return Ok(pagingResult);
        }

        /// <summary>
        /// Gets a list with all customers.
        /// </summary>
        [HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<CustomerViewModel>), 200)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get data
            var data = await _repo.GetCustomers();
            if (data == null)
            {
                return StatusCode(500, "Customers could not be found.");
            }

            //Convert to viewmodel
            var result = new List<CustomerViewModel>();
            foreach (var customer in data)
            {
                //Customer --> Address
                var hasAddress = customer.Addresses.ToList()[0];
                var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

                //Address model
                var addressViewModel = new AddressViewModel();
                addressViewModel.SetProperties(address);

                //Customer model
                var customerModel = new CustomerViewModel();
                customerModel.Address = addressViewModel;
                customerModel.SetProperties(customer, false, false);

                result.Add(customerModel);
            }

            return Ok(result);
        }

        /// <summary>
        /// Gets a customer by email.
        /// </summary>
        /// <param name="email">Email of customer</param>
        [HttpGet("getByEmail")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (String.IsNullOrEmpty(email))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            // Check if email address is valid
            if (!Regex.Match(email, @"^([\w\.\-]+)@((?!\.|\-)[\w\-]+)((\.(\w){2,3})+)$").Success)
            {
                return StatusCode(400, "This e-mail address is not valid.");
            }

            //Get customer
            var data = await _repo.GetCustomerByEmail(email);
            if (data == null)
            {
                return StatusCode(500, "Customer could not be found.");
            }

            //Customer --> Address
            var hasAddress = data.Addresses.ToList()[0];
            var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

            //Address model
            var addressViewModel = new AddressViewModel();
            addressViewModel.SetProperties(address);

            //Customer model
            var result = new CustomerViewModel();
            result.Address = addressViewModel;
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Gets a customer by id.
        /// </summary>
        /// <param name="id">Id of customer</param>
        [HttpGet("getById")]
        [ProducesResponseType(typeof(UserViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetById(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get user
            var data = await _repo.GetCustomerByID(id);
            if (data == null)
            {
                return StatusCode(500, "Customer could not be found.");
            }

            //Customer --> Address
            var hasAddress = data.Addresses.ToList()[0];
            var address = await _addressRepository.GetAddressByPostalAndNumber(hasAddress.Number, hasAddress.PostalCode);

            //Address model
            var addressViewModel = new AddressViewModel();
            addressViewModel.SetProperties(address);

            //Customer model
            var result = new CustomerViewModel();
            result.Address = addressViewModel;
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Creates a customer.
        /// </summary>
        /// <param name="model">Customer object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(CustomerViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]CustomerViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Customer customer = new Customer
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BankAccount = model.BankAccount,
                Phone = model.Phone,
                CompanyName = model.CompanyName
            };

            //Insert customer
            var data = await _repo.Insert(customer);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            var result = new CustomerViewModel();
            result.SetProperties(data, true, true);

            return Ok(result);
        }

        /// <summary>
        /// Updates a customer.
        /// </summary>
        /// <param name="model">Customer object</param>
        [HttpPut("update")]
        [ProducesResponseType(typeof(CustomerViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Update([FromBody]CustomerViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            Customer customer = new Customer
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BankAccount = model.BankAccount,
                Phone = model.Phone,
                CompanyName = model.CompanyName
            };

            //Update customer
            var data = await _repo.Update(customer);
            if (data == null)
            {
                return StatusCode(500, "A problem occured while updating the record. Please try again!");
            }

            var result = new CustomerViewModel();
            result.SetProperties(data, false, false);

            return Ok(result);
        }

        /// <summary>
        /// Deletes a customer.
        /// </summary>
        /// <param name="id">Id of customer</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove customer
            var succeeded = await _repo.Delete(id);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }

        #region Private Methods

        private async Task<Address> GetAddress(string customerId)
        {
            var customerHasAddress = await this._customerHasAddressRepo.GetAddressByCustomerId(customerId);
            var address = await this._addressRepository.GetAddressByPostalAndNumber(customerHasAddress.Number, customerHasAddress.PostalCode);

            return address;
        }

        #endregion
    }
}
