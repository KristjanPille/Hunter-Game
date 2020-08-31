using BLL.App.Mappers;
using Contracts.BLL.App.Mappers;
using Contracts.BLL.App.Services;
using Contracts.DAL.App;
using Contracts.DAL.App.Repositories;
using ee.itcollege.carwash.kristjan.BLL.Base.Services;

namespace BLL.App.Services
{
    public class HeroService : BaseEntityService<IAppUnitOfWork, IHeroRepository, IHeroServiceMapper,
        DAL.App.DTO.Hero, BLL.App.DTO.Hero>, IHeroService
    {
        public HeroService(IAppUnitOfWork uow) : base(uow, uow.Heroes,
            new HeroServiceMapper())
        {
        }
    }
}