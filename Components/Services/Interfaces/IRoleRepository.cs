using System.Collections.Generic;
using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface IRoleRepository
    {
        Task<ICollection<Role>> GetRoles();
    }
}
