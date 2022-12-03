using System.Collections.Generic;
using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> Insert(User user);
        Task<User> Update(User user);
        Task<bool> Delete(string email);
        Task<User> Authenticate(string email, string password);
        Task<string> ResetPassword(string email);
    }
}
