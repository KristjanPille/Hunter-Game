using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.App.DTO;

namespace Contracts.DAL.App.Repositories
{
    public interface IHeroRepositoryCustom: IHeroRepositoryCustom<Hero>
    {
        
    }
    public interface IHeroRepositoryCustom<THero>
    {
    }
}