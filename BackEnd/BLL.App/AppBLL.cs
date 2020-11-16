using BLL.App.Services;
using Contracts.BLL.App;
using Contracts.BLL.App.Services;
using Contracts.DAL.App;
using Domain.App;
using ee.itcollege.carwash.kristjan.BLL.Base;

namespace BLL.App
{
    public class AppBLL : BaseBLL<IAppUnitOfWork>, IAppBLL
    {
        public AppBLL(IAppUnitOfWork uow) : base(uow)
        {
        }
        public IHunterBaseService HunterBases =>
            GetService<IHunterBaseService>(() => new HunterBaseService(UOW));
        
        public IBuildingService Buildings =>
            GetService<IBuildingService>(() => new BuildingService(UOW));
        
        public IShopBuildingService ShopBuildings =>
            GetService<IShopBuildingService>(() => new ShopBuildingService(UOW));
        
        public IHeroService Heroes =>
            GetService<IHeroService>(() => new HeroService(UOW));
    }
}