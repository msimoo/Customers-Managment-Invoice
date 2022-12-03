using CustomersManagementApp.Components.DataContext;
using CustomersManagementApp.Components.Entities;
using CustomersManagementApp.Components.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomersManagementApp.Components.Services {
	public class RoleRepository : IRoleRepository
    {
		private readonly InvoiceContext _context;

		public RoleRepository(InvoiceContext context) {
			this._context = context;
		}

		public async Task<ICollection<Role>> GetRoles()
        {
            var response = await _context.Roles.ToListAsync();
            return response;
        }
    }
}
