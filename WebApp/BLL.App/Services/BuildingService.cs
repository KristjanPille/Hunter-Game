using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.App.DTO;
using BLL.App.Mappers;
using Contracts.BLL.App.Mappers;
using Contracts.BLL.App.Services;
using Contracts.DAL.App;
using Contracts.DAL.App.Repositories;
using ee.itcollege.carwash.kristjan.BLL.Base.Services;

namespace BLL.App.Services
{
    public class BuildingService : BaseEntityService<IAppUnitOfWork, IBuildingRepository, IBuildingServiceMapper,
        DAL.App.DTO.Building, BLL.App.DTO.Building>, IBuildingService
    {
        public BuildingService(IAppUnitOfWork uow) : base(uow, uow.Buildings,
            new BuildingServiceMapper())
        {
        }
        
    }
}