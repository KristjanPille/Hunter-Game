using System;
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
    public class HunterBaseService : BaseEntityService<IAppUnitOfWork, IHunterBaseRepository, IHunterBaseServiceMapper,
            DAL.App.DTO.HunterBase, BLL.App.DTO.HunterBase>, IHunterBaseService
    {
        public HunterBaseService(IAppUnitOfWork uow) : base(uow, uow.HunterBases,
            new HunterBaseServiceMapper())
        {
        }
    }
}