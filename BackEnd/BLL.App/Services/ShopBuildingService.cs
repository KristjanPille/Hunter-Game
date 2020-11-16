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
    public class ShopBuildingService : BaseEntityService<IAppUnitOfWork, IShopBuildingRepository, IShopBuildingServiceMapper,
        DAL.App.DTO.ShopBuilding, BLL.App.DTO.ShopBuilding>, IShopBuildingService
    {
        public ShopBuildingService(IAppUnitOfWork uow) : base(uow, uow.ShopBuildings,
            new ShopBuildingServiceMapper())
        {
        }
        
    }
}