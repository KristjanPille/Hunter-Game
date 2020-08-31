﻿using System;
using System.Collections.Generic;
 using Contracts.DAL.App;
 using Contracts.DAL.App.Repositories;
 using ee.itcollege.carwash.kristjan.Contracts.DAL.Base;
 using ee.itcollege.carwash.kristjan.DAL.Base.EF;
 using DAL.App.EF.Repositories;

 namespace DAL.App.EF
{
    public class AppUnitOfOfWork : EFBaseUnitOfWork<Guid, AppDbContext>, IAppUnitOfWork
    {
        public AppUnitOfOfWork(AppDbContext uowDbContext) : base(uowDbContext)
        {
        }
        public IHunterBaseRepository HunterBases =>
            GetRepository<IHunterBaseRepository>(() => new HunterBaseRepository(UOWDbContext));
        
        public IBuildingRepository Buildings =>
            GetRepository<IBuildingRepository>(() => new BuildingRepository(UOWDbContext));
        
        public IShopBuildingRepository ShopBuildings =>
            GetRepository<IShopBuildingRepository>(() => new ShopBuildingRepository(UOWDbContext));
        
        public IHeroRepository Heroes =>
            GetRepository<IHeroRepository>(() => new HeroRepository(UOWDbContext));
    }
}