using System.Threading.Tasks;

using CustomersManagementApp.Components.Entities;

namespace CustomersManagementApp.Components.Services.Interfaces
{
    public interface ISettingRepository
    {
        Task<Settings> GetSettings();
        Task<Settings> Update(Settings settings);
    }
}
