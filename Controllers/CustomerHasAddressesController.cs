using CustomersManagementApp.Components.Entities;
using CustomersManagementApp.Components.Services.Interfaces;
using CustomersManagementApp.Controllers.Viewmodels;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomersManagementApp.Controllers {
	[EnableCors("AllowAll")]
    [Produces("application/json")]
    [Route("api/has_address")]
    public class CustomerHasAddressesController : Controller
    {
		private readonly ICustomerHasAddressRepository _repo;

        public CustomerHasAddressesController(ICustomerHasAddressRepository repo)
        {
			this._repo = repo;
		}

		/// <summary>
		/// Gets all relations between customers and addresses.
		/// </summary>
		[HttpGet("getAll")]
        [ProducesResponseType(typeof(IEnumerable<CustomerHasAddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetAll()
        {
            //Get customer address link
            var data = await _repo.GetAll();
            if (data == null)
            {
                return StatusCode(500, "Customer -> Address relations could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new CustomerHasAddressViewModel
            {
                CustomerId = s.CustomerId,
                Number = s.Number,
                PostalCode = s.PostalCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets all relations between customers and addresses by postal code.
        /// </summary>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("getByPostalCode")]
        [ProducesResponseType(typeof(IEnumerable<CustomerHasAddressViewModel>), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByPostalCode(string postal)
        {
            if (String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get customer address link
            var data = await _repo.GetAddressesByPostal(postal);
            if (data == null)
            {
                return StatusCode(500, "Customer -> Address relations could not be found.");
            }

            //Convert to view model
            var result = data.Select(s => new CustomerHasAddressViewModel
            {
                CustomerId = s.CustomerId,
                Number = s.Number,
                PostalCode = s.PostalCode
            });

            return Ok(result);
        }

        /// <summary>
        /// Gets a relation between customer and address by postal code and number.
        /// </summary>
        /// <param name="number">Number of adresss</param>
        /// <param name="postal">Postal code of address</param>
        [HttpGet("getByNumberAndPostalCode")]
        [ProducesResponseType(typeof(CustomerHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByNumberAndPostalCode(int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get customer address link
            var data = await _repo.GetAddressByPostalAndNumber(number.Value, postal);
            if (data == null)
            {
                return StatusCode(500, "Customer -> Address relation could not be found.");
            }

            //Convert to view model
            var result = new CustomerHasAddressViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Gets a relation between customer and address by customer id.
        /// </summary>
        /// <param name="id">Id of customer</param>
        [HttpGet("getByCustomerId")]
        [ProducesResponseType(typeof(CustomerHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> GetByCustomerId(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get customer address link
            var data = await _repo.GetAddressByCustomerId(id);
            if (data == null)
            {
                return StatusCode(500, "Customer -> Address relation could not be found.");
            }

            //Convert to view model
            var result = new CustomerHasAddressViewModel();
            result.SetProperties(data);

            return Ok(result);
        }

        /// <summary>
        /// Checks if a relation between customer and address by customer id exists.
        /// </summary>
        /// <param name="id">Id of customer</param>
        [HttpGet("hasAddressExists")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(void), 400)]
        public async Task<IActionResult> HasAddressExists(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Get customer address link
            var data = await _repo.GetAddressByCustomerId(id);

            var result = data != null ? true : false;
            return Ok(result);
        }

        /// <summary>
        /// Creates a relation between customer and address.
        /// </summary>
        /// <param name="model">Customer has Address object</param>
        [HttpPost("create")]
        [ProducesResponseType(typeof(CustomerHasAddressViewModel), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Create([FromBody]CustomerHasAddressViewModel model)
        {
            if (model == null)
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            CustomerHasAddress customerHasAddress = new CustomerHasAddress
            {
                CustomerId = model.CustomerId,
                Number = model.Number,
                PostalCode = model.PostalCode
            };

            //Insert relation between customer and address
            var result = await _repo.Insert(customerHasAddress);
            if (result == null)
            {
                return StatusCode(500, "A problem occured while saving the record. Please try again!");
            }

            return Ok(result);
        }


        /// <summary>
        /// Deletes a relation between customer and address.
        /// </summary>
        /// <param name="id">Id of customer</param>
        /// <param name="number">Number of address</param>
        /// <param name="postal">Postal code of address</param>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(void), 200)]
        [ProducesResponseType(typeof(void), 400)]
        [ProducesResponseType(typeof(void), 500)]
        public async Task<IActionResult> Delete(string id, int? number, string postal)
        {
            if (!number.HasValue || String.IsNullOrEmpty(id) || String.IsNullOrEmpty(postal))
            {
                return StatusCode(400, "Invalid parameter(s).");
            }

            //Remove relation between customer and address
            var succeeded = await _repo.Delete(id, number.Value, postal);
            if (!succeeded)
            {
                return StatusCode(500, "A problem occured while removing the record. Please try again!");
            }

            return Ok("Success");
        }
    }
}
