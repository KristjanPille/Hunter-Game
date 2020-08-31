using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.App.DTO;
using Contracts.DAL.App.Repositories;
using ee.itcollege.carwash.kristjan.Contracts.BLL.Base.Services;

namespace Contracts.BLL.App.Services
{
    public interface IBuildingService : IBaseEntityService<Building>, IBuildingRepositoryCustom<Building>
    {
        
        
    }
}