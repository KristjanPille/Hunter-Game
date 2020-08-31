using Contracts.DAL.App.Repositories;
using ee.itcollege.carwash.kristjan.Contracts.DAL.Base;

namespace Contracts.DAL.App
{
    public interface IAppUnitOfWork : IBaseUnitOfWork, IBaseEntityTracker
    {
        IHunterBaseRepository HunterBases { get; }
        IBuildingRepository Buildings { get; }
        IShopBuildingRepository ShopBuildings { get; }
        IHeroRepository Heroes { get; }
    }
}