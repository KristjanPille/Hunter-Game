using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.App.DTO;

namespace Contracts.DAL.App.Repositories
{
    public interface IBuildingRepositoryCustom: IBuildingRepositoryCustom<Building>
    {
        
    }
    public interface IBuildingRepositoryCustom<TBuilding>
    {
    }
}