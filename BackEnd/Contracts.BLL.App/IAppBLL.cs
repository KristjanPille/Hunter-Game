﻿using Contracts.BLL.App.Services;
 using Contracts.DAL.App.Repositories;
 using ee.itcollege.carwash.kristjan.Contracts.BLL.Base;

 namespace Contracts.BLL.App
{
    public interface IAppBLL : IBaseBLL
    {
        IHunterBaseService HunterBases { get; }
        
        IBuildingService Buildings { get; }
        
        IShopBuildingService ShopBuildings { get; }
        
        IHeroService Heroes { get; }
        
    }
}